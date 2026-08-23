import { withSupabase } from '@/lib/supabase/server';

export const POST = withSupabase({ auth: 'user' }, async (req, ctx) => {
  const supabase = ctx.supabase as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  if (!['SUPER_ADMIN', 'ADMIN'].includes(profile?.role)) {
    return Response.json({ error: 'Non autorisé' }, { status: 403 });
  }
  const schoolId = profile?.school_id;
  if (!schoolId) return Response.json({ error: 'Établissement requis' }, { status: 403 });

  const formData = await req.json();
  const { students, dryRun } = formData;

  if (!Array.isArray(students) || students.length === 0) {
    return Response.json({ error: 'Aucun élève à importer' }, { status: 400 });
  }

  const maxImport = 500;
  if (students.length > maxImport) {
    return Response.json({ error: `Maximum ${maxImport} élèves par import` }, { status: 400 });
  }

  if (dryRun) {
    const results = students.map((s: any, idx: number) => {
      const errors: string[] = [];
      if (!s.firstName && !s['Prénom']) errors.push('Prénom requis');
      if (!s.lastName && !s['Nom']) errors.push('Nom requis');
      return { row: idx + 1, valid: errors.length === 0, errors, data: s };
    });
    return Response.json({ dryRun: true, total: students.length, valid: results.filter((r: any) => r.valid).length, invalid: results.filter((r: any) => !r.valid).length, results });
  }

  let imported = 0;
  let skipped = 0;
  const errors: Array<{ row: number; error: string }> = [];

  for (let i = 0; i < students.length; i++) {
    const s = students[i];
    const firstName = s.firstName || s['Prénom'];
    const lastName = s.lastName || s['Nom'];

    if (!firstName || !lastName) {
      errors.push({ row: i + 1, error: 'Prénom ou Nom manquant' });
      skipped++;
      continue;
    }

    const matricule = `STU${new Date().getFullYear().toString().slice(-2)}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const { error: insertError } = await supabase.from('students').insert({
      school_id: schoolId,
      user_id: user.id,
      matricule,
      first_name: firstName,
      last_name: lastName,
      date_of_birth: s.dateOfBirth || s['Date de naissance'] || null,
      gender: s.gender || s['Sexe'] || null,
      email: s.email || null,
      phone: s.phone || null,
      address: s.address || null,
      nationality: s.nationality || 'Ivoirienne',
      blood_group: s.bloodGroup || 'UNKNOWN',
      status: 'ACTIVE',
      is_active: true,
      enrollment_date: new Date().toISOString(),
    });

    if (insertError) {
      errors.push({ row: i + 1, error: insertError.message });
      skipped++;
    } else {
      imported++;
    }
  }

  return Response.json({ success: true, total: students.length, imported, skipped, errors });
});
