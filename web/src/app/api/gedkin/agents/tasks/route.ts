import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const ListSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  agent_id: z.string().uuid().optional(),
  status: z.string().optional(),
  search: z.string().optional(),
});

const CreateSchema = z.object({
  title: z.string().min(1, 'Titre requis'),
  description: z.string().max(1000).optional(),
  agent_id: z.string().uuid('ID agent invalide'),
  task_type: z.enum(['ANALYZE', 'COLLECT', 'GENERATE', 'MONITOR', 'REPORT']),
  input: z.record(z.unknown()).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  status: z.enum(['PENDING', 'RUNNING', 'COMPLETED', 'FAILED']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase
      .from('users')
      .select('role, school_id')
      .eq('id', user.id)
      .single();

    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR'];
    if (!allowedRoles.includes(profile?.role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());

    const validation = ListSchema.safeParse(params);
    if (!validation.success) {
      return NextResponse.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const filters = validation.data;
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('gedkin_tasks')
      .select('*', { count: 'exact' })
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters.agent_id) query = query.eq('agent_id', filters.agent_id);
    if (filters.status) query = query.eq('status', filters.status);
    if (filters.search) query = query.ilike('title', `%${filters.search}%`);

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
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase
      .from('users')
      .select('role, school_id')
      .eq('id', user.id)
      .single();

    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const allowedRoles = ['SUPER_ADMIN', 'ADMIN', 'DIRECTEUR'];
    if (!allowedRoles.includes(profile?.role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const body = await request.json();
    const validation = CreateSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const data = validation.data;
    const { data: record, error } = await supabase
      .from('gedkin_tasks')
      .insert({
        school_id: schoolId,
        title: data.title,
        description: data.description || null,
        agent_id: data.agent_id,
        task_type: data.task_type,
        input: data.input || {},
        priority: data.priority || 'MEDIUM',
        status: data.status || 'PENDING',
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
