import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { logger } from '@educi/logger';
import { exportMessagesSchema } from '@/features/messages/validators/schemas';

export async function GET(req: NextRequest) {
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
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    const validation = exportMessagesSchema.safeParse({
      conversationId: params.conversationId,
      format: params.format || 'JSON',
      dateFrom: params.dateFrom || undefined,
      dateTo: params.dateTo || undefined,
    });

    if (!validation.success) {
      return NextResponse.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const { conversationId, format, dateFrom, dateTo } = validation.data;

    let query = supabase
      .from('messages')
      .select('*, users(id, first_name, last_name)')
      .eq('conversation_id', conversationId)
      .eq('school_id', schoolId);

    if (dateFrom) query = query.gte('created_at', dateFrom);
    if (dateTo) query = query.lte('created_at', dateTo);

    query = query.order('created_at', { ascending: true });

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    if (format === 'CSV') {
      const headers = 'ID,Sender,Content,Type,Created At\n';
      const rows = (data || []).map((m: any) =>
        `${m.id},"${m.users?.first_name} ${m.users?.last_name}","${m.content.replace(/"/g, '""')}",${m.type},${m.created_at}`
      ).join('\n');
      return new NextResponse(headers + rows, {
        headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename="messages.csv"' },
      });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    logger.error('Error exporting messages', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
