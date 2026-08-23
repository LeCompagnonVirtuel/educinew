import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const reportsUpdateSchema = z.object({
  job_id: z.string().optional(),
  report_type: z.string().optional(),
  total_matched: z.number().optional(),
  total_unmatched: z.number().optional(),
  total_discrepancy: z.number().optional(),
  status: z.string().optional(),
  generated_by: z.number().optional(),
});

type Params = Promise<{ id: string }>;

export async function GET(
  request: Request,
  { params }: { params: Params }
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
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non authentifiÃƒÂ©' }, { status: 401 });
    }

    const { data: dbUser } = await supabase
      .from('users')
      .select('school_id')
      .eq('id', user.id)
      .single();

    if (!dbUser?.school_id) {
      return NextResponse.json({ error: 'Aucun ÃƒÂ©tablissement associÃƒÂ©' }, { status: 403 });
    }

    const { data, error } = await supabase
      .from('reconciliation_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', dbUser.school_id)
      .is('deleted_at', null)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Rapport de rÃƒÂ©conciliation non trouvÃƒÂ©' }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Params }
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
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non authentifiÃƒÂ©' }, { status: 401 });
    }

    const { data: dbUser } = await supabase
      .from('users')
      .select('school_id, role')
      .eq('id', user.id)
      .single();

    if (!dbUser?.school_id) {
      return NextResponse.json({ error: 'Aucun ÃƒÂ©tablissement associÃƒÂ©' }, { status: 403 });
    }

    const allowedRoles = ['ADMIN', 'SUPER_ADMIN', 'DIRECTEUR', 'COMPTABLE'];
    if (!allowedRoles.includes(dbUser.role)) {
      return NextResponse.json({ error: 'Permissions insuffisantes' }, { status: 403 });
    }

    const body = await request.json();
    const validation = reportsUpdateSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      return NextResponse.json(
        { error: `${firstError.path.join('.')}: ${firstError.message}` },
        { status: 400 }
      );
    }

    const { data: existing } = await supabase
      .from('reconciliation_reports')
      .select('school_id')
      .eq('id', id)
      .single();

    if (!existing || existing.school_id !== dbUser.school_id) {
      return NextResponse.json({ error: 'Rapport de rÃƒÂ©conciliation non trouvÃƒÂ©' }, { status: 404 });
    }

    const { data, error } = await supabase
      .from('reconciliation_reports')
      .update({ ...validation.data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: `Erreur mise ÃƒÂ  jour Rapport de rÃƒÂ©conciliation: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Params }
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
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non authentifiÃƒÂ©' }, { status: 401 });
    }

    const { data: dbUser } = await supabase
      .from('users')
      .select('school_id, role')
      .eq('id', user.id)
      .single();

    if (!dbUser?.school_id) {
      return NextResponse.json({ error: 'Aucun ÃƒÂ©tablissement associÃƒÂ©' }, { status: 403 });
    }

    const allowedRoles = ['ADMIN', 'SUPER_ADMIN'];
    if (!allowedRoles.includes(dbUser.role)) {
      return NextResponse.json({ error: 'Permissions insuffisantes' }, { status: 403 });
    }

    const { data: existing } = await supabase
      .from('reconciliation_reports')
      .select('school_id')
      .eq('id', id)
      .single();

    if (!existing || existing.school_id !== dbUser.school_id) {
      return NextResponse.json({ error: 'Rapport de rÃƒÂ©conciliation non trouvÃƒÂ©' }, { status: 404 });
    }

    const { error } = await supabase
      .from('reconciliation_reports')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: `Erreur suppression Rapport de rÃƒÂ©conciliation: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ message: 'Rapport de rÃƒÂ©conciliation supprimÃƒÂ© avec succÃƒÂ¨s' });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}