import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, handleCors } from "../_shared/cors.ts";
import { checkRateLimit } from "../_shared/rate-limit.ts";

serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;
  const headers = getCorsHeaders(req);

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const deepseekKey = Deno.env.get("DEEPSEEK_API_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const { allowed, remaining, resetIn } = await checkRateLimit(user.id, 10, 60_000);
    if (!allowed) {
      return new Response(JSON.stringify({ error: "Trop de requêtes. Réessayez dans quelques instants." }), {
        status: 429,
        headers: { ...headers, "Content-Type": "application/json", "X-RateLimit-Remaining": "0", "X-RateLimit-Reset": String(Math.ceil(resetIn / 1000)) },
      });
    }

    const { message, context } = await req.json();

    if (!message || typeof message !== "string" || message.length > 5000) {
      return new Response(JSON.stringify({ error: "Message invalide (max 5000 caractères)" }), {
        status: 400,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const safeContext = (typeof context === "string" ? context.slice(0, 2000) : "") as string;

    const systemPrompt = `Tu es EduCI AI, un assistant pédagogique intelligent pour les écoles en Afrique de l'Ouest.
    Tu aides les élèves, enseignants et parents avec:
    - L'explication de concepts et exercices
    - La génération de quiz et exercices
    - Les conseils d'étude
    - L'analyse des notes et performances
    Réponds toujours en français. Sois pédagogique et encourageant.
    ${safeContext ? `Contexte: ${safeContext}` : ""}`;

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${deepseekKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`DeepSeek API error ${response.status}: ${err}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Désolé, je n'ai pas pu traiter votre demande.";

    return new Response(JSON.stringify({ response: reply }), {
      headers: { ...headers, "Content-Type": "application/json", "X-RateLimit-Remaining": String(remaining) },
    });
  } catch (error) {
    console.error("[ai-chat] Fatal error:", error);
    return new Response(JSON.stringify({ error: "Erreur interne du service AI" }), {
      status: 500,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }
});
