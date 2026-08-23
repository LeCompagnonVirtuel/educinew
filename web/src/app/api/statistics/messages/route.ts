import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { logger } from '@educi/logger';
import { messageStatsSchema } from '@/features/messages/validators/schemas';

export async function GET(req: NextRequest) {
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
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifiÃ©' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Ã‰tablissement requis' }, { status: 403 });

    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    const validation = messageStatsSchema.safeParse({
      dateFrom: params.dateFrom || undefined,
      dateTo: params.dateTo || undefined,
      conversationId: params.conversationId || undefined,
      type: params.type || undefined,
    });

    if (!validation.success) {
      return NextResponse.json({ error: 'ParamÃ¨tres invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const filters = validation.data;

    let query = supabase
      .from('messages')
      .select('id, type, status, created_at, sender_id')
      .eq('school_id', schoolId);

    if (filters.dateFrom) query = query.gte('created_at', filters.dateFrom);
    if (filters.dateTo) query = query.lte('created_at', filters.dateTo);
    if (filters.conversationId) query = query.eq('conversation_id', filters.conversationId);
    if (filters.type) query = query.eq('type', filters.type);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const records = data || [];

    return NextResponse.json({
      total: records.length,
      byType: records.reduce((acc: Record<string, number>, r: any) => {
        acc[r.type] = (acc[r.type] || 0) + 1;
        return acc;
      }, {}),
      byStatus: records.reduce((acc: Record<string, number>, r: any) => {
        acc[r.status] = (acc[r.status] || 0) + 1;
        return acc;
      }, {}),
      uniqueSenders: new Set(records.map((r: any) => r.sender_id)).size,
      byDay: records.reduce((acc: Record<string, number>, r: any) => {
        const day = r.created_at.split('T')[0];
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {}),
    });
  } catch (error) {
    logger.error('Error fetching message statistics', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
