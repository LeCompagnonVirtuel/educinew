import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const UpdatePlanSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  type: z.enum(['DISASTER_RECOVERY', 'BUSINESS_CONTINUITY', 'CRISIS_MANAGEMENT', 'COMMUNICATION']).optional(),
  scope: z.string().optional(),
  recovery_time_objective_hours: z.number().int().positive().optional(),
  recovery_point_objective_hours: z.number().int().positive().optional(),
  procedures: z.array(z.record(z.unknown())).optional(),
  contacts: z.array(z.record(z.unknown())).optional(),
  status: z.enum(['DRAFT', 'ACTIVE', 'INACTIVE']).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { id } = await params;

    const { data: plan, error } = await supabase
      .from('bcp_plans')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !plan) return NextResponse.json({ error: 'Plan introuvable' }, { status: 404 });

    return NextResponse.json(plan);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
    if (!allowedRoles.includes(profile?.role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const validation = UpdatePlanSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    const data = validation.data;
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.scope !== undefined) updateData.scope = data.scope;
    if (data.recovery_time_objective_hours !== undefined) updateData.recovery_time_objective_hours = data.recovery_time_objective_hours;
    if (data.recovery_point_objective_hours !== undefined) updateData.recovery_point_objective_hours = data.recovery_point_objective_hours;
    if (data.procedures !== undefined) updateData.procedures = data.procedures;
    if (data.contacts !== undefined) updateData.contacts = data.contacts;
    if (data.status !== undefined) updateData.status = data.status;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'Aucun champ à modifier' }, { status: 400 });
    }

    updateData.updated_at = new Date().toISOString();

    const { data: plan, error } = await supabase
      .from('bcp_plans')
      .update(updateData)
      .eq('id', id)
      .eq('school_id', profile?.school_id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(plan);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
    if (!allowedRoles.includes(profile?.role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const { id } = await params;

    const { data: existing } = await supabase
      .from('bcp_plans')
      .select('id, school_id')
      .eq('id', id)
      .single();

    if (!existing) return NextResponse.json({ error: 'Plan introuvable' }, { status: 404 });
    if (existing.school_id !== profile?.school_id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const { error } = await supabase.from('bcp_plans').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
