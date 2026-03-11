import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const BATCH_SIZE = 50;

// In-memory cache (persists across renders, instant lookup)
const translationCache: Record<string, Record<string, string>> = {};

function getCache(lang: string): Record<string, string> {
  if (!translationCache[lang]) {
    // Load from localStorage on first access
    try {
      const stored = localStorage.getItem(`ic_translations_${lang}`);
      translationCache[lang] = stored ? JSON.parse(stored) : {};
    } catch {
      translationCache[lang] = {};
    }
  }
  return translationCache[lang];
}

function saveCache(lang: string) {
  try {
    localStorage.setItem(`ic_translations_${lang}`, JSON.stringify(translationCache[lang] || {}));
  } catch { /* full */ }
}

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE", "IFRAME", "SVG", "PATH", "IMG", "INPUT", "TEXTAREA", "SELECT", "LINK", "META"]);

function collectTextNodes(root: Node): Text[] {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const text = node.textContent?.trim();
      if (!text || text.length < 2) return NodeFilter.FILTER_REJECT;
      // Skip purely numeric/symbol text
      if (/^[\d\s₹$€£%+×.,/:@#&\-–—()]+$/.test(text)) return NodeFilter.FILTER_REJECT;
      let parent = node.parentElement;
      while (parent) {
        if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
        parent = parent.parentElement;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  return nodes;
}

async function translateBatch(texts: string[], lang: string): Promise<string[]> {
  try {
    const { data, error } = await supabase.functions.invoke("translate-content", {
      body: { texts, targetLang: lang },
    });
    if (error) throw error;
    return data?.translations || texts;
  } catch (err) {
    console.error("Translation batch error:", err);
    return texts;
  }
}

const PageTranslator = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const originals = useRef<Map<Text, string>>(new Map());
  const isTranslating = useRef(false);
  const abortRef = useRef(false);

  const restoreAll = useCallback(() => {
    originals.current.forEach((orig, node) => {
      if (node.parentNode) node.textContent = orig;
    });
    originals.current.clear();
  }, []);

  const translatePage = useCallback(async (lang: string) => {
    if (lang === "en") return;
    if (isTranslating.current) {
      abortRef.current = true;
      // Wait a tick for previous to stop
      await new Promise(r => setTimeout(r, 50));
    }
    
    isTranslating.current = true;
    abortRef.current = false;

    try {
      // Collect from entire document body
      const textNodes = collectTextNodes(document.body);
      
      // Store originals & collect unique texts
      const uniqueTexts = new Set<string>();
      const cache = getCache(lang);

      textNodes.forEach(node => {
        if (!originals.current.has(node)) {
          originals.current.set(node, node.textContent || "");
        }
        const original = originals.current.get(node)!;
        const trimmed = original.trim();
        if (trimmed.length >= 2) uniqueTexts.add(trimmed);
      });

      // Phase 1: Apply cached translations IMMEDIATELY
      textNodes.forEach(node => {
        const original = originals.current.get(node) || "";
        const trimmed = original.trim();
        if (cache[trimmed]) {
          const lead = original.match(/^\s*/)?.[0] || "";
          const trail = original.match(/\s*$/)?.[0] || "";
          node.textContent = lead + cache[trimmed] + trail;
        }
      });

      // Phase 2: Find uncached texts
      const uncached = Array.from(uniqueTexts).filter(t => !cache[t]);
      
      if (uncached.length === 0) {
        isTranslating.current = false;
        return;
      }

      // Send ALL batches in parallel
      const batches: string[][] = [];
      for (let i = 0; i < uncached.length; i += BATCH_SIZE) {
        batches.push(uncached.slice(i, i + BATCH_SIZE));
      }

      const results = await Promise.all(batches.map(batch => translateBatch(batch, lang)));
      
      if (abortRef.current) { isTranslating.current = false; return; }

      // Store results in cache
      batches.forEach((batch, bIdx) => {
        const translations = results[bIdx];
        batch.forEach((text, tIdx) => {
          if (translations[tIdx] && translations[tIdx] !== text) {
            cache[text] = translations[tIdx];
          }
        });
      });

      // Save cache to localStorage
      saveCache(lang);

      // Apply newly translated texts
      textNodes.forEach(node => {
        if (!node.parentNode) return; // Node removed from DOM
        const original = originals.current.get(node) || "";
        const trimmed = original.trim();
        if (cache[trimmed] && node.textContent?.trim() !== cache[trimmed]) {
          const lead = original.match(/^\s*/)?.[0] || "";
          const trail = original.match(/\s*$/)?.[0] || "";
          node.textContent = lead + cache[trimmed] + trail;
        }
      });
    } catch (err) {
      console.error("Translation error:", err);
    } finally {
      isTranslating.current = false;
    }
  }, []);

  // Main language change effect
  useEffect(() => {
    if (language === "en") {
      restoreAll();
      return;
    }
    // Minimal delay for React to finish rendering
    const timer = setTimeout(() => {
      restoreAll();
      translatePage(language);
    }, 100);
    return () => clearTimeout(timer);
  }, [language, restoreAll, translatePage]);

  // Re-translate on route change
  useEffect(() => {
    if (language === "en") return;
    const timer = setTimeout(() => {
      originals.current.clear();
      translatePage(language);
    }, 300);
    return () => clearTimeout(timer);
  }, [location.pathname, language, translatePage]);

  // Observe new DOM content (lazy-loaded sections, etc.)
  useEffect(() => {
    if (language === "en") return;
    let debounce: number;
    const observer = new MutationObserver(() => {
      if (isTranslating.current) return;
      clearTimeout(debounce);
      debounce = window.setTimeout(() => translatePage(language), 400);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); clearTimeout(debounce); };
  }, [language, translatePage]);

  return null;
};

export default PageTranslator;
