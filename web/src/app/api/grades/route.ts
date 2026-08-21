import { withSupabase } from '@supabase/server';
import { gradeSchema, validateRequest } from '@/lib/api/validation';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const url = new URL(req.url);
  const studentId = url.searchParams.get('studentId');
  const classId = url.searchParams.get('classId');
  const periodId = url.searchParams.get('periodId');
  const supabase = ctx.supabase as any;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });
  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  let studentIds: string[] = [];
  if (classId) {
    const { data: classStudents } = await supabase
      .from('students').select('id').eq('class_id', classId).eq('school_id', schoolId);
    studentIds = (classStudents || []).map((s: any) => s.id);
    if (studentIds.length === 0) return Response.json([]);
  }

  let query = supabase
    .from('grades')
    .select('*, student:students(id, user:users!students_user_id_fkey(name), matricule), subject:subjects(name, coefficient), period:periods(name)')
    .eq('school_id', schoolId);

  if (studentId) query = query.eq('student_id', studentId);
  if (studentIds.length > 0) query = query.in('student_id', studentIds);
  if (periodId) query = query.eq('period_id', periodId);

  const { data, error } = await query;
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
});

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });
  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const role = profile?.role;
  const schoolId = profile?.school_id;

  if (!['ADMIN', 'SUPER_ADMIN', 'TEACHER', 'CENSEUR'].includes(role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const body = await req.json();
  const validation = validateRequest(gradeSchema, { ...body, score: parseFloat(body.score), school_id: schoolId });
  if (!validation.success) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('grades')
    .insert({
      student_id: validation.data.student_id,
      subject_id: validation.data.subject_id,
      teacher_id: validation.data.teacher_id || null,
      school_id: schoolId,
      score: validation.data.score,
      max_score: validation.data.max_score,
      grade_type: validation.data.grade_type,
      coefficient: validation.data.coefficient,
      term: validation.data.term || validation.data.grade_type || 'DEVOIR',
      period_id: validation.data.period_id || null,
      academic_year_id: validation.data.academic_year_id || null,
      comment: validation.data.comment || null,
      is_validated: false,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json(data, { status: 201 });
});

export const PATCH = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) {
    return Response.json({ error: 'Grade ID required' }, { status: 400 });
  }
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return Response.json({ error: 'Grade ID invalide' }, { status: 400 });
  }

  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });
  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const role = profile?.role;
  const schoolId = profile?.school_id;

  if (!['ADMIN', 'SUPER_ADMIN', 'TEACHER', 'CENSEUR'].includes(role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const body = await req.json();

  const allowedFields = ['score', 'max_score', 'grade_type', 'coefficient', 'comment', 'is_validated', 'validated_at'];
  const updateData: Record<string, any> = {};
  for (const key of allowedFields) {
    if (body[key] !== undefined) updateData[key] = body[key];
  }

  if (updateData.score !== undefined) {
    const s = parseFloat(updateData.score);
    if (isNaN(s) || s < 0) {
      return Response.json({ error: 'Score invalide' }, { status: 400 });
    }
    updateData.score = s;
  }

  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  let query = supabase.from('grades').update(updateData).eq('id', id).eq('school_id', schoolId);

  const { data, error } = await query.select().single();

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json(data);
});
