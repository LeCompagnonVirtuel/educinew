import { withSupabase } from '@/lib/supabase/server';
import { paymentSchema, validateRequest } from '@/lib/api/validation';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const url = new URL(req.url);
  const studentId = url.searchParams.get('studentId');
  const status = url.searchParams.get('status');
  const supabase = ctx.supabase as any;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });
  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  let query = supabase
    .from('payments')
    .select('*, student:students(id, user:users!students_user_id_fkey(name), class:classes(name))')
    .eq('school_id', schoolId);

  if (studentId) query = query.eq('student_id', studentId);
  if (status) query = query.eq('status', status);

  const { data, error } = await query.order('created_at', { ascending: false });
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

  if (!['ADMIN', 'SUPER_ADMIN', 'COMPTABLE'].includes(role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const body = await req.json();
  const validation = validateRequest(paymentSchema, {
    ...body,
    amount: parseFloat(body.amount),
    school_id: schoolId,
  });
  if (!validation.success) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('payments')
    .insert({
      school_id: schoolId,
      student_id: validation.data.student_id,
      amount: validation.data.amount,
      type: validation.data.type,
      method: validation.data.method,
      status: validation.data.status,
      reference: validation.data.reference || null,
      invoice_id: validation.data.invoice_id || null,
      notes: validation.data.notes || null,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json(data, { status: 201 });
});
