import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    if (!profile) return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 });

    const { id } = await params;
    const isSuperAdmin = profile.role === 'SUPER_ADMIN';
    const query = supabase
      .from('invoices')
      .select('*, invoice_items(*)')
      .eq('id', id)
      .single();

    if (!isSuperAdmin) {
      query.eq('school_id', profile.school_id);
    }

    const { data, error } = await query;

    if (error) throw error;
    if (!data) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });

    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Error fetching invoice', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    if (!profile) return NextResponse.json({ error: 'Profil introuvable' }, { status: 404 });

    const { id } = await params;

    if (profile.role !== 'SUPER_ADMIN') {
      const { data: existing } = await supabase.from('invoices').select('school_id').eq('id', id).single();
      if (!existing || existing.school_id !== profile.school_id) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
      }
    }

    const body = await req.json();

    const { data, error } = await supabase
      .from('invoices')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Error updating invoice', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('sb-')?.value || cookieStore.get('supabase-auth-token')?.value;
    if (!authCookie) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, authCookie);
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    if (!profile || !['SUPER_ADMIN', 'ADMIN'].includes(profile.role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const { id } = await params;

    if (profile.role !== 'SUPER_ADMIN') {
      const { data: existing } = await supabase.from('invoices').select('school_id').eq('id', id).single();
      if (!existing || existing.school_id !== profile.school_id) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
      }
    }

    const { error } = await supabase.from('invoices').delete().eq('id', id);
    if (error) throw error;

    return NextResponse.json({ data: { message: 'Invoice deleted' } });
  } catch (error) {
    logger.error('Error deleting invoice', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
