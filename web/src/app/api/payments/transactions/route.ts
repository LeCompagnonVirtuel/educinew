import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET /api/payments/transactions — list transactions with filters
export async function GET(req: NextRequest) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    if (!['ADMIN', 'SUPER_ADMIN', 'COMPTABLE'].includes(profile?.role)) {
      return NextResponse.json({ error: 'Accès réservé aux administrateurs et comptables' }, { status: 403 });
    }
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(Math.max(1, parseInt(searchParams.get('limit') || '50')), 100);
    const status = searchParams.get('status');
    const gateway = searchParams.get('gateway');
    const method = searchParams.get('method');
    const dateFrom = searchParams.get('date_from');
    const dateTo = searchParams.get('date_to');
    const search = searchParams.get('search');
    const exportFormat = searchParams.get('export');

    let query = supabase
      .from('transaction_logs')
      .select(`
        *,
        gateway:payment_gateway_configs(gateway, display_name)
      `, { count: 'exact' })
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false });

    if (status) query = query.eq('status', status);
    if (gateway) query = query.eq('action', gateway);
    if (dateFrom) query = query.gte('created_at', dateFrom);
    if (dateTo) query = query.lte('created_at', dateTo + 'T23:59:59');
    const safeSearch = (search || '').replace(/[,%_'";\\]/g, '\\$&');
    if (safeSearch) query = query.or(`reference.ilike.%${safeSearch}%,provider_reference.ilike.%${safeSearch}%,error_message.ilike.%${safeSearch}%`);

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;
    if (error) throw error;

    if (exportFormat === 'csv') {
      const csvHeader = 'Date,Action,Statut,Montant,Devise,Référence,Référence prestataire,Erreur\n';
      const csvRows = (data || []).map((t: any) =>
        `${new Date(t.created_at).toLocaleString('fr-FR')},${t.action},${t.status},${t.amount || ''},${t.currency || ''},${t.reference || ''},${t.provider_reference || ''},${t.error_message || ''}`
      ).join('\n');
      return new NextResponse(csvHeader + csvRows, {
        headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename=transactions.csv' },
      });
    }

    return NextResponse.json({
      transactions: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
