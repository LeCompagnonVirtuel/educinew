import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const UpdateFeedSchema = z.object({
  name: z.string().min(1).optional(),
  url: z.string().url().optional(),
  type: z.enum(['STIX', 'OpenIOC', 'MISP', 'CSV', 'JSON']).optional(),
  refresh_interval_minutes: z.number().int().positive().optional(),
  status: z.enum(['ACTIVE', 'PAUSED', 'ERROR']).optional(),
  config: z.record(z.unknown()).optional(),
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

    const { data: feed, error } = await supabase
      .from('threat_feeds')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !feed) return NextResponse.json({ error: 'Flux introuvable' }, { status: 404 });

    return NextResponse.json(feed);
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
    const validation = UpdateFeedSchema.safeParse(body);
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
    if (data.url !== undefined) updateData.url = data.url;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.refresh_interval_minutes !== undefined) updateData.refresh_interval_minutes = data.refresh_interval_minutes;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.config !== undefined) updateData.config = data.config;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'Aucun champ à modifier' }, { status: 400 });
    }

    updateData.updated_at = new Date().toISOString();

    const { data: feed, error } = await supabase
      .from('threat_feeds')
      .update(updateData)
      .eq('id', id)
      .eq('school_id', profile?.school_id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(feed);
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
      .from('threat_feeds')
      .select('id, school_id')
      .eq('id', id)
      .single();

    if (!existing) return NextResponse.json({ error: 'Flux introuvable' }, { status: 404 });
    if (existing.school_id !== profile?.school_id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const { error } = await supabase.from('threat_feeds').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
