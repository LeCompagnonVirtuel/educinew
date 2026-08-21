import { withSupabase } from '@supabase/server';

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
  const { teachers, dryRun } = formData;

  if (!Array.isArray(teachers) || teachers.length === 0) {
    return Response.json({ error: 'Aucun enseignant à importer' }, { status: 400 });
  }

  if (teachers.length > 5000) {
    return Response.json({ error: 'Maximum 5000 enseignants par import' }, { status: 400 });
  }

  if (dryRun) {
    const results = teachers.map((t: any, idx: number) => {
      const errors: string[] = [];
      if (!t.firstName && !t['Prénom']) errors.push('Prénom requis');
      if (!t.lastName && !t['Nom']) errors.push('Nom requis');
      if (!t.employmentType && !t['Type d\'emploi']) errors.push('Type d\'emploi requis');
      if (!t.contractType && !t['Type de contrat']) errors.push('Type de contrat requis');
      return { row: idx + 1, valid: errors.length === 0, errors, data: t };
    });
    return Response.json({ dryRun: true, total: teachers.length, valid: results.filter((r: any) => r.valid).length, invalid: results.filter((r: any) => !r.valid).length, results });
  }

  let imported = 0;
  let skipped = 0;
  const errors: Array<{ row: number; error: string }> = [];

  for (let i = 0; i < teachers.length; i++) {
    const t = teachers[i];
    const firstName = t.firstName || t['Prénom'];
    const lastName = t.lastName || t['Nom'];
    const employmentType = t.employmentType || t['Type d\'emploi'];
    const contractType = t.contractType || t['Type de contrat'];

    if (!firstName || !lastName || !employmentType || !contractType) {
      errors.push({ row: i + 1, error: 'Champs obligatoires manquants' });
      skipped++;
      continue;
    }

    const matricule = `TCH${new Date().getFullYear().toString().slice(-2)}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const { error: insertError } = await supabase.from('teachers').insert({
      school_id: schoolId,
      matricule,
      first_name: firstName,
      last_name: lastName,
      date_of_birth: t.dateOfBirth || t['Date de naissance'] || null,
      gender: t.gender || t['Sexe'] || null,
      email: t.email || null,
      phone: t.phone || null,
      address: t.address || null,
      nationality: t.nationality || null,
      employment_type: employmentType,
      contract_type: contractType,
      grade: t.grade || null,
      speciality: t.speciality || null,
      hire_date: t.hireDate || new Date().toISOString(),
      salary: t.salary || null,
      status: 'ACTIVE',
      is_active: true,
    });

    if (insertError) {
      errors.push({ row: i + 1, error: insertError.message });
      skipped++;
    } else {
      imported++;
    }
  }

  return Response.json({ success: true, total: teachers.length, imported, skipped, errors });
});
