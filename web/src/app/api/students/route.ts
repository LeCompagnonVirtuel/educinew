import { withSupabase } from '@supabase/server';
import { CreateStudentSchema, FiltersSchema } from '@/features/students/validators';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams.entries());

  const validation = FiltersSchema.safeParse({
    search: params.search || undefined,
    status: params.status || undefined,
    gender: params.gender || undefined,
    classId: params.classId || undefined,
    page: params.page ? parseInt(params.page) : undefined,
    limit: params.limit ? parseInt(params.limit) : undefined,
    sortBy: params.sortBy || undefined,
    sortOrder: params.sortOrder || undefined,
  });

  if (!validation.success) {
    return Response.json({ error: 'Paramètres invalides', details: validation.error.flatten() }, { status: 400 });
  }

  const filters = validation.data;
  const page = filters.page || 1;
  const limit = filters.limit || 20;
  const offset = (page - 1) * limit;

  let query = supabase
    .from('students')
    .select('*, user:users(id, name, email, photo_url), class:classes(id, name, level)', { count: 'exact' })
    .eq('school_id', schoolId);

  if (filters.search) {
    query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,matricule.ilike.%${filters.search}%`);
  }

  if (filters.status && filters.status !== 'ALL') {
    query = query.eq('status', filters.status);
  }

  if (filters.gender && filters.gender !== 'ALL') {
    query = query.eq('gender', filters.gender);
  }

  if (filters.classId) {
    query = query.eq('class_id', filters.classId);
  }

  const sortBy = filters.sortBy || 'created_at';
  const sortOrder = filters.sortOrder || 'desc';
  query = query.order(sortBy, { ascending: sortOrder === 'asc' });
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({
    data: data || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  });
});

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  const role = profile?.role;
  const schoolId = profile?.school_id;

  if (!['ADMIN', 'SUPER_ADMIN', 'SECRETAIRE'].includes(role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const body = await req.json();
  const validation = CreateStudentSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.issues.map((issue: any) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return Response.json({ error: 'Données invalides', errors }, { status: 400 });
  }

  const data = validation.data;
  const matricule = `STU${new Date().getFullYear().toString().slice(-2)}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const { data: student, error } = await supabase
    .from('students')
    .insert({
      user_id: user.id,
      school_id: schoolId,
      matricule,
      first_name: data.firstName,
      last_name: data.lastName,
      date_of_birth: data.dateOfBirth || null,
      place_of_birth: data.placeOfBirth || null,
      gender: data.gender || null,
      address: data.address || null,
      phone: data.phone || null,
      email: data.email || null,
      nationality: data.nationality || 'Ivoirienne',
      blood_group: data.bloodGroup || 'UNKNOWN',
      class_id: data.classId || null,
      parent_id: data.parentId || null,
      enrollment_date: data.enrollmentDate || new Date().toISOString(),
      emergency_contact_name: data.emergencyContactName || null,
      emergency_contact_phone: data.emergencyContactPhone || null,
      emergency_contact_relation: data.emergencyContactRelation || null,
      status: 'ACTIVE',
      is_active: true,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json(student, { status: 201 });
});
