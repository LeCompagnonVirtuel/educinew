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
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const { exercise, subject } = await req.json();

    if (!exercise || typeof exercise !== "string" || exercise.length > 5000) {
      return new Response(JSON.stringify({ error: "Exercice invalide (max 5000 caractères)" }), {
        status: 400,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const safeSubject = (typeof subject === "string" ? subject.slice(0, 100) : "général");

    const systemPrompt = `Tu es EduCI AI, un assistant pédagogique spécialisé en ${safeSubject}.
    Tu aides les élèves d'Afrique de l'Ouest à comprendre leurs exercices.
    Explique étape par étape, avec des exemples simples et concrets.
    Utilise un langage clair et encourageant.
    Si l'exercice contient des calculs, montre le raisonnement complet.`;

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
          { role: "user", content: `Explique cet exercice de ${safeSubject}:\n\n${exercise}` },
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
    const reply = data.choices?.[0]?.message?.content || "Désolé, je n'ai pas pu expliquer cet exercice.";

    return new Response(JSON.stringify({ response: reply }), {
      headers: { ...headers, "Content-Type": "application/json", "X-RateLimit-Remaining": String(remaining) },
    });
  } catch (error) {
    console.error("[ai-explain] Fatal error:", error);
    return new Response(JSON.stringify({ error: "Erreur interne du service AI" }), {
      status: 500,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }
});
