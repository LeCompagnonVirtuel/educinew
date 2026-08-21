import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies: () => req.cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const messageId = formData.get('messageId') as string;

    if (!file) {
      return NextResponse.json({ error: 'Fichier requis' }, { status: 400 });
    }

    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json({ error: 'Le fichier ne doit pas dépasser 25MB' }, { status: 400 });
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('message-attachments')
      .upload(fileName, file);

    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });

    const { data: urlData } = supabase.storage
      .from('message-attachments')
      .getPublicUrl(fileName);

    const attachmentType = file.type.startsWith('image/') ? 'IMAGE'
      : file.type.startsWith('video/') ? 'VIDEO'
      : file.type.startsWith('audio/') ? 'AUDIO'
      : file.type === 'application/pdf' ? 'PDF'
      : 'OTHER';

    const { data: attachment, error: dbError } = await supabase
      .from('message_attachments')
      .insert({
        message_id: messageId || null,
        user_id: user.id,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        file_url: urlData.publicUrl,
        storage_path: fileName,
        type: attachmentType,
        school_id: schoolId,
      })
      .select()
      .single();

    if (dbError) return NextResponse.json({ error: dbError.message }, { status: 400 });
    return NextResponse.json(attachment, { status: 201 });
  } catch (error) {
    logger.error('Error uploading attachment', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
