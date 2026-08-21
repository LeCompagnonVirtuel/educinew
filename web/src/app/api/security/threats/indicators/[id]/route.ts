import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const UpdateIndicatorSchema = z.object({
  type: z.enum(['IP', 'DOMAIN', 'HASH', 'URL', 'EMAIL', 'FILE', 'OTHER']).optional(),
  value: z.string().min(1).optional(),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
  confidence: z.number().int().min(0).max(100).optional(),
  source: z.string().optional(),
  tags: z.array(z.string()).optional(),
  context: z.record(z.unknown()).optional(),
  status: z.enum(['ACTIVE', 'EXPIRED', 'REVOKED']).optional(),
  expiry: z.string().optional(),
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

    const { data: indicator, error } = await supabase
      .from('threat_indicators')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !indicator) return NextResponse.json({ error: 'Indicateur introuvable' }, { status: 404 });

    return NextResponse.json(indicator);
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
    const validation = UpdateIndicatorSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    const data = validation.data;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.value !== undefined) updateData.value = data.value;
    if (data.severity !== undefined) updateData.severity = data.severity;
    if (data.confidence !== undefined) updateData.confidence = data.confidence;
    if (data.source !== undefined) updateData.source = data.source;
    if (data.tags !== undefined) updateData.tags = data.tags;
    if (data.context !== undefined) updateData.context = data.context;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.expiry !== undefined) updateData.expiry = data.expiry;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'Aucun champ à modifier' }, { status: 400 });
    }

    updateData.updated_at = new Date().toISOString();

    const { data: indicator, error } = await supabase
      .from('threat_indicators')
      .update(updateData)
      .eq('id', id)
      .eq('school_id', profile?.school_id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(indicator);
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
      .from('threat_indicators')
      .select('id, school_id')
      .eq('id', id)
      .single();

    if (!existing) return NextResponse.json({ error: 'Indicateur introuvable' }, { status: 404 });
    if (existing.school_id !== profile?.school_id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const { error } = await supabase.from('threat_indicators').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
