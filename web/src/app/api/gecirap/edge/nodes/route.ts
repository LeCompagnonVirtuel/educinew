import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

export const dynamic = 'force-dynamic';

const CreateSchema = z.object({
  name: z.string().min(1, 'Nom requis'),
  description: z.string().optional(),
  location: z.string().optional(),
  type: z.enum(['CDN', 'IOT_GATEWAY', 'MICRO_DC', 'COLLABORATION']),
  config: z.record(z.unknown()).optional(),
  status: z.enum(['ONLINE', 'OFFLINE', 'DEGRADED', 'MAINTENANCE']).optional(),
});

export async function GET(request: NextRequest) {
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
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifie' }, { status: 401 });
    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Etablissement requis' }, { status: 403 });
    if (!['SUPER_ADMIN', 'ADMIN'].includes(profile?.role)) return NextResponse.json({ error: 'Non autorise' }, { status: 403 });
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;
    let query = supabase.from('edge_nodes').select('*', { count: 'exact' }).eq('school_id', schoolId).is('deleted_at', null);
    const status = url.searchParams.get('status');
    if (status) query = query.eq('status', status);
    const search = url.searchParams.get('search');
    if (search) query = query.ilike('name', `%${search}%`);
    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);
    const { data, error, count } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data: data || [], total: count || 0, page, limit, totalPages: Math.ceil((count || 0) / limit) });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
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
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifie' }, { status: 401 });
    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Etablissement requis' }, { status: 403 });
    if (!['SUPER_ADMIN', 'ADMIN'].includes(profile?.role)) return NextResponse.json({ error: 'Non autorise' }, { status: 403 });
    const body = await request.json();
    const validation = CreateSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message }));
      return NextResponse.json({ error: 'Donnees invalides', errors }, { status: 400 });
    }
    const data = validation.data;
    const { data: record, error } = await supabase.from('edge_nodes').insert({
      school_id: schoolId, name: data.name, description: data.description || null,
      location: data.location || null, type: data.type,
      config: data.config || {}, status: data.status || 'OFFLINE', created_by: user.id,
    }).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
