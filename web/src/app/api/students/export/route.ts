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
  const classId = url.searchParams.get('classId') || undefined;

  let query = supabase
    .from('students')
    .select('matricule, first_name, last_name, date_of_birth, gender, email, phone, address, nationality, blood_group, status, enrollment_date, class:classes(name, level)')
    .eq('school_id', schoolId);

  if (status && status !== 'ALL') {
    query = query.eq('status', status);
  }
  if (classId) {
    query = query.eq('class_id', classId);
  }

  const { data: students, error } = await query;

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const list = (students || []).map((s: any) => ({
    Matricule: s.matricule,
    Prénom: s.first_name,
    Nom: s.last_name,
    'Date de naissance': s.date_of_birth || '',
    Sexe: s.gender || '',
    Email: s.email || '',
    Téléphone: s.phone || '',
    Adresse: s.address || '',
    Nationalité: s.nationality || '',
    'Groupe sanguin': s.blood_group || '',
    Statut: s.status || '',
    'Date d\'inscription': s.enrollment_date || '',
    Classe: (s.class as any)?.name || '',
    Niveau: (s.class as any)?.level || '',
  }));

  if (format === 'JSON') {
    return Response.json({ data: list, total: list.length });
  }

  if (format === 'CSV') {
    if (list.length === 0) {
      return new Response('Aucune donnée', { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="eleves_${new Date().toISOString().slice(0, 10)}.csv"` } });
    }
    const headers = Object.keys(list[0]);
    const csv = [headers.join(';'), ...list.map((row: any) => headers.map((h) => `"${String(row[h]).replace(/"/g, '""')}"`).join(';'))].join('\n');
    const BOM = '\uFEFF';
    return new Response(BOM + csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="eleves_${new Date().toISOString().slice(0, 10)}.csv"` } });
  }

  return Response.json({ data: list, total: list.length, format });
});
