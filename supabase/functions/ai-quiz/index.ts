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

    const { allowed, remaining } = await checkRateLimit(user.id, 10, 60_000);
    if (!allowed) {
      return new Response(JSON.stringify({ error: "Trop de requêtes. Réessayez dans quelques instants." }), {
        status: 429,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const { subject, level, count } = await req.json();
    const numQuestions = Math.min(count || 5, 20);
    const safeSubject = (typeof subject === "string" ? subject.slice(0, 100) : "général");
    const safeLevel = (typeof level === "string" ? level.slice(0, 50) : "moyen");

    const systemPrompt = `Tu es EduCI AI, un générateur de quiz pour les écoles en Afrique de l'Ouest.
    Génère des questions de quiz sur le sujet: ${safeSubject}.
    Niveau: ${safeLevel}.
    Format: retourne un JSON valide avec un tableau "questions" contenant:
    - "question": la question
    - "options": tableau de 4 options (A, B, C, D)
    - "correct": la lettre de la bonne réponse (A, B, C, ou D)
    - "explanation": courte explication de la réponse
    Sois precis et pedagogique. Adapte le niveau de difficulte.`;

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
          { role: "user", content: `Génère ${numQuestions} questions de quiz sur ${safeSubject} de niveau ${safeLevel}. Retourne UNIQUEMENT le JSON, pas de texte avant ou après.` },
        ],
        temperature: 0.8,
        max_tokens: 3000,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`DeepSeek API error ${response.status}: ${err}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "[]";

    let questions;
    try {
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      questions = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(content);
    } catch {
      questions = [];
    }

    return new Response(JSON.stringify({ questions }), {
      headers: { ...headers, "Content-Type": "application/json", "X-RateLimit-Remaining": String(remaining) },
    });
  } catch (error) {
    console.error("[ai-quiz] Fatal error:", error);
    return new Response(JSON.stringify({ error: "Erreur interne du service AI" }), {
      status: 500,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }
});
