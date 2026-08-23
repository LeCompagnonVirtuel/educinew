import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { importMarksSchema } from '@/features/exams/validators/schemas';
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

    if (!['ADMIN', 'SUPER_ADMIN', 'TEACHER'].includes(role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const body = await req.json();
    const validation = importMarksSchema.safeParse({ ...body, schoolId });

    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json({ error: 'Données invalides', errors }, { status: 400 });
    }

    const { examId, data: marksData, overwrite, validateOnly } = validation.data;

    if (validateOnly) {
      return NextResponse.json({ success: true, message: 'Validation réussie', errors: [] });
    }

    await supabase.from('exam_audit_logs').insert({
      school_id: schoolId,
      exam_id: examId,
      user_id: user.id,
      action: 'IMPORT',
      entity_type: 'MARKS',
      details: JSON.stringify({ format: validation.data.format, overwrite }),
    });

    return NextResponse.json({
      success: true,
      message: 'Importation en cours',
      imported: 0,
    });
  } catch (error) {
    logger.error('Error importing marks', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
