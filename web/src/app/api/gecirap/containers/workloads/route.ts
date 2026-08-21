import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const ListSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  cluster_id: z.string().uuid().optional(),
  namespace: z.string().optional(),
  status: z.string().optional(),
  search: z.string().optional(),
});

const CreateSchema = z.object({
  clusterId: z.string().uuid('ID cluster invalide'),
  name: z.string().min(1, 'Nom requis'),
  namespace: z.string().optional(),
  type: z.enum(['DEPLOYMENT', 'STATEFULSET', 'DAEMONSET', 'CRONJOB', 'JOB']),
  replicas: z.number().int().min(0).optional(),
  config: z.record(z.unknown()).optional(),
  status: z.enum(['PENDING', 'RUNNING', 'FAILED', 'SCALED_DOWN']).optional(),
});

export async function GET(request: NextRequest) {
  try {
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

    const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
    if (!allowedRoles.includes(profile?.role)) {
      return NextResponse.json({ error: 'Non autorise' }, { status: 403 });
    }

    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());

    const validation = ListSchema.safeParse(params);
    if (!validation.success) {
      return NextResponse.json({ error: 'Parametres invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const filters = validation.data;
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('container_workloads')
      .select('*, cluster:container_clusters(id, name, engine)', { count: 'exact' })
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters.cluster_id) query = query.eq('cluster_id', filters.cluster_id);
    if (filters.namespace) query = query.eq('namespace', filters.namespace);
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

    const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
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
      .from('container_workloads')
      .insert({
        school_id: schoolId,
        cluster_id: data.clusterId,
        name: data.name,
        namespace: data.namespace || 'default',
        type: data.type,
        replicas: data.replicas || 1,
        config: data.config || {},
        status: data.status || 'PENDING',
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
