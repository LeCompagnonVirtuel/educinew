import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
      'Set these in your environment variables (e.g. .env.local or Vercel dashboard).'
    );
  }

  const cookieStore = await cookies();

  return createServerClient(url, key, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component - ignore
          }
        },
      },
    }
  );
}

interface WithSupabaseOptions {
  auth?: 'user' | 'admin' | 'none';
}

interface SupabaseContext {
  supabase: Awaited<ReturnType<typeof createClient>>;
  user?: { id: string; email?: string };
  profile?: { role: string; school_id: string };
  schoolId?: string;
}

type HandlerFn = (
  req: NextRequest,
  ctx: SupabaseContext
) => Promise<Response | NextResponse>;

export function withSupabase(options: WithSupabaseOptions, handler: HandlerFn) {
  return async (req: NextRequest, routeParams?: { params: Promise<Record<string, string>> }) => {
    try {
      const supabase = await createClient();
      const ctx: SupabaseContext = { supabase };

      if (options.auth === 'user' || options.auth === 'admin') {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
        }
        ctx.user = user;

        const { data: profile } = await supabase
          .from('users')
          .select('role, school_id')
          .eq('id', user.id)
          .single();

        if (profile) {
          ctx.profile = profile;
          ctx.schoolId = profile.school_id;
        }

        if (!ctx.schoolId) {
          return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });
        }

        if (options.auth === 'admin' && profile?.role !== 'ADMIN' && profile?.role !== 'SUPER_ADMIN') {
          return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
        }
      }

      return await handler(req, ctx);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Erreur interne' },
        { status: 500 }
      );
    }
  };
}
