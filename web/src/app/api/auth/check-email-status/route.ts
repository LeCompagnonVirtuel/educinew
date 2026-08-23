import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing Supabase env vars');
  return createClient(url, key);
}

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 60;

async function isRateLimited(supabase: ReturnType<typeof getSupabaseAdmin>, ip: string): Promise<boolean> {
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_SECONDS * 1000).toISOString();
  const { count } = await supabase
    .from('otp_rate_limits')
    .select('id', { count: 'exact', head: true })
    .eq('identifier', ip)
    .eq('action', 'check-email-status')
    .gte('created_at', windowStart);

  return (count || 0) >= RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const supabase = getSupabaseAdmin();

    if (await isRateLimited(supabase, ip)) {
      return NextResponse.json({ error: 'Trop de requêtes' }, { status: 429 });
    }

    // Log this request for rate limiting
    await supabase.from('otp_rate_limits').insert({
      identifier: ip,
      action: 'check-email-status',
    });

    const { email } = await request.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const { data, error } = await supabase.rpc('check_auth_user_exists', {
      p_email: normalizedEmail,
    });

    if (error || !data || data.length === 0 || !data[0]?.found) {
      return NextResponse.json({ exists: false, emailConfirmed: false });
    }

    const userId = data[0].user_id;
    const { data: { user: authUser } } = await supabase.auth.admin.getUserById(userId);

    if (!authUser) {
      return NextResponse.json({ exists: false, emailConfirmed: false });
    }

    return NextResponse.json({
      exists: true,
      emailConfirmed: !!authUser.email_confirmed_at,
    });
  } catch (error: any) {
    console.error('[check-email-status] Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
