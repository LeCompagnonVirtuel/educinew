import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
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
    const role = profile?.role;
    const schoolId = profile?.school_id;

    if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 403 });
    }
    if (!schoolId) return NextResponse.json({ error: 'Ã‰tablissement requis' }, { status: 403 });

    const { id } = await context.params;

    const { data, error } = await supabase
      .from('message_audit_log')
      .select('*, users(id, first_name, last_name)')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();

    if (error) return NextResponse.json({ error: 'EntrÃ©e non trouvÃ©e' }, { status: 404 });
    return NextResponse.json(data);
  } catch (error) {
    logger.error('Error fetching audit entry', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}