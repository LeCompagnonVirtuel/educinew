import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const UpdateRiskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  category: z.enum(['OPERATIONAL', 'FINANCIAL', 'COMPLIANCE', 'TECHNOLOGICAL', 'REPUTATIONAL', 'STRATEGIC']).optional(),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
  likelihood: z.number().int().min(1).max(5).optional(),
  impact: z.number().int().min(1).max(5).optional(),
  owner: z.string().optional(),
  mitigation_plan: z.string().optional(),
  status: z.enum(['IDENTIFIED', 'ASSESSED', 'MITIGATED', 'ACCEPTED', 'CLOSED']).optional(),
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

    const { data: risk, error } = await supabase
      .from('risk_register')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !risk) return NextResponse.json({ error: 'Risque introuvable' }, { status: 404 });

    return NextResponse.json(risk);
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
    const validation = UpdateRiskSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    const data = validation.data;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.severity !== undefined) updateData.severity = data.severity;
    if (data.likelihood !== undefined) updateData.likelihood = data.likelihood;
    if (data.impact !== undefined) updateData.impact = data.impact;
    if (data.owner !== undefined) updateData.owner = data.owner;
    if (data.mitigation_plan !== undefined) updateData.mitigation_plan = data.mitigation_plan;
    if (data.status !== undefined) updateData.status = data.status;

    if (updateData.likelihood !== undefined || updateData.impact !== undefined) {
      const likelihood = (updateData.likelihood as number) || 0;
      const impact = (updateData.impact as number) || 0;
      if (likelihood > 0 && impact > 0) {
        updateData.risk_score = likelihood * impact;
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'Aucun champ à modifier' }, { status: 400 });
    }

    updateData.updated_at = new Date().toISOString();

    const { data: risk, error } = await supabase
      .from('risk_register')
      .update(updateData)
      .eq('id', id)
      .eq('school_id', profile?.school_id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(risk);
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
      .from('risk_register')
      .select('id, school_id')
      .eq('id', id)
      .single();

    if (!existing) return NextResponse.json({ error: 'Risque introuvable' }, { status: 404 });
    if (existing.school_id !== profile?.school_id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const { error } = await supabase.from('risk_register').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
