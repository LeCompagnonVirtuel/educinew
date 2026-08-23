import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { publicationSchema } from '@/features/exams/validators/schemas';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

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

    const body = await req.json();
    const validation = publicationSchema.safeParse({ ...body, schoolId });

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const data = validation.data;

    if (data.publishMarks) {
      await supabase
        .from('exam_results')
        .update({ status: 'PUBLISHED', published_at: new Date().toISOString() })
        .eq('exam_id', data.examId)
        .eq('school_id', schoolId);
    }

    const { error } = await supabase
      .from('exams')
      .update({ status: 'PUBLISHED', published_at: new Date().toISOString() })
      .eq('id', data.examId)
      .eq('school_id', schoolId);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    await supabase.from('exam_audit_logs').insert({
      school_id: schoolId,
      exam_id: data.examId,
      user_id: user.id,
      action: 'PUBLISH',
      entity_type: 'EXAM',
      details: JSON.stringify(data),
    });

    return NextResponse.json({ success: true, message: 'Examen publié avec succès' });
  } catch (error) {
    logger.error('Error publishing exam', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
