import { getSupabase, createUserWithoutSessionSwitch, generateSecurePassword } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';
import { sbEmailTrigger } from './email-trigger.service';
import { parseImportFile } from '../../export-utils';
import { generateMatricule, isValidMatricule, normalizeMatricule, validateMatricule } from '../../matricule';

export const sbImport = {
  async downloadTemplate() {
    const supabase = getSupabase();
    const { data: { session } } = await supabase.auth.getSession();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const res = await fetch(`${supabaseUrl}/functions/v1/import-template`, {
      headers: { Authorization: `Bearer ${session?.access_token}` },
    });
    return res;
  },

  async validateFile(file: File) {
    const rows = await parseImportFile(file);
    if (rows.length === 0) return { totalRows: 0, validRows: 0, errorRows: 0, rows: [] };

    const parsed = rows.map((row, i) => {
      const errs: string[] = [];
      if (!row.nom) errs.push('Nom manquant');
      if (!row.prenom) errs.push('Prénom manquant');
      if (!row.email_parent && !row.emailparent) errs.push('Email parent manquant');
      if (row.matricule && row.matricule.trim()) {
        const matValidation = validateMatricule(row.matricule);
        if (!matValidation.valid) errs.push(matValidation.error!);
      }
      return {
        row: i + 1,
        nom: row.nom || '',
        prenom: row.prenom || '',
        dateNaissance: row.date_naissance || row.datenaissance || '',
        sexe: row.sexe || row.sex || '',
        classe: row.classe || row.class || '',
        matricule: row.matricule || '',
        nomParent: row.nom_parent || row.nomparent || '',
        telephoneParent: row.telephone_parent || row.telephoneparent || row.phone_parent || '',
        emailParent: row.email_parent || row.emailparent || '',
        adresse: row.adresse || row.address || '',
        errors: errs,
        valid: errs.length === 0,
      };
    });
    return {
      totalRows: parsed.length,
      validRows: parsed.filter((r) => r.valid).length,
      errorRows: parsed.filter((r) => !r.valid).length,
      rows: parsed,
    };
  },

  async confirmImport(rows: any[]) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    if (!schoolId) throw new Error('\u00c9tablissement non identifi\u00e9');

    const credentials: Array<{ studentName: string; className: string; matricule: string; studentLogin: string; studentPassword: string; parentName: string; parentLogin: string; parentPassword: string }> = [];
    const errors: Array<{ row: number; message: string; value: string }> = [];
    let parentsCreated = 0;

    // Pre-fetch all unique class names to avoid N+1 queries
    const uniqueClassNames = [...new Set(rows.map(r => r.classe).filter(Boolean))];
    const classNameToId = new Map<string, string>();
    if (uniqueClassNames.length > 0) {
      const { data: existingClasses } = await supabase
        .from('classes')
        .select('id, name')
        .eq('school_id', schoolId)
        .in('name', uniqueClassNames);
      (existingClasses || []).forEach((c: any) => classNameToId.set(c.name.toLowerCase(), c.id));
    }

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      try {
        const studentName = `${r.prenom || ''} ${r.nom || ''}`.trim();
        if (!studentName) { errors.push({ row: i + 1, message: 'Nom manquant', value: '' }); continue; }

        const studentEmail = r.email || `${(r.prenom || 'eleve').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}.${(r.nom || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}@educi.local`;
        const studentPassword = generateSecurePassword(studentName);
        const rawMatricule = r.matricule || generateMatricule();
        const matricule = normalizeMatricule(rawMatricule);

        if (!isValidMatricule(matricule)) {
          errors.push({ row: i + 1, message: `Matricule invalide: ${rawMatricule}. Format attendu: 16137807D`, value: rawMatricule });
          continue;
        }

        let classId: string | null = null;
        if (r.classe) {
          classId = classNameToId.get(r.classe.toLowerCase()) || null;
          if (!classId) {
            const { data: newClass } = await supabase.from('classes').insert({
              name: r.classe, school_id: schoolId, capacity: 45, level: 'PRIMAIRE',
            }).select('id').single();
            classId = newClass?.id || null;
            if (classId) classNameToId.set(r.classe.toLowerCase(), classId);
          }
        }

        const { authData, authError: authErr, accessKit } = await createUserWithoutSessionSwitch(supabase, studentEmail, studentPassword, {
          name: studentName, role: 'STUDENT', school_id: schoolId, phone: r.telephone || r.phone || null,
        }, 'STUDENT', {
          classId,
          matricule,
          dateOfBirth: r.dateNaissance || r.date_naissance || null,
          gender: r.sexe || null,
          address: r.adresse || null,
        });
        if (authErr || !authData?.user) {
          errors.push({ row: i + 1, message: authErr?.message || '\u00c9chec cr\u00e9ation compte', value: studentEmail });
          continue;
        }
        const actualStudentPassword = accessKit?.initial_password || studentPassword;

        sbEmailTrigger.onStudentCreated(studentEmail, studentName, r.classe || '', matricule);

        let parentLogin = '';
        let parentPassword = '';
        if (r.emailParent || r.email_parent) {
          parentLogin = r.emailParent || r.email_parent;
          const parentName = r.nomParent || r.nom_parent || `Parent de ${studentName}`;
          parentPassword = generateSecurePassword(parentName);

          const { authData: parentAuth, authError: parentErr, accessKit: parentKit } = await createUserWithoutSessionSwitch(supabase, parentLogin, parentPassword, {
            name: parentName, role: 'PARENT', school_id: schoolId,
          });
          if (!parentErr && parentAuth.user) {
            await supabase.from('users').upsert({
              id: parentAuth.user.id, name: parentName, email: parentLogin,
              role: 'PARENT', school_id: schoolId,
              phone: r.telephoneParent || r.telephone_parent || null, is_active: true,
            }, { onConflict: 'id' });
            parentsCreated++;
            parentPassword = parentKit?.initial_password || parentPassword;
            sbEmailTrigger.onParentCreated(parentLogin, parentName, parentPassword);
          }
        }

        credentials.push({
          studentName, className: r.classe || '', matricule,
          studentLogin: studentEmail, studentPassword: actualStudentPassword,
          parentName: r.nomParent || r.nom_parent || '',
          parentLogin, parentPassword,
        });
      } catch (err: any) {
        errors.push({ row: i + 1, message: err.message, value: r.email || '' });
      }
    }
    return { totalRows: rows.length, validRows: rows.length - errors.length, errorRows: errors.length, studentsCreated: credentials.length, parentsCreated, errors, credentials };
  },

  async exportAccessCardsPDF(credentials: any[], branding?: { primaryColor?: string; schoolName?: string }) {
    const jsPDF = (await import('jspdf')).default;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

    const cardW = 85;
    const cardH = 55;
    const startX = 10;
    const startY = 10;
    const gapX = 10;
    const gapY = 10;

    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const cols = Math.floor((pageW - 20 + gapX) / (cardW + gapX));

    const primaryRgb = branding?.primaryColor
      ? (() => {
          const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(branding.primaryColor);
          return r ? [parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16)] : [79, 70, 229];
        })()
      : [79, 70, 229];

    const schoolName = branding?.schoolName || 'EduCI School';

    (credentials || []).forEach((cred: any, i: number) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (cardW + gapX);
      const y = startY + row * (cardH + gapY);

      if (y + cardH > pageH - 10) {
        doc.addPage();
      }

      const actualY = y + cardH > pageH - 10 ? 10 : y;

      // Card background
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(x, actualY, cardW, cardH, 3, 3, 'F');

      // Header band
      doc.setFillColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
      doc.roundedRect(x, actualY, cardW, 14, 3, 3, 'F');
      doc.setFillColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
      doc.rect(x, actualY + 10, cardW, 4, 'F');

      // School name
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text(schoolName, x + cardW / 2, actualY + 6, { align: 'center' });
      doc.setFontSize(5);
      doc.setFont('helvetica', 'normal');
      doc.text('Carte d\'accès', x + cardW / 2, actualY + 10, { align: 'center' });

      // Student name
      doc.setTextColor(30, 30, 30);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      const displayName = cred.name || cred.studentName || 'Élève';
      doc.text(displayName, x + cardW / 2, actualY + 20, { align: 'center' });

      // Matricule
      if (cred.matricule) {
        doc.setFontSize(6);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text(`Mat. ${cred.matricule}`, x + cardW / 2, actualY + 25, { align: 'center' });
      }

      // Credentials box
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(x + 3, actualY + 28, cardW - 6, 22, 2, 2, 'F');
      doc.setDrawColor(220, 220, 220);
      doc.roundedRect(x + 3, actualY + 28, cardW - 6, 22, 2, 2, 'S');

      // Login
      doc.setTextColor(80, 80, 80);
      doc.setFontSize(5);
      doc.setFont('helvetica', 'normal');
      doc.text('Identifiant:', x + 6, actualY + 33);
      doc.setTextColor(30, 30, 30);
      doc.setFont('helvetica', 'bold');
      doc.text(cred.email || '', x + 28, actualY + 33);

      // Password
      doc.setTextColor(80, 80, 80);
      doc.setFontSize(5);
      doc.setFont('helvetica', 'normal');
      doc.text('Mot de passe:', x + 6, actualY + 39);
      doc.setTextColor(30, 30, 30);
      doc.setFont('helvetica', 'bold');
      doc.text(cred.password || '', x + 28, actualY + 39);

      // Role
      if (cred.role) {
        doc.setTextColor(80, 80, 80);
        doc.setFontSize(5);
        doc.setFont('helvetica', 'normal');
        doc.text('Rôle:', x + 6, actualY + 45);
        doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
        doc.setFont('helvetica', 'bold');
        doc.text(cred.role, x + 28, actualY + 45);
      }
    });

    // Footer on each page
    const totalPages = doc.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text(`${schoolName} — Cartes d'accès générées le ${new Date().toLocaleDateString('fr-FR')} — Page ${p}/${totalPages}`, pageW / 2, pageH - 5, { align: 'center' });
    }

    return doc.output('blob');
  },

  async downloadTeacherTemplate() {
    return sbImport.downloadTemplate();
  },

  async validateTeacherFile(file: File) {
    const rows = await parseImportFile(file);
    if (rows.length === 0) return { totalRows: 0, validRows: 0, errorRows: 0, rows: [] };

    const parsed = rows.map((row, i) => {
      const errs: string[] = [];
      if (!row.nom) errs.push('Nom manquant');
      if (!row.prenom) errs.push('Prénom manquant');
      if (!row.email) errs.push('Email manquant');
      return {
        row: i + 1,
        nom: row.nom || '',
        prenom: row.prenom || '',
        sexe: row.sexe || row.sex || '',
        dateNaissance: row.date_naissance || row.datenaissance || '',
        telephone: row.telephone || row.phone || '',
        email: row.email || '',
        matierePrincipale: row.matiere_principale || row.matiere || '',
        classesEnseignees: row.classes_enseignees || row.classes || '',
        statut: row.statut || row.status || '',
        adresse: row.adresse || row.address || '',
        errors: errs,
        valid: errs.length === 0,
      };
    });
    return {
      totalRows: parsed.length,
      validRows: parsed.filter((r) => r.valid).length,
      errorRows: parsed.filter((r) => !r.valid).length,
      rows: parsed,
    };
  },

  async confirmTeacherImport(rows: any[]) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    if (!schoolId) throw new Error('\u00c9tablissement non identifi\u00e9');

    const credentials: Array<{ teacherName: string; email: string; subject: string; classes: string; login: string; password: string }> = [];
    const errors: Array<{ row: number; message: string; value: string }> = [];

    // Pre-fetch all unique subject names to avoid N+1 queries
    const uniqueSubjectNames = [...new Set(rows.map(r => r.matiere_principale || r.matiere).filter(Boolean))];
    const subjectNameToId = new Map<string, string>();
    if (uniqueSubjectNames.length > 0) {
      const { data: existingSubjects } = await supabase
        .from('subjects')
        .select('id, name')
        .eq('school_id', schoolId)
        .in('name', uniqueSubjectNames);
      (existingSubjects || []).forEach((s: any) => subjectNameToId.set(s.name.toLowerCase(), s.id));
    }

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      try {
        const teacherName = `${r.prenom || ''} ${r.nom || ''}`.trim();
        if (!teacherName || !r.email) {
          errors.push({ row: i + 1, message: 'Nom ou email manquant', value: r.email || '' });
          continue;
        }

        const password = generateSecurePassword(teacherName);

        let subjectId: string | null = null;
        if (r.matiere_principale || r.matiere) {
          const subjectName = r.matiere_principale || r.matiere;
          subjectId = subjectNameToId.get(subjectName.toLowerCase()) || null;
          if (!subjectId) {
            const { data: newSubject } = await supabase.from('subjects').insert({
              name: subjectName, school_id: schoolId,
            }).select('id').single();
            subjectId = newSubject?.id || null;
            if (subjectId) subjectNameToId.set(subjectName.toLowerCase(), subjectId);
          }
        }

        const { authData, authError: authErr, accessKit: teacherKit } = await createUserWithoutSessionSwitch(supabase, r.email, password, {
          name: teacherName, role: 'TEACHER', school_id: schoolId, phone: r.telephone || null,
        }, 'TEACHER', {
          subjectId,
        });
        if (authErr || !authData?.user) {
          errors.push({ row: i + 1, message: authErr?.message || '\u00c9chec cr\u00e9ation compte', value: r.email });
          continue;
        }

        const actualTeacherPassword = teacherKit?.initial_password || password;
        sbEmailTrigger.onTeacherCreated(r.email, teacherName, actualTeacherPassword);

        credentials.push({
          teacherName, email: r.email,
          subject: r.matiere_principale || r.matiere || '',
          classes: r.classes_enseignees || r.classes || '',
          login: r.email, password: actualTeacherPassword,
        });
      } catch (err: any) {
        errors.push({ row: i + 1, message: err.message, value: r.email || '' });
      }
    }
    return { totalRows: rows.length, validRows: rows.length - errors.length, errorRows: errors.length, teachersCreated: credentials.length, errors, credentials };
  },

  async exportTeacherAccessCardsPDF(credentials: any, branding?: { primaryColor?: string; schoolName?: string }) {
    return sbImport.exportAccessCardsPDF(credentials, branding);
  },
};
