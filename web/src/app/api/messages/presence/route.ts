import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { z } from 'zod';

const presenceSchema = z.object({
  status: z.enum(['online', 'away', 'offline']),
});

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const body = await req.json();
    const validation = presenceSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Données invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const { status } = validation.data;

    await supabase
      .from('user_presence')
      .upsert({
        user_id: user.id,
        status,
        last_seen_at: new Date().toISOString(),
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Error updating presence', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const url = new URL(req.url);
    const userIds = url.searchParams.get('userIds')?.split(',') || [];

    let query = supabase
      .from('user_presence')
      .select('*, users(id, first_name, last_name, avatar_url)');

    if (userIds.length > 0) {
      query = query.in('user_id', userIds);
    }

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data || []);
  } catch (error) {
    logger.error('Error fetching presence', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
