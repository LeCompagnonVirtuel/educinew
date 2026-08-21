import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { id } = await context.params;

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error) return NextResponse.json({ error: 'Notification non trouvée' }, { status: 404 });
    return NextResponse.json(data);
  } catch (error) {
    logger.error('Error fetching notification', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
