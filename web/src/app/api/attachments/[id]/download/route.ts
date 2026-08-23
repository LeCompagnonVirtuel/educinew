import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

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

    const { data: attachment, error } = await supabase
      .from('message_attachments')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !attachment) {
      return NextResponse.json({ error: 'PiÃ¨ce jointe non trouvÃ©e' }, { status: 404 });
    }

    const { data: fileData, error: downloadError } = await supabase.storage
      .from('message-attachments')
      .download(attachment.storage_path);

    if (downloadError) return NextResponse.json({ error: downloadError.message }, { status: 400 });

    const headers = new Headers();
    headers.set('Content-Type', attachment.file_type);
    headers.set('Content-Disposition', `attachment; filename="${attachment.file_name}"`);

    return new NextResponse(fileData, { headers });
  } catch (error) {
    logger.error('Error downloading attachment', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}