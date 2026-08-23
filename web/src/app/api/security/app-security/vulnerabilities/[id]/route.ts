import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const UpdateVulnerabilitySchema = z.object({
  status: z.enum(['OPEN', 'CONFIRMED', 'FALSE_POSITIVE', 'RESOLVED', 'IN_PROGRESS']).optional(),
  assigned_to: z.string().uuid().optional(),
  notes: z.string().optional(),
  remediation_plan: z.string().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
            if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisÃƒÂ©' }, { status: 401 });
    }
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisÃƒÂ©' }, { status: 401 });
    }
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifiÃƒÂ©' }, { status: 401 });

    const { id } = await params;

    const { data: vulnerability, error } = await supabase
      .from('app_security_vulnerabilities')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !vulnerability) return NextResponse.json({ error: 'VulnÃƒÂ©rabilitÃƒÂ© introuvable' }, { status: 404 });

    return NextResponse.json(vulnerability);
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
            if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisÃƒÂ©' }, { status: 401 });
    }
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisÃƒÂ©' }, { status: 401 });
    }
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifiÃƒÂ©' }, { status: 401 });

    const { data: profile } = await supabase
      .from('users')
      .select('role, school_id')
      .eq('id', user.id)
      .single();

    const allowedRoles = ['SUPER_ADMIN', 'ADMIN'];
    if (!allowedRoles.includes(profile?.role)) {
      return NextResponse.json({ error: 'Non autorisÃƒÂ©' }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const validation = UpdateVulnerabilitySchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'DonnÃƒÂ©es invalides', errors }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    const data = validation.data;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.assigned_to !== undefined) updateData.assigned_to = data.assigned_to;
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.remediation_plan !== undefined) updateData.remediation_plan = data.remediation_plan;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'Aucun champ ÃƒÂ  modifier' }, { status: 400 });
    }

    updateData.updated_at = new Date().toISOString();

    const { data: vulnerability, error } = await supabase
      .from('app_security_vulnerabilities')
      .update(updateData)
      .eq('id', id)
      .eq('school_id', profile?.school_id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(vulnerability);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}