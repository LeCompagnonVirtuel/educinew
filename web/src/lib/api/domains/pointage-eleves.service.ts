import { getSupabase, camel } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export type StudentPointageStatus = 'PRESENT' | 'LATE' | 'ABSENT' | 'DEPARTED' | 'EXCUSED';
export type StudentPointageMethod = 'QR' | 'NFC' | 'MANUAL' | 'FACIAL' | 'PIN';

export interface StudentPointageRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentPhoto?: string;
  matricule?: string;
  className?: string;
  levelName?: string;
  cycleName?: string;
  gender?: string;
  date: string;
  arrivalTime: string | null;
  departureTime: string | null;
  status: StudentPointageStatus;
  method: StudentPointageMethod;
  lateMinutes: number;
  absenceReason?: string;
  observations?: string;
  operator?: string;
  createdAt: string;
}

export interface StudentDashboardStats {
  totalStudents: number;
  present: number;
  absent: number;
  late: number;
  departed: number;
  notCheckedIn: number;
  excused: number;
  attendanceRate: number;
  lateRate: number;
  byClass: { className: string; total: number; present: number; absent: number; late: number; rate: number }[];
  byLevel: { level: string; total: number; present: number; rate: number }[];
  byCycle: { cycle: string; total: number; present: number; rate: number }[];
  byGender: { gender: string; total: number; present: number; rate: number }[];
  hourlyData: { hour: string; arrivals: number }[];
  weeklyData: { day: string; present: number; absent: number; late: number }[];
}

export const sbPointageEleves = {
  async getTodayRecords(): Promise<StudentPointageRecord[]> {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('attendance')
      .select('*, student:students(*, user:users!students_user_id_fkey(*), class:classes(*))')
      .eq('school_id', schoolId)
      .eq('date', today)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map((r: any) => {
      const student = r.student;
      const user = student?.user;
      const cls = student?.class;
      return {
        id: r.id,
        studentId: r.student_id,
        studentName: user?.name || `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || 'Élève',
        studentPhoto: user?.photo_url,
        matricule: student?.matricule,
        className: cls?.name || '',
        levelName: cls?.level || '',
        cycleName: cls?.cycle || '',
        gender: student?.gender || user?.gender,
        date: r.date,
        arrivalTime: r.remark?.match(/Arrivée: (.+)/)?.[1] || null,
        departureTime: r.remark?.match(/Départ: (.+)/)?.[1] || null,
        status: r.status as StudentPointageStatus,
        method: (r.method || 'MANUAL') as StudentPointageMethod,
        lateMinutes: r.status === 'LATE' ? 15 : 0,
        absenceReason: r.status === 'ABSENT' ? r.remark : undefined,
        observations: r.remark,
        operator: r.operator,
        createdAt: r.created_at,
      };
    });
  },

  async getDashboardStats(): Promise<StudentDashboardStats> {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];

    const [attendanceRes, studentsRes, classesRes] = await Promise.all([
      supabase.from('attendance').select('status, student_id, remark').eq('school_id', schoolId).eq('date', today),
      supabase.from('students').select('id, gender, class_id').eq('school_id', schoolId),
      supabase.from('classes').select('id, name, level').eq('school_id', schoolId),
    ]);

    const attendanceData = attendanceRes.data || [];
    const studentsData = studentsRes.data || [];
    const classesData = classesRes.data || [];

    const totalStudents = studentsData.length;
    const present = attendanceData.filter((r: any) => r.status === 'PRESENT').length;
    const late = attendanceData.filter((r: any) => r.status === 'LATE').length;
    const absent = attendanceData.filter((r: any) => r.status === 'ABSENT').length;
    const departed = attendanceData.filter((r: any) => r.status === 'DEPARTED').length;
    const excused = attendanceData.filter((r: any) => r.status === 'EXCUSED').length;
    const checkedInIds = new Set(attendanceData.map((r: any) => r.student_id));
    const notCheckedIn = totalStudents - checkedInIds.size;
    const totalPresent = present + late;
    const attendanceRate = totalStudents > 0 ? Math.round((totalPresent / totalStudents) * 100) : 0;
    const lateRate = totalPresent > 0 ? Math.round((late / totalPresent) * 100) : 0;

    const classMap = new Map<string, { name: string; total: number; present: number; absent: number; late: number }>();
    for (const cls of classesData) {
      classMap.set(cls.id, { name: cls.name, total: 0, present: 0, absent: 0, late: 0 });
    }
    for (const s of studentsData) {
      const entry = classMap.get(s.class_id);
      if (entry) entry.total++;
    }
    for (const r of attendanceData) {
      const student = studentsData.find((s: any) => s.id === r.student_id);
      if (student) {
        const entry = classMap.get(student.class_id);
        if (entry) {
          if (r.status === 'PRESENT') entry.present++;
          else if (r.status === 'LATE') entry.late++;
          else if (r.status === 'ABSENT') entry.absent++;
        }
      }
    }
    const byClass = Array.from(classMap.entries())
      .map(([id, v]) => ({
        className: v.name,
        total: v.total,
        present: v.present,
        absent: v.absent,
        late: v.late,
        rate: v.total > 0 ? Math.round(((v.present + v.late) / v.total) * 100) : 0,
      }))
      .sort((a, b) => b.rate - a.rate);

    const levelMap = new Map<string, { total: number; present: number }>();
    for (const s of studentsData) {
      const cls = classesData.find((c: any) => c.id === s.class_id);
      const level = cls?.level || 'Autre';
      if (!levelMap.has(level)) levelMap.set(level, { total: 0, present: 0 });
      levelMap.get(level)!.total++;
    }
    for (const r of attendanceData) {
      const student = studentsData.find((s: any) => s.id === r.student_id);
      if (student) {
        const cls = classesData.find((c: any) => c.id === student.class_id);
        const level = cls?.level || 'Autre';
        const entry = levelMap.get(level);
        if (entry && (r.status === 'PRESENT' || r.status === 'LATE')) entry.present++;
      }
    }
    const byLevel = Array.from(levelMap.entries()).map(([level, v]) => ({
      level,
      total: v.total,
      present: v.present,
      rate: v.total > 0 ? Math.round((v.present / v.total) * 100) : 0,
    }));

    const genderMap = new Map<string, { total: number; present: number }>();
    for (const s of studentsData) {
      const gender = s.gender || 'Non spécifié';
      if (!genderMap.has(gender)) genderMap.set(gender, { total: 0, present: 0 });
      genderMap.get(gender)!.total++;
    }
    for (const r of attendanceData) {
      const student = studentsData.find((s: any) => s.id === r.student_id);
      if (student && (r.status === 'PRESENT' || r.status === 'LATE')) {
        const gender = student.gender || 'Non spécifié';
        const entry = genderMap.get(gender);
        if (entry) entry.present++;
      }
    }
    const byGender = Array.from(genderMap.entries()).map(([gender, v]) => ({
      gender,
      total: v.total,
      present: v.present,
      rate: v.total > 0 ? Math.round((v.present / v.total) * 100) : 0,
    }));

    const byCycle = [
      { cycle: 'Primaire', total: 0, present: 0, rate: 0 },
      { cycle: 'Secondaire', total: 0, present: 0, rate: 0 },
    ];

    const hourlyData: { hour: string; arrivals: number }[] = [];
    for (let h = 6; h <= 20; h++) {
      const hourStr = `${String(h).padStart(2, '0')}:00`;
      hourlyData.push({ hour: hourStr, arrivals: 0 });
    }

    const weeklyData: { day: string; present: number; absent: number; late: number }[] = [];
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    for (let i = 0; i < 7; i++) {
      weeklyData.push({ day: days[i], present: 0, absent: 0, late: 0 });
    }

    return {
      totalStudents,
      present,
      absent: totalStudents - present - late - departed - excused,
      late,
      departed,
      notCheckedIn,
      excused,
      attendanceRate,
      lateRate,
      byClass,
      byLevel,
      byCycle,
      byGender,
      hourlyData,
      weeklyData,
    };
  },

  async scanQR(code: string, action: 'ARRIVAL' | 'DEPARTURE' | 'LATE' = 'ARRIVAL') {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];

    // PRIMARY: Look up by qr_codes table (unified system)
    let student: any = null;
    const { data: qrRecord } = await supabase
      .from('qr_codes')
      .select('user_id, is_active, expires_at')
      .eq('qr_data', code)
      .eq('school_id', schoolId)
      .single();

    if (qrRecord) {
      if (!qrRecord.is_active) return { success: false, message: 'QR code révoqué' };
      if (qrRecord.expires_at && new Date(qrRecord.expires_at) < new Date()) return { success: false, message: 'QR code expiré' };

      const { data } = await supabase
        .from('students')
        .select('*, user:users!students_user_id_fkey(*)')
        .eq('user_id', qrRecord.user_id)
        .eq('school_id', schoolId)
        .single();
      student = data;
    }

    // FALLBACK: Direct matricule lookup (legacy compatibility)
    if (!student) {
      const { data } = await supabase
        .from('students')
        .select('*, user:users!students_user_id_fkey(*)')
        .eq('matricule', code)
        .eq('school_id', schoolId)
        .single();
      student = data;
    }

    if (!student) {
      return { success: false, message: 'Élève non trouvé avec ce matricule' };
    }

    const { data: existing } = await supabase
      .from('attendance')
      .select('id, status')
      .eq('student_id', student.id)
      .eq('date', today)
      .single();

    if (existing && action === 'ARRIVAL') {
      return { success: false, message: 'Déjà pointé aujourd\'hui', duplicate: true };
    }

    const status = action === 'LATE' ? 'LATE' : action === 'DEPARTURE' ? 'DEPARTED' : 'PRESENT';
    const timeLabel = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const remark = action === 'DEPARTURE' ? `Départ: ${timeLabel}` : `Arrivée: ${timeLabel}`;

    const { data: record, error } = await supabase
      .from('attendance')
      .upsert({
        student_id: student.id,
        school_id: schoolId,
        date: today,
        status,
        method: 'QR',
        remark,
      }, { onConflict: 'student_id,date' })
      .select()
      .single();

    if (error) throw error;

    // Update QR scan count
    if (qrRecord) {
      await supabase.from('qr_codes').update({
        last_scanned_at: new Date().toISOString(),
      }).eq('user_id', qrRecord.user_id).eq('school_id', schoolId);
    }

    const user = student.user;
    return {
      success: true,
      message: action === 'DEPARTURE' ? 'Départ enregistré' : 'Arrivée enregistrée',
      person: {
        name: user?.name || 'Élève',
        matricule: student.matricule,
        photo: user?.photo_url,
      },
    };
  },

  async manualCheckIn(studentId: string, status: 'PRESENT' | 'LATE' | 'EXCUSED' = 'PRESENT', reason?: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];
    const timeLabel = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    const { data, error } = await supabase
      .from('attendance')
      .upsert({
        student_id: studentId,
        school_id: schoolId,
        date: today,
        status,
        method: 'MANUAL',
        remark: reason || `Arrivée: ${timeLabel}`,
      }, { onConflict: 'student_id,date' })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async markAbsent(studentIds: string[], reason?: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];

    const records = studentIds.map(id => ({
      student_id: id,
      school_id: schoolId,
      date: today,
      status: 'ABSENT',
      method: 'MANUAL' as const,
      remark: reason || 'Marqué absent',
    }));

    const { data, error } = await supabase
      .from('attendance')
      .upsert(records, { onConflict: 'student_id,date' })
      .select();

    if (error) throw error;
    return data;
  },

  async getClassStats() {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];

    const { data: classes } = await supabase
      .from('classes')
      .select('id, name')
      .eq('school_id', schoolId);

    if (!classes) return [];

    const stats = [];

    for (const cls of classes) {
      const { data: students } = await supabase
        .from('students').select('id').eq('class_id', cls.id);
      const studentIds = (students || []).map((s: any) => s.id);
      if (studentIds.length === 0) continue;

      const { data: attendance } = await supabase
        .from('attendance')
        .select('status')
        .in('student_id', studentIds)
        .eq('date', today);

      const total = studentIds.length;
      const present = (attendance || []).filter((r: any) => r.status === 'PRESENT').length;
      const late = (attendance || []).filter((r: any) => r.status === 'LATE').length;
      const absent = total - present - late;

      stats.push({
        classId: cls.id,
        className: cls.name,
        total,
        present,
        absent,
        late,
        rate: total > 0 ? Math.round(((present + late) / total) * 100) : 0,
      });
    }

    return stats.sort((a, b) => b.rate - a.rate);
  },

  async getHistory(filters?: { startDate?: string; endDate?: string; classId?: string; status?: string; search?: string }) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();

    let studentIds: string[] = [];
    if (filters?.classId) {
      const { data: classStudents } = await supabase
        .from('students').select('id').eq('class_id', filters.classId).eq('school_id', schoolId);
      studentIds = (classStudents || []).map((s: any) => s.id);
      if (studentIds.length === 0) return [];
    }

    let query = supabase
      .from('attendance')
      .select('*, student:students(*, user:users!students_user_id_fkey(*), class:classes(*))')
      .eq('school_id', schoolId);

    if (filters?.startDate) query = query.gte('date', filters.startDate);
    if (filters?.endDate) query = query.lte('date', filters.endDate);
    if (filters?.status) query = query.eq('status', filters.status);
    if (studentIds.length > 0) query = query.in('student_id', studentIds);

    const { data, error } = await query.order('created_at', { ascending: false }).limit(500);
    if (error) throw error;

    let records: StudentPointageRecord[] = (data || []).map((r: any) => {
      const student = r.student;
      const user = student?.user;
      return {
        id: r.id,
        studentId: r.student_id,
        studentName: user?.name || 'Élève',
        studentPhoto: user?.photo_url,
        matricule: student?.matricule,
        className: student?.class?.name || '',
        levelName: student?.class?.level || '',
        gender: student?.gender,
        date: r.date,
        arrivalTime: r.remark?.match(/Arrivée: (.+)/)?.[1] || null,
        departureTime: r.remark?.match(/Départ: (.+)/)?.[1] || null,
        status: r.status as StudentPointageStatus,
        method: (r.method || 'MANUAL') as StudentPointageMethod,
        lateMinutes: r.status === 'LATE' ? 15 : 0,
        observations: r.remark,
        operator: r.operator,
        createdAt: r.created_at,
      };
    });

    if (filters?.search) {
      const s = filters.search.toLowerCase();
      records = records.filter(r =>
        r.studentName.toLowerCase().includes(s) ||
        (r.matricule && r.matricule.toLowerCase().includes(s)) ||
        (r.className && r.className.toLowerCase().includes(s))
      );
    }

    return records;
  },
};
