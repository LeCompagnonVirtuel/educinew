import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { logger } from '@educi/logger';
import { classRankingSchema } from '@/features/exams/validators/schemas';

export async function GET(req: NextRequest, context: { params: { classId: string } }) {
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

    const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
    const schoolId = profile?.school_id;
    if (!schoolId) return NextResponse.json({ error: 'Établissement requis' }, { status: 403 });

    const { classId } = await context.params;
    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    let query = supabase
      .from('student_rankings')
      .select('*, students(id, first_name, last_name, matricule)')
      .eq('class_id', classId)
      .eq('school_id', schoolId)
      .order('rank', { ascending: true });

    if (params.termId) query = query.eq('term_id', params.termId);
    if (params.academicYearId) query = query.eq('academic_year_id', params.academicYearId);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data: data || [], total: data?.length || 0 });
  } catch (error) {
    logger.error('Error fetching class rankings', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}
