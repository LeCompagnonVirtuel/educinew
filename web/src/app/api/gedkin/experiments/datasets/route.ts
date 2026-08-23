import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

export const dynamic = 'force-dynamic';

const ListSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  experiment_id: z.string().uuid().optional(),
  status: z.string().optional(),
  search: z.string().optional(),
});

const CreateSchema = z.object({
  name: z.string().min(1, 'Nom requis'),
  description: z.string().max(1000).optional(),
  experiment_id: z.string().uuid('ID experience invalide'),
  source: z.string().min(1, 'Source requise'),
  format: z.enum(['CSV', 'JSON', 'PARQUET', 'SQL', 'API']),
  size_bytes: z.number().int().min(0).optional(),
  row_count: z.number().int().min(0).optional(),
  schema_definition: z.record(z.unknown()).optional(),
  status: z.enum(['UPLOADING', 'READY', 'ERROR']).optional(),
  metadata: z.record(z.unknown()).optional(),
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
    if (!user) return NextResponse.json({ error: 'Non authentifie' }, { status: 401 });

    const { data: profile } = await supabase
      .from('users')
      .select('role, school_id')
      .eq('id', user.id)
      .single();

    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Etablissement requis' }, { status: 403 });

    const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR', 'ENSEIGNANT'];
    if (!allowedRoles.includes(profile?.role)) {
      return NextResponse.json({ error: 'Non autorise' }, { status: 403 });
    }

    const url = new URL(request.url);
    const searchParams = Object.fromEntries(url.searchParams.entries());

    const validation = ListSchema.safeParse(searchParams);
    if (!validation.success) {
      return NextResponse.json({ error: 'Parametres invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const filters = validation.data;
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('gedkin_datasets')
      .select('*', { count: 'exact' })
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters.experiment_id) query = query.eq('experiment_id', filters.experiment_id);
    if (filters.status) query = query.eq('status', filters.status);
    if (filters.search) query = query.ilike('name', `%${filters.search}%`);

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
    if (!user) return NextResponse.json({ error: 'Non authentifie' }, { status: 401 });

    const { data: profile } = await supabase
      .from('users')
      .select('role, school_id')
      .eq('id', user.id)
      .single();

    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Etablissement requis' }, { status: 403 });

    const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR', 'ENSEIGNANT'];
    if (!allowedRoles.includes(profile?.role)) {
      return NextResponse.json({ error: 'Non autorise' }, { status: 403 });
    }

    const body = await request.json();
    const validation = CreateSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Donnees invalides', errors }, { status: 400 });
    }

    const data = validation.data;
    const { data: record, error } = await supabase
      .from('gedkin_datasets')
      .insert({
        school_id: schoolId,
        name: data.name,
        description: data.description || null,
        experiment_id: data.experiment_id,
        source: data.source,
        format: data.format,
        size_bytes: data.size_bytes || 0,
        row_count: data.row_count || 0,
        schema_definition: data.schema_definition || {},
        status: data.status || 'UPLOADING',
        metadata: data.metadata || {},
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
