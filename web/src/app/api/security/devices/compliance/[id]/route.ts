import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const UpdateComplianceSchema = z.object({
  status: z.enum(['COMPLIANT', 'NON_COMPLIANT', 'PARTIAL', 'UNKNOWN']).optional(),
  details: z.record(z.unknown()).optional(),
  last_check_at: z.string().optional(),
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

    const { data: compliance, error } = await supabase
      .from('device_compliance')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !compliance) return NextResponse.json({ error: 'ConformitÃƒÂ© introuvable' }, { status: 404 });

    return NextResponse.json(compliance);
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
    const validation = UpdateComplianceSchema.safeParse(body);
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
    if (data.details !== undefined) updateData.details = data.details;
    if (data.last_check_at !== undefined) updateData.last_check_at = data.last_check_at;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'Aucun champ ÃƒÂ  modifier' }, { status: 400 });
    }

    updateData.updated_at = new Date().toISOString();

    const { data: compliance, error } = await supabase
      .from('device_compliance')
      .update(updateData)
      .eq('id', id)
      .eq('school_id', profile?.school_id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(compliance);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}