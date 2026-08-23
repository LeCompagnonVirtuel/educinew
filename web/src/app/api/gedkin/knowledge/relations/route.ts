import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

export const dynamic = 'force-dynamic';

const ListSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  source_id: z.string().uuid().optional(),
  target_id: z.string().uuid().optional(),
  type: z.string().optional(),
});

const CreateSchema = z.object({
  source_id: z.string().uuid('ID source invalide'),
  target_id: z.string().uuid('ID cible invalide'),
  type: z.enum(['DEPENDS_ON', 'RELATED_TO', 'CONTAINS', 'PRODUCES', 'CONSUMES', 'INherits']),
  weight: z.number().min(0).max(1).optional(),
  properties: z.record(z.unknown()).optional(),
  description: z.string().max(500).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifiÃ©' }, { status: 401 });

    const { data: profile } = await supabase
      .from('users')
      .select('role, school_id')
      .eq('id', user.id)
      .single();

    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Ã‰tablissement requis' }, { status: 403 });

    const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR'];
    if (!allowedRoles.includes(profile?.role)) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 403 });
    }

    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());

    const validation = ListSchema.safeParse(params);
    if (!validation.success) {
      return NextResponse.json({ error: 'ParamÃ¨tres invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const filters = validation.data;
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('gedkin_relations')
      .select('*', { count: 'exact' })
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters.source_id) query = query.eq('source_id', filters.source_id);
    if (filters.target_id) query = query.eq('target_id', filters.target_id);
    if (filters.type) query = query.eq('type', filters.type);

    query = query.order('created_at', { ascending: false });
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      data: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
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
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifiÃ©' }, { status: 401 });

    const { data: profile } = await supabase
      .from('users')
      .select('role, school_id')
      .eq('id', user.id)
      .single();

    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Ã‰tablissement requis' }, { status: 403 });

    const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR'];
    if (!allowedRoles.includes(profile?.role)) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 403 });
    }

    const body = await request.json();
    const validation = CreateSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'DonnÃ©es invalides', errors }, { status: 400 });
    }

    const data = validation.data;
    const { data: record, error } = await supabase
      .from('gedkin_relations')
      .insert({
        school_id: schoolId,
        source_id: data.source_id,
        target_id: data.target_id,
        type: data.type,
        weight: data.weight || 1.0,
        properties: data.properties || {},
        description: data.description || null,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
