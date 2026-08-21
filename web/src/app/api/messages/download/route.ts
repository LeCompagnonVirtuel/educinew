import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { attachmentDownloadSchema } from '@/features/messages/validators/schemas';

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    const validation = attachmentDownloadSchema.safeParse({
      attachmentId: params.attachmentId,
    });

    if (!validation.success) {
      return NextResponse.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
    }

    const { attachmentId } = validation.data;

    const { data: attachment, error } = await supabase
      .from('message_attachments')
      .select('*')
      .eq('id', attachmentId)
      .single();

    if (error || !attachment) {
      return NextResponse.json({ error: 'Pièce jointe non trouvée' }, { status: 404 });
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
