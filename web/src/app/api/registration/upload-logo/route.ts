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

const uploadRateMap = new Map<string, { count: number; resetAt: number }>();

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
    const now = Date.now();
    const entry = uploadRateMap.get(ip);
    if (!entry || now > entry.resetAt) {
      uploadRateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    } else {
      entry.count++;
      if (entry.count > 10) {
        return NextResponse.json({ error: 'Trop de requêtes' }, { status: 429 });
      }
    }

    const supabase = getSupabaseAdmin();
    const formData = await request.formData();
    const sessionToken = formData.get('sessionToken') as string | null;
    if (!sessionToken) {
      return NextResponse.json({ error: 'Session token requis' }, { status: 401 });
    }

    const { data: draft } = await supabase
      .from('registration_drafts_v2')
      .select('id')
      .eq('session_token', sessionToken)
      .maybeSingle();
    if (!draft) {
      return NextResponse.json({ error: 'Session invalide' }, { status: 403 });
    }

    const file = formData.get('file') as File | null;
    const type = (formData.get('type') as string) || 'logo';

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: 'Fichier trop volumineux (max 2MB)' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Format non supporté' }, { status: 400 });
    }

    // Use MIME type to determine extension â€” never trust user-supplied filename
    const MIME_TO_EXT: Record<string, string> = {
      'image/png': 'png',
      'image/jpeg': 'jpg',
      'image/webp': 'webp',
      'image/svg+xml': 'svg',
    };
    const ext = MIME_TO_EXT[file.type] || 'png';
    const safeType = (type || 'logo').replace(/[^a-z0-9_-]/gi, '');
    const filename = `${Date.now()}_${safeType}.${ext}`;
    const path = `registration/${filename}`;

    const { error: uploadError } = await supabase.storage
      .from('school-logos')
      .upload(path, file, { upsert: true });

    if (uploadError) {
      console.error('[upload-logo] Storage error:', uploadError);
      return NextResponse.json({ error: "Erreur lors de l'upload" }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from('school-logos')
      .getPublicUrl(path);

    return NextResponse.json({ url: urlData?.publicUrl || null });
  } catch (error: any) {
    console.error('[upload-logo] Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
