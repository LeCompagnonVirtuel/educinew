import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export interface AuthResult {
  user: { id: string; email: string; [key: string]: unknown };
  schoolId: string;
  role: string;
  supabase: ReturnType<typeof createClient>;
}

export async function authenticateRequest(req: Request): Promise<AuthResult | Response> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Non authentifié" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    return new Response(JSON.stringify({ error: "Token manquant" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return new Response(JSON.stringify({ error: "Non authentifié" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // SECURITY: Always query the database for school_id and role.
  // Never trust user_metadata — it is client-writable via supabase.auth.updateUser().
  const { data: userData } = await supabase
    .from("users")
    .select("school_id, role, is_active")
    .eq("id", user.id)
    .single();

  if (!userData) {
    return new Response(JSON.stringify({ error: "Profil utilisateur introuvable" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!userData.school_id) {
    return new Response(JSON.stringify({ error: "Utilisateur non lié à un établissement" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (userData.is_active === false) {
    return new Response(JSON.stringify({ error: "Compte désactivé" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  return { user, schoolId: userData.school_id, role: userData.role || "STUDENT", supabase };
}

export function requireRole(allowedRoles: string[], role: string): Response | null {
  if (!allowedRoles.includes(role)) {
    return new Response(JSON.stringify({ error: "Autorisation insuffisante" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }
  return null;
}

export function requireAuth(req: Request): { token: string; response?: Response } {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      token: "",
      response: new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }),
    };
  }
  return { token: authHeader.replace("Bearer ", "") };
}

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
    },
  });
}
