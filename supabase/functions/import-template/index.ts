import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, handleCors } from "../_shared/cors.ts";
import { checkRateLimit } from "../_shared/rate-limit.ts";

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rateLimit = await checkRateLimit(user.id, 10, 60_000);
    if (!rateLimit.allowed) {
      return new Response(JSON.stringify({ error: "Trop de requêtes. Réessayez plus tard." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate school_id
    const { data: userData } = await supabase
      .from("users")
      .select("school_id")
      .eq("id", user.id)
      .single();

    if (!userData?.school_id) {
      return new Response(JSON.stringify({ error: "Utilisateur non lié à un établissement" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = new URL(req.url);
    const type = url.searchParams.get("type") || "students";
    const allowedTypes = ["students", "teachers"];
    if (!allowedTypes.includes(type)) {
      return new Response(JSON.stringify({ error: "Type invalide. Autorisés: students, teachers" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let csv: string;
    if (type === "teachers") {
      csv = "nom,prenom,sexe,email,telephone,matiere_principale,classes_enseignees,adresse\n";
      csv += "Kouassi,Jean,M,jean.kouassi@educi.ci,+22507010203,Mathématiques,Terminale A;Première B,Abidjan\n";
      csv += "Amani,Marie,F,marie.amani@educi.ci,+22507040506,Français,Seconde C;3ème A,Yamoussoukro\n";
    } else {
      csv = "nom,prenom,sexe,classe,matricule,nom_parent,telephone_parent,email_parent,adresse\n";
      csv += "Traoré,Konan,M,Terminale A,16137807D,Traoré Pierre,+22507010203,pierre.traore@email.ci,Abidjan\n";
      csv += "Ouattara,Fatou,F,Première B,14256894A,Ouattara Amadou,+22507040506,amadou.ouattara@email.ci,Bouaké\n";
    }

    return new Response(csv, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="template_${type}.csv"`,
      },
    });
  } catch (error) {
    console.error("[import-template] Fatal error:", error);
    return new Response(JSON.stringify({ error: "Erreur interne" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
