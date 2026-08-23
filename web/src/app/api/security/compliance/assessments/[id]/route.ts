import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const UpdateAssessmentSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  framework: z.enum(['ISO_27001', 'NIST_CSFF', 'GDPR', 'SOC2', 'PCI_DSS', 'CUSTOM']).optional(),
  scope: z.string().optional(),
  assessor: z.string().optional(),
  scheduled_date: z.string().optional(),
  completed_date: z.string().optional(),
  score: z.number().min(0).max(100).optional(),
  findings: z.array(z.record(z.unknown())).optional(),
  status: z.enum(['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisÃƒÂ©' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
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

    const { data: assessment, error } = await supabase
      .from('compliance_assessments')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !assessment) return NextResponse.json({ error: 'Ãƒâ€°valuation introuvable' }, { status: 404 });

    return NextResponse.json(assessment);
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
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisÃƒÂ©' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
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
    const validation = UpdateAssessmentSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'DonnÃƒÂ©es invalides', errors }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    const data = validation.data;
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.framework !== undefined) updateData.framework = data.framework;
    if (data.scope !== undefined) updateData.scope = data.scope;
    if (data.assessor !== undefined) updateData.assessor = data.assessor;
    if (data.scheduled_date !== undefined) updateData.scheduled_date = data.scheduled_date;
    if (data.completed_date !== undefined) updateData.completed_date = data.completed_date;
    if (data.score !== undefined) updateData.score = data.score;
    if (data.findings !== undefined) updateData.findings = data.findings;
    if (data.status !== undefined) updateData.status = data.status;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'Aucun champ ÃƒÂ  modifier' }, { status: 400 });
    }

    updateData.updated_at = new Date().toISOString();

    const { data: assessment, error } = await supabase
      .from('compliance_assessments')
      .update(updateData)
      .eq('id', id)
      .eq('school_id', profile?.school_id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(assessment);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}