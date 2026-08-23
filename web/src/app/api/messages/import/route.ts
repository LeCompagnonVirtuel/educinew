import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { logger } from '@educi/logger';

export async function POST(req: NextRequest) {
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
    const role = profile?.role;
    const schoolId = profile?.school_id;

    if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const conversationId = formData.get('conversationId') as string;

    if (!file) {
      return NextResponse.json({ error: 'Fichier requis' }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Le fichier ne doit pas dépasser 10MB' }, { status: 400 });
    }

    const content = await file.text();
    const messages = JSON.parse(content);

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: 'Format de fichier invalide' }, { status: 400 });
    }

    const records = messages.map((msg: any) => ({
      conversation_id: conversationId,
      sender_id: user.id,
      content: msg.content,
      type: msg.type || 'TEXT',
      school_id: schoolId,
      created_at: msg.created_at || new Date().toISOString(),
    }));

    const { data, error } = await supabase
      .from('messages')
      .insert(records)
      .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ imported: data?.length || 0, message: 'Messages importés' });
  } catch (error) {
    logger.error('Error importing messages', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
