import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export async function checkRateLimit(
  userId: string,
  maxRequests = 10,
  windowMs = 60_000
): Promise<{ allowed: boolean; remaining: number; resetIn: number }> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const windowStart = new Date(Date.now() - windowMs).toISOString();

  // SECURITY: Use RPC for atomic check-and-insert to prevent race conditions.
  // The RPC uses SELECT ... FOR UPDATE to lock the row during the check.
  const { data, error } = await supabase.rpc("check_rate_limit_atomic", {
    p_user_id: userId,
    p_window_start: windowStart,
    p_max_requests: maxRequests,
  });

  if (error) {
    // Fallback: if RPC doesn't exist yet, use insert-first strategy
    // Insert BEFORE counting to avoid race condition where two concurrent
    // requests both read count=9 and both proceed past the limit.
    // Worst case: we over-count by 1 (deny one extra request), which is safer than under-counting.
    await supabase.from("rate_limits").insert({ user_id: userId });

    const { count } = await supabase
      .from("rate_limits")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", windowStart);

    const currentCount = count || 0;

    if (currentCount > maxRequests) {
      return { allowed: false, remaining: 0, resetIn: windowMs };
    }

    return { allowed: true, remaining: Math.max(0, maxRequests - currentCount), resetIn: windowMs };
  }

  // RPC returns { allowed: boolean, current_count: number }
  const result = Array.isArray(data) ? data[0] : data;
  return {
    allowed: result?.allowed ?? false,
    remaining: Math.max(0, maxRequests - (result?.current_count ?? maxRequests)),
    resetIn: windowMs,
  };
}
