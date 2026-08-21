import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const UpdateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  sourceProviderId: z.string().uuid().optional(),
  targetProviderId: z.string().uuid().optional(),
  resourceIds: z.array(z.string().uuid()).optional(),
  strategy: z.enum(['LIVE', 'SCHEDULED', 'MANUAL']).optional(),
  config: z.record(z.unknown()).optional(),
  status: z.enum(['DRAFT', 'IN_PROGRESS', 'COMPLETED', 'FAILED']).optional(),
});

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifie' }, { status: 401 });
    const { id } = await params;
    const { data: record, error } = await supabase
      .from('multicloud_migrations').select('*, source_provider:cloud_providers!multicloud_migrations_source_provider_id_fkey(id, name), target_provider:cloud_providers!multicloud_migrations_target_provider_id_fkey(id, name)')
      .eq('id', id).is('deleted_at', null).single();
    if (error || !record) return NextResponse.json({ error: 'Migration introuvable' }, { status: 404 });
    return NextResponse.json(record);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifie' }, { status: 401 });
    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    if (!['SUPER_ADMIN', 'ADMIN'].includes(profile?.role)) return NextResponse.json({ error: 'Non autorise' }, { status: 403 });
    const { id } = await params;
    const body = await request.json();
    const validation = UpdateSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message }));
      return NextResponse.json({ error: 'Donnees invalides', errors }, { status: 400 });
    }
    const updateData: Record<string, unknown> = {};
    const data = validation.data;
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.sourceProviderId !== undefined) updateData.source_provider_id = data.sourceProviderId;
    if (data.targetProviderId !== undefined) updateData.target_provider_id = data.targetProviderId;
    if (data.resourceIds !== undefined) updateData.resource_ids = data.resourceIds;
    if (data.strategy !== undefined) updateData.strategy = data.strategy;
    if (data.config !== undefined) updateData.config = data.config;
    if (data.status !== undefined) updateData.status = data.status;
    if (Object.keys(updateData).length === 0) return NextResponse.json({ error: 'Aucun champ a modifier' }, { status: 400 });
    updateData.updated_at = new Date().toISOString();
    const { data: record, error } = await supabase.from('multicloud_migrations').update(updateData).eq('id', id).eq('school_id', profile?.school_id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(record);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
