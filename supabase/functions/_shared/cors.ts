const PROD_ORIGINS = [
  "https://educi.ci",
  "https://www.educi.ci",
  "https://app.educi.ci",
  "https://educi.live",
  "https://www.educi.live",
  "https://educi-web.vercel.app",
];

const DEV_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
];

const IS_PRODUCTION = Deno.env.get("ENVIRONMENT") === "production" || !Deno.env.get("ENVIRONMENT");
const ALLOWED_ORIGINS = IS_PRODUCTION ? PROD_ORIGINS : [...PROD_ORIGINS, ...DEV_ORIGINS];

export function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") || "";
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Max-Age": "86400",
  };
}

export function handleCors(req: Request): Response | null {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: getCorsHeaders(req) });
  }
  return null;
}
