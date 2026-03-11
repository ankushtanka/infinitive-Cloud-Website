import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const CACHE_PREFIX = "ic_tr_";
const BATCH_SIZE = 40;
const DEBOUNCE_MS = 300;

// Elements/selectors to skip
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE", "IFRAME", "SVG", "PATH", "IMG", "INPUT", "TEXTAREA", "SELECT"]);
const SKIP_ATTRS = ["data-no-translate"];

function getCacheKey(text: string, lang: string): string {
  // Simple hash to keep keys short
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const chr = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return `${CACHE_PREFIX}${lang}_${hash}`;
}

function getCached(text: string, lang: string): string | null {
  try {
    return sessionStorage.getItem(getCacheKey(text, lang));
  } catch {
    return null;
  }
}

function setCache(text: string, lang: string, translation: string) {
  try {
    sessionStorage.setItem(getCacheKey(text, lang), translation);
  } catch {
    // Storage full, ignore
  }
}

function shouldSkipNode(node: Node): boolean {
  if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as Element;
    if (SKIP_TAGS.has(el.tagName)) return true;
    if (SKIP_ATTRS.some(attr => el.hasAttribute(attr))) return true;
  }
  return false;
}

function getTextNodes(root: Node): Text[] {
  const textNodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const text = node.textContent?.trim();
      if (!text || text.length < 2) return NodeFilter.FILTER_REJECT;
      
      // Check parent chain for skip conditions
      let parent = node.parentElement;
      while (parent) {
        if (shouldSkipNode(parent)) return NodeFilter.FILTER_REJECT;
        if (parent.hasAttribute("data-original-text")) return NodeFilter.FILTER_REJECT;
        parent = parent.parentElement;
      }
      
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text);
  }
  return textNodes;
}

function getTranslatableElements(root: Element): Element[] {
  const elements: Element[] = [];
  
  // Get elements with text content that might have placeholder, title, alt attributes
  const attrElements = root.querySelectorAll("[placeholder], [title], [alt], [aria-label]");
  attrElements.forEach(el => {
    if (!shouldSkipNode(el)) elements.push(el);
  });
  
  return elements;
}

async function translateBatch(texts: string[], lang: string): Promise<string[]> {
  try {
    const { data, error } = await supabase.functions.invoke("translate-content", {
      body: { texts, targetLang: lang },
    });
    if (error) throw error;
    return data.translations || texts;
  } catch (err) {
    console.error("Translation batch failed:", err);
    return texts;
  }
}

const PageTranslator = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const originalTextsMap = useRef<Map<Node, string>>(new Map());
  const originalAttrsMap = useRef<Map<Element, Record<string, string>>>(new Map());
  const isTranslating = useRef(false);
  const debounceTimer = useRef<number | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  const restoreOriginals = useCallback(() => {
    // Restore text nodes
    originalTextsMap.current.forEach((original, node) => {
      if (node.textContent !== original) {
        node.textContent = original;
      }
    });
    
    // Restore attributes
    originalAttrsMap.current.forEach((attrs, el) => {
      Object.entries(attrs).forEach(([attr, val]) => {
        el.setAttribute(attr, val);
      });
    });
    
    originalTextsMap.current.clear();
    originalAttrsMap.current.clear();
  }, []);

  const translatePage = useCallback(async (lang: string) => {
    if (lang === "en" || isTranslating.current) return;
    isTranslating.current = true;

    // Pause observer during translation
    observerRef.current?.disconnect();

    try {
      const mainContent = document.getElementById("main-content") || document.body;
      const nav = document.querySelector("nav");
      const footer = document.querySelector("footer");
      
      const roots = [mainContent];
      if (nav) roots.push(nav);
      if (footer) roots.push(footer);

      // Collect all text nodes
      const allTextNodes: Text[] = [];
      roots.forEach(root => {
        allTextNodes.push(...getTextNodes(root));
      });

      // Collect translatable attributes
      const attrElements: { el: Element; attr: string; text: string }[] = [];
      roots.forEach(root => {
        if (root instanceof Element) {
          getTranslatableElements(root).forEach(el => {
            ["placeholder", "title", "alt", "aria-label"].forEach(attr => {
              const val = el.getAttribute(attr);
              if (val && val.trim().length >= 2) {
                attrElements.push({ el, attr, text: val });
              }
            });
          });
        }
      });

      // Store originals
      allTextNodes.forEach(node => {
        if (!originalTextsMap.current.has(node)) {
          originalTextsMap.current.set(node, node.textContent || "");
        }
      });
      attrElements.forEach(({ el, attr, text }) => {
        if (!originalAttrsMap.current.has(el)) {
          originalAttrsMap.current.set(el, {});
        }
        const map = originalAttrsMap.current.get(el)!;
        if (!(attr in map)) {
          map[attr] = text;
        }
      });

      // Collect unique texts, check cache
      const uniqueTexts = new Map<string, string | null>();
      
      const allTexts = [
        ...allTextNodes.map(n => originalTextsMap.current.get(n) || n.textContent || ""),
        ...attrElements.map(a => originalAttrsMap.current.get(a.el)?.[a.attr] || a.text),
      ];

      for (const text of allTexts) {
        const trimmed = text.trim();
        if (trimmed.length < 2 || uniqueTexts.has(trimmed)) continue;
        const cached = getCached(trimmed, lang);
        uniqueTexts.set(trimmed, cached);
      }

      // Find uncached texts
      const uncachedTexts = Array.from(uniqueTexts.entries())
        .filter(([, val]) => val === null)
        .map(([key]) => key);

      // Batch translate uncached
      for (let i = 0; i < uncachedTexts.length; i += BATCH_SIZE) {
        const batch = uncachedTexts.slice(i, i + BATCH_SIZE);
        const translations = await translateBatch(batch, lang);
        batch.forEach((text, idx) => {
          const translation = translations[idx];
          uniqueTexts.set(text, translation);
          setCache(text, lang, translation);
        });
      }

      // Apply translations to text nodes
      allTextNodes.forEach(node => {
        const original = originalTextsMap.current.get(node) || "";
        const trimmed = original.trim();
        const translation = uniqueTexts.get(trimmed);
        if (translation && translation !== trimmed) {
          // Preserve whitespace
          const leadingSpace = original.match(/^\s*/)?.[0] || "";
          const trailingSpace = original.match(/\s*$/)?.[0] || "";
          node.textContent = leadingSpace + translation + trailingSpace;
        }
      });

      // Apply translations to attributes
      attrElements.forEach(({ el, attr }) => {
        const original = originalAttrsMap.current.get(el)?.[attr] || "";
        const trimmed = original.trim();
        const translation = uniqueTexts.get(trimmed);
        if (translation && translation !== trimmed) {
          el.setAttribute(attr, translation);
        }
      });
    } catch (err) {
      console.error("Page translation error:", err);
    } finally {
      isTranslating.current = false;
      // Restart observer
      startObserver();
    }
  }, []);

  const startObserver = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect();
    
    const observer = new MutationObserver((mutations) => {
      // Check if any meaningful text was added/changed
      const hasNewContent = mutations.some(m => 
        m.type === "childList" && m.addedNodes.length > 0
      );
      
      if (hasNewContent && !isTranslating.current) {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = window.setTimeout(() => {
          const lang = localStorage.getItem("ic_language") || "en";
          if (lang !== "en") {
            translatePage(lang);
          }
        }, DEBOUNCE_MS);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    observerRef.current = observer;
  }, [translatePage]);

  useEffect(() => {
    if (language === "en") {
      restoreOriginals();
      startObserver();
      return;
    }

    // Small delay to let React finish rendering
    const timer = setTimeout(() => {
      restoreOriginals();
      translatePage(language);
    }, 500);

    return () => clearTimeout(timer);
  }, [language, restoreOriginals, translatePage, startObserver]);

  // Also re-translate on route changes
  useEffect(() => {
    const handleRouteChange = () => {
      const lang = localStorage.getItem("ic_language") || "en";
      if (lang !== "en") {
        setTimeout(() => {
          originalTextsMap.current.clear();
          originalAttrsMap.current.clear();
          translatePage(lang);
        }, 800);
      }
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, [translatePage]);

  return null;
};

export default PageTranslator;
