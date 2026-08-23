import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const roundsUpdateSchema = z.object({
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
  project_id: z.string().optional(),
  round_number: z.string().optional(),
  round_type: z.string().optional(),
  target_amount: z.number().optional(),
  raised_amount: z.number().optional(),
  status: z.string().optional(),
  close_date: z.string().optional(),
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
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non authentifiÃ©' }, { status: 401 });
    }

    const { data: dbUser } = await supabase
      .from('users')
      .select('school_id')
      .eq('id', user.id)
      .single();

    if (!dbUser?.school_id) {
      return NextResponse.json({ error: 'Aucun Ã©tablissement associÃ©' }, { status: 403 });
    }

    const { data, error } = await supabase
      .from('investment_rounds')
      .select('*')
      .eq('id', id)
      .eq('school_id', dbUser.school_id)
      .is('deleted_at', null)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Tour de financement non trouvÃ©' }, { status: 404 });
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
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non authentifiÃ©' }, { status: 401 });
    }

    const { data: dbUser } = await supabase
      .from('users')
      .select('school_id, role')
      .eq('id', user.id)
      .single();

    if (!dbUser?.school_id) {
      return NextResponse.json({ error: 'Aucun Ã©tablissement associÃ©' }, { status: 403 });
    }

    const allowedRoles = ['ADMIN', 'SUPER_ADMIN', 'DIRECTEUR', 'COMPTABLE'];
    if (!allowedRoles.includes(dbUser.role)) {
      return NextResponse.json({ error: 'Permissions insuffisantes' }, { status: 403 });
    }

    const body = await request.json();
    const validation = roundsUpdateSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      return NextResponse.json(
        { error: `${firstError.path.join('.')}: ${firstError.message}` },
        { status: 400 }
      );
    }

    const { data: existing } = await supabase
      .from('investment_rounds')
      .select('school_id')
      .eq('id', id)
      .single();

    if (!existing || existing.school_id !== dbUser.school_id) {
      return NextResponse.json({ error: 'Tour de financement non trouvÃ©' }, { status: 404 });
    }

    const { data, error } = await supabase
      .from('investment_rounds')
      .update({ ...validation.data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: `Erreur mise Ã  jour Tour de financement: ${error.message}` }, { status: 500 });
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
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 401 });
    }
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non authentifiÃ©' }, { status: 401 });
    }

    const { data: dbUser } = await supabase
      .from('users')
      .select('school_id, role')
      .eq('id', user.id)
      .single();

    if (!dbUser?.school_id) {
      return NextResponse.json({ error: 'Aucun Ã©tablissement associÃ©' }, { status: 403 });
    }

    const allowedRoles = ['ADMIN', 'SUPER_ADMIN'];
    if (!allowedRoles.includes(dbUser.role)) {
      return NextResponse.json({ error: 'Permissions insuffisantes' }, { status: 403 });
    }

    const { data: existing } = await supabase
      .from('investment_rounds')
      .select('school_id')
      .eq('id', id)
      .single();

    if (!existing || existing.school_id !== dbUser.school_id) {
      return NextResponse.json({ error: 'Tour de financement non trouvÃ©' }, { status: 404 });
    }

    const { error } = await supabase
      .from('investment_rounds')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: `Erreur suppression Tour de financement: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ message: 'Tour de financement supprimÃ© avec succÃ¨s' });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}