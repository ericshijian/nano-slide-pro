import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SlideContent {
  title: string;
  content: string[];
  imagePrompt: string;
  notes: string;
}

interface AnalysisResult {
  title: string;
  slides: SlideContent[];
  summary: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { documentContent, style, slideCount, language } = await req.json();
    
    console.log("Analyzing document with style:", style, "slideCount:", slideCount, "language:", language);
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const slideCountInstruction = slideCount === 0 
      ? "determine the optimal number of slides based on the content (typically 5-10 slides)"
      : `create exactly ${slideCount} slides`;

    const languageInstruction = language === 'cn' 
      ? "Generate all content in Chinese (Simplified Chinese). All titles, content, and notes should be in Chinese."
      : "Generate all content in English.";

    const systemPrompt = `You are an expert presentation designer. Your task is to analyze documents and create professional slide content.

${languageInstruction}

Style: ${style}
- Corporate: Professional, clean, business-focused with formal language
- Creative: Bold, expressive, using metaphors and creative language
- Cyberpunk: Futuristic, tech-forward, using technical jargon and neon aesthetic descriptions
- Minimal: Clean, concise, focusing on key points with minimal text
- Academic: Scholarly, well-researched, with citations and detailed explanations

For each slide, provide:
1. A compelling title
2. 3-5 bullet points of key content
3. A detailed image generation prompt (in English, for AI image generation)
4. Speaker notes`;

    const userPrompt = `Analyze this document and ${slideCountInstruction}:

${documentContent}

Return a JSON response with this exact structure:
{
  "title": "Presentation title",
  "slides": [
    {
      "title": "Slide title",
      "content": ["Bullet point 1", "Bullet point 2", "Bullet point 3"],
      "imagePrompt": "A detailed prompt for generating a relevant image in ${style} style...",
      "notes": "Speaker notes for this slide..."
    }
  ],
  "summary": "Brief summary of the presentation"
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    console.log("AI response received successfully");

    const content = aiResponse.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("No content in AI response");
    }

    let analysisResult: AnalysisResult;
    try {
      analysisResult = JSON.parse(content);
    } catch {
      console.error("Failed to parse AI response as JSON:", content);
      throw new Error("Invalid JSON response from AI");
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("analyze-document error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
