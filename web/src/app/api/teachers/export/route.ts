import { withSupabase } from '@/lib/supabase/server';

export const GET = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  if (!['SUPER_ADMIN', 'ADMIN'].includes(profile?.role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const url = new URL(req.url);
  const format = url.searchParams.get('format') || 'CSV';
  const status = url.searchParams.get('status') || undefined;
  const departmentId = url.searchParams.get('departmentId') || undefined;

  let query = supabase
    .from('teachers')
    .select('matricule, first_name, last_name, date_of_birth, gender, email, phone, address, nationality, employment_type, contract_type, grade, speciality, hire_date, salary, status, department:teacher_departments(name)')
    .eq('school_id', schoolId);

  if (status && status !== 'ALL') {
    query = query.eq('status', status);
  }
  if (departmentId) {
    query = query.eq('department_id', departmentId);
  }

  const { data: teachers, error } = await query;

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const list = (teachers || []).map((t: any) => ({
    Matricule: t.matricule,
    Prénom: t.first_name,
    Nom: t.last_name,
    'Date de naissance': t.date_of_birth || '',
    Sexe: t.gender || '',
    Email: t.email || '',
    Téléphone: t.phone || '',
    Adresse: t.address || '',
    Nationalité: t.nationality || '',
    'Type d\'emploi': t.employment_type || '',
    'Type de contrat': t.contract_type || '',
    Grade: t.grade || '',
    Spécialité: t.speciality || '',
    'Date d\'embauche': t.hire_date || '',
    Salaire: t.salary || '',
    Statut: t.status || '',
    Département: (t.department as any)?.name || '',
  }));

  if (format === 'JSON') {
    return Response.json({ data: list, total: list.length });
  }

  if (format === 'CSV') {
    if (list.length === 0) {
      return new Response('Aucune donnée', { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="enseignants_${new Date().toISOString().slice(0, 10)}.csv"` } });
    }
    const headers = Object.keys(list[0]);
    const csv = [headers.join(';'), ...list.map((row: any) => headers.map((h) => `"${String(row[h]).replace(/"/g, '""')}"`).join(';'))].join('\n');
    const BOM = '\uFEFF';
    return new Response(BOM + csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="enseignants_${new Date().toISOString().slice(0, 10)}.csv"` } });
  }

  return Response.json({ data: list, total: list.length, format });
});
