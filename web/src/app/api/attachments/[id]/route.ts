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

    const { id } = await context.params;

    const { data, error } = await supabase
      .from('message_attachments')
      .select('*, users(id, first_name, last_name)')
      .eq('id', id)
      .single();

    if (error) return NextResponse.json({ error: 'PiÃ¨ce jointe non trouvÃ©e' }, { status: 404 });
    return NextResponse.json(data);
  } catch (error) {
    logger.error('Error fetching attachment', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
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

    const { id } = await context.params;

    const { data: attachment } = await supabase
      .from('message_attachments')
      .select('user_id, storage_path')
      .eq('id', id)
      .single();

    if (!attachment) return NextResponse.json({ error: 'PiÃ¨ce jointe non trouvÃ©e' }, { status: 404 });
    if (attachment.user_id !== user.id) {
      return NextResponse.json({ error: 'Non autorisÃ©' }, { status: 403 });
    }

    await supabase.storage.from('message-attachments').remove([attachment.storage_path]);

    const { error } = await supabase
      .from('message_attachments')
      .delete()
      .eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Error deleting attachment', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}