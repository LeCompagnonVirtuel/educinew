import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/ssr';
import { logger } from '@educi/logger';
import { examResultSchema } from '@/features/exams/validators/schemas';
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

    if (!Array.isArray(body.results)) {
      return NextResponse.json({ error: 'Le champ results doit être un tableau' }, { status: 400 });
    }

    const results = [];
    for (const item of body.results) {
      const validation = examResultSchema.safeParse({ ...item, schoolId });
      if (!validation.success) {
        results.push({ studentId: item.studentId, success: false, errors: validation.error.flatten() });
        continue;
      }

      const { data: result, error } = await supabase
        .from('exam_results')
        .insert({ ...validation.data, created_by: user.id })
        .select()
        .single();

      if (error) {
        results.push({ studentId: item.studentId, success: false, error: error.message });
      } else {
        results.push({ studentId: item.studentId, success: true, result });
      }
    }

    const successCount = results.filter((r: any) => r.success).length;
    return NextResponse.json({ success: true, processed: results.length, successful: successCount, results });
  } catch (error) {
    logger.error('Error batch creating results', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
