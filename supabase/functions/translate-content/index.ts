import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const languageNames: Record<string, string> = {
  hi: "Hindi",
  ta: "Tamil",
  te: "Telugu",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { texts, targetLang } = await req.json();

    if (!texts || !Array.isArray(texts) || texts.length === 0) {
      return new Response(JSON.stringify({ error: "No texts provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!targetLang || targetLang === "en") {
      return new Response(JSON.stringify({ translations: texts }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const langName = languageNames[targetLang];
    if (!langName) {
      return new Response(JSON.stringify({ error: "Unsupported language" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build numbered list for accurate mapping
    const numberedTexts = texts.map((t: string, i: number) => `[${i}] ${t}`).join("\n");

    const prompt = `You are a professional translator. Translate the following English texts to ${langName}. 
Each line starts with [number]. Return ONLY the translations in the EXACT same format [number] translated_text, one per line.
Do NOT add any explanation, do NOT skip any line, do NOT change numbering.
Preserve any HTML tags, emojis, numbers, brand names (like "Infinitive Cloud"), email addresses, phone numbers, and URLs exactly as they are.
Translate naturally and accurately for a professional cloud hosting website.

${numberedTexts}`;

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "user", content: prompt },
        ],
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI Gateway error:", errText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Parse numbered responses
    const translations: string[] = new Array(texts.length).fill("");
    const lines = content.split("\n").filter((l: string) => l.trim());
    
    for (const line of lines) {
      const match = line.match(/^\[(\d+)\]\s*(.+)$/);
      if (match) {
        const idx = parseInt(match[1]);
        if (idx >= 0 && idx < texts.length) {
          translations[idx] = match[2].trim();
        }
      }
    }

    // Fill any missing translations with originals
    for (let i = 0; i < translations.length; i++) {
      if (!translations[i]) {
        translations[i] = texts[i];
      }
    }

    return new Response(JSON.stringify({ translations }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Translation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
