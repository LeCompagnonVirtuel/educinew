import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const ledgerUpdateSchema = z.object({
  entry_date: z.string().optional(),
  account_id: z.string().optional(),
  debit: z.string().optional(),
  credit: z.string().optional(),
  description: z.string().optional(),
  reference: z.string().optional(),
  journal_id: z.string().optional(),
  cost_center_id: z.number().optional(),
});

type Params = Promise<{ id: string }>;

export async function GET(
  request: Request,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const { data: dbUser } = await supabase
      .from('users')
      .select('school_id')
      .eq('id', user.id)
      .single();

    if (!dbUser?.school_id) {
      return NextResponse.json({ error: 'Aucun établissement associé' }, { status: 403 });
    }

    const { data, error } = await supabase
      .from('finance_ledger')
      .select('*')
      .eq('id', id)
      .eq('school_id', dbUser.school_id)
      .is('deleted_at', null)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Grand livre non trouvé' }, { status: 404 });
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
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const { data: dbUser } = await supabase
      .from('users')
      .select('school_id, role')
      .eq('id', user.id)
      .single();

    if (!dbUser?.school_id) {
      return NextResponse.json({ error: 'Aucun établissement associé' }, { status: 403 });
    }

    const allowedRoles = ['ADMIN', 'SUPER_ADMIN', 'DIRECTEUR', 'COMPTABLE'];
    if (!allowedRoles.includes(dbUser.role)) {
      return NextResponse.json({ error: 'Permissions insuffisantes' }, { status: 403 });
    }

    const body = await request.json();
    const validation = ledgerUpdateSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      return NextResponse.json(
        { error: `${firstError.path.join('.')}: ${firstError.message}` },
        { status: 400 }
      );
    }

    const { data: existing } = await supabase
      .from('finance_ledger')
      .select('school_id')
      .eq('id', id)
      .single();

    if (!existing || existing.school_id !== dbUser.school_id) {
      return NextResponse.json({ error: 'Grand livre non trouvé' }, { status: 404 });
    }

    const { data, error } = await supabase
      .from('finance_ledger')
      .update({ ...validation.data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: `Erreur mise à jour Grand livre: ${error.message}` }, { status: 500 });
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
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const { data: dbUser } = await supabase
      .from('users')
      .select('school_id, role')
      .eq('id', user.id)
      .single();

    if (!dbUser?.school_id) {
      return NextResponse.json({ error: 'Aucun établissement associé' }, { status: 403 });
    }

    const allowedRoles = ['ADMIN', 'SUPER_ADMIN'];
    if (!allowedRoles.includes(dbUser.role)) {
      return NextResponse.json({ error: 'Permissions insuffisantes' }, { status: 403 });
    }

    const { data: existing } = await supabase
      .from('finance_ledger')
      .select('school_id')
      .eq('id', id)
      .single();

    if (!existing || existing.school_id !== dbUser.school_id) {
      return NextResponse.json({ error: 'Grand livre non trouvé' }, { status: 404 });
    }

    const { error } = await supabase
      .from('finance_ledger')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: `Erreur suppression Grand livre: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ message: 'Grand livre supprimé avec succès' });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}
