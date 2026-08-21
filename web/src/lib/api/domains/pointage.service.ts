import { getSupabase, camel } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export type PointagePersonType = 'student' | 'teacher' | 'staff';
export type PointageMethod = 'QR' | 'GPS' | 'NFC' | 'BLUETOOTH' | 'BIOMETRIC' | 'MANUAL' | 'FACIAL' | 'PIN';
export type PointageAction = 'ARRIVAL' | 'DEPARTURE' | 'BREAK_START' | 'BREAK_END' | 'REPRISE' | 'LATE';
export type PointageStatus = 'PRESENT' | 'LATE' | 'ABSENT' | 'DEPARTED' | 'ON_BREAK' | 'EXCUSED';

export interface PointageRecord {
  id: string;
  personId: string;
  personType: PointagePersonType;
  personName: string;
  personPhoto?: string;
  personRole?: string;
  className?: string;
  matricule?: string;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  breakStart: string | null;
  breakEnd: string | null;
  repriseTime: string | null;
  serviceStart: string | null;
  status: PointageStatus;
  method: PointageMethod;
  latitude: number | null;
  longitude: number | null;
  distanceMeters: number | null;
  qrVerified: boolean;
  lateMinutes: number;
  totalWorkMinutes: number;
  breakMinutes: number;
  overtimeMinutes: number;
  recordedBy: string | null;
  recordedByType: string;
  notes: string | null;
  device: string | null;
  createdAt: string;
}

export interface PointageTimelineEvent {
  id: string;
  type: PointageAction;
  time: string;
  personId: string;
  personName: string;
  personPhoto?: string;
  personType: PointagePersonType;
  method: PointageMethod;
  device: string | null;
  validated: boolean;
}

export interface PointageDashboardStats {
  totalStudents: number;
  studentsPresent: number;
  studentsAbsent: number;
  studentsLate: number;
  totalTeachers: number;
  teachersPresent: number;
  teachersAbsent: number;
  teachersLate: number;
  totalStaff: number;
  staffPresent: number;
  staffAbsent: number;
  staffLate: number;
  staffOnBreak: number;
  staffDeparted: number;
  departures: number;
  scansToday: number;
  attendanceRate: number;
  lateRate: number;
  pendingAlerts: number;
}

export interface PointageClassStats {
  classId: string;
  className: string;
  total: number;
  present: number;
  absent: number;
  late: number;
  rate: number;
}

export interface PointageHourlyData {
  hour: string;
  arrivals: number;
  departures: number;
}

export interface PointageWeeklyData {
  day: string;
  present: number;
  absent: number;
  late: number;
}

export const sbPointage = {
  // ─── UNIFIED RECORDS ───────────────────────────────────────────────
  async getTodayRecords(personType?: PointagePersonType): Promise<PointageRecord[]> {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];
    const records: PointageRecord[] = [];

    if (!personType || personType === 'student') {
      const { data } = await supabase
        .from('attendance')
        .select('*, student:students(*, user:users!students_user_id_fkey(*))')
        .eq('school_id', schoolId)
        .eq('date', today);
      (data || []).forEach((r: any) => {
        const student = r.student;
        const user = student?.user;
        records.push({
          id: r.id,
          personId: r.student_id,
          personType: 'student',
          personName: user?.name || `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || 'Élève',
          personPhoto: user?.photo_url,
          personRole: 'Élève',
          className: student?.class?.name || '',
          matricule: student?.matricule,
          date: r.date,
          checkInTime: r.remark?.match(/Arrivée: (.+)/)?.[1] || null,
          checkOutTime: r.remark?.match(/Départ: (.+)/)?.[1] || null,
          breakStart: null,
          breakEnd: null,
          repriseTime: null,
          serviceStart: null,
          status: r.status as PointageStatus,
          method: (r.method || 'MANUAL') as PointageMethod,
          latitude: r.latitude,
          longitude: r.longitude,
          distanceMeters: null,
          qrVerified: r.method === 'QR',
          lateMinutes: 0,
          totalWorkMinutes: 0,
          breakMinutes: 0,
          overtimeMinutes: 0,
          recordedBy: r.operator,
          recordedByType: r.operator ? 'SURVEILLANT' : 'SELF',
          notes: r.remark,
          device: r.device,
          createdAt: r.created_at,
        });
      });
    }

    if (!personType || personType === 'teacher') {
      const { data } = await supabase
        .from('teacher_attendance')
        .select('*, teacher:teachers(*, user:users!teachers_user_id_fkey(*))')
        .eq('school_id', schoolId)
        .eq('date', today);
      (data || []).forEach((r: any) => {
        const teacher = r.teacher;
        const user = teacher?.user;
        records.push({
          id: r.id,
          personId: r.teacher_id,
          personType: 'teacher',
          personName: user?.name || `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || 'Enseignant',
          personPhoto: user?.photo_url,
          personRole: 'Enseignant',
          className: '',
          matricule: teacher?.employee_code,
          date: r.date,
          checkInTime: r.check_in_time,
          checkOutTime: r.check_out_time,
          breakStart: null,
          breakEnd: null,
          repriseTime: null,
          serviceStart: null,
          status: r.status as PointageStatus,
          method: (r.method || 'GPS') as PointageMethod,
          latitude: r.gps_latitude || r.latitude,
          longitude: r.gps_longitude || r.longitude,
          distanceMeters: r.distance_meters,
          qrVerified: r.qr_verified || false,
          lateMinutes: r.late_minutes || 0,
          totalWorkMinutes: 0,
          breakMinutes: 0,
          overtimeMinutes: 0,
          recordedBy: null,
          recordedByType: 'SELF',
          notes: r.remark || r.notes,
          device: null,
          createdAt: r.created_at,
        });
      });
    }

    if (!personType || personType === 'staff') {
      const { data } = await supabase
        .from('staff_attendance')
        .select('*, staff:staff(*, user:users(*))')
        .eq('school_id', schoolId)
        .eq('date', today);
      (data || []).forEach((r: any) => {
        const staff = r.staff;
        const user = staff?.user;
        records.push({
          id: r.id,
          personId: r.staff_id,
          personType: 'staff',
          personName: user?.name || `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || 'Personnel',
          personPhoto: user?.photo_url,
          personRole: staff?.position || staff?.role || 'Personnel',
          className: '',
          matricule: staff?.employee_code,
          date: r.date,
          checkInTime: r.check_in_time,
          checkOutTime: r.check_out_time,
          breakStart: r.break_start,
          breakEnd: r.break_end,
          repriseTime: r.reprise_time,
          serviceStart: r.service_start,
          status: r.status as PointageStatus,
          method: (r.method || 'GPS') as PointageMethod,
          latitude: r.latitude,
          longitude: r.longitude,
          distanceMeters: null,
          qrVerified: r.qr_verified || false,
          lateMinutes: r.late_minutes || 0,
          totalWorkMinutes: r.total_work_minutes || 0,
          breakMinutes: r.break_minutes || 0,
          overtimeMinutes: r.overtime_minutes || 0,
          recordedBy: r.recorded_by,
          recordedByType: r.recorded_by_type || 'SELF',
          notes: r.notes,
          device: null,
          createdAt: r.created_at,
        });
      });
    }

    return records.sort((a, b) => {
      const timeA = a.checkInTime || a.createdAt;
      const timeB = b.checkInTime || b.createdAt;
      return new Date(timeB).getTime() - new Date(timeA).getTime();
    });
  },

  // ─── DASHBOARD STATS ──────────────────────────────────────────────
  async getDashboardStats(): Promise<PointageDashboardStats> {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];

    const [studentsRes, teachersRes, staffRes, totalStudentsRes, totalTeachersRes, totalStaffRes] = await Promise.all([
      supabase.from('attendance').select('status').eq('school_id', schoolId).eq('date', today),
      supabase.from('teacher_attendance').select('status').eq('school_id', schoolId).eq('date', today),
      supabase.from('staff_attendance').select('status').eq('school_id', schoolId).eq('date', today),
      supabase.from('students').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
      supabase.from('teachers').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
      supabase.from('staff').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
    ]);

    const sData = studentsRes.data || [];
    const tData = teachersRes.data || [];
    const stData = staffRes.data || [];

    const studentsPresent = sData.filter((r: any) => r.status === 'PRESENT').length;
    const studentsLate = sData.filter((r: any) => r.status === 'LATE').length;
    const teachersPresent = tData.filter((r: any) => r.status === 'PRESENT').length;
    const teachersLate = tData.filter((r: any) => r.status === 'LATE').length;
    const staffPresent = stData.filter((r: any) => r.status === 'PRESENT').length;
    const staffLate = stData.filter((r: any) => r.status === 'LATE').length;
    const staffOnBreak = stData.filter((r: any) => r.status === 'ON_BREAK').length;
    const staffDeparted = stData.filter((r: any) => r.status === 'DEPARTED').length;

    const totalStudents = totalStudentsRes.count || 0;
    const totalTeachers = totalTeachersRes.count || 0;
    const totalStaff = totalStaffRes.count || 0;

    const totalCheckedIn = studentsPresent + studentsLate + teachersPresent + teachersLate + staffPresent + staffLate;
    const totalPeople = totalStudents + totalTeachers + totalStaff;
    const attendanceRate = totalPeople > 0 ? Math.round((totalCheckedIn / totalPeople) * 100) : 0;
    const totalLate = studentsLate + teachersLate + staffLate;
    const lateRate = totalCheckedIn > 0 ? Math.round((totalLate / totalCheckedIn) * 100) : 0;

    return {
      totalStudents,
      studentsPresent,
      studentsAbsent: totalStudents - studentsPresent - studentsLate,
      studentsLate,
      totalTeachers,
      teachersPresent,
      teachersAbsent: totalTeachers - teachersPresent - teachersLate,
      teachersLate,
      totalStaff,
      staffPresent,
      staffAbsent: totalStaff - staffPresent - staffLate - staffOnBreak - staffDeparted,
      staffLate,
      staffOnBreak,
      staffDeparted,
      departures: staffDeparted,
      scansToday: sData.length,
      attendanceRate,
      lateRate,
      pendingAlerts: totalLate + (totalStudents - studentsPresent - studentsLate),
    };
  },

  // ─── CHECK IN / OUT ───────────────────────────────────────────────
  async checkIn(
    personId: string,
    personType: PointagePersonType,
    method: PointageMethod = 'QR',
    lat?: number,
    lng?: number,
    options?: { device?: string; notes?: string }
  ): Promise<PointageRecord> {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toISOString();

    if (personType === 'student') {
      const { data: student } = await supabase
        .from('students').select('school_id, class:classes(*)').eq('id', personId).single();
      if (!student) throw new Error('Élève non trouvé');

      const { data, error } = await supabase
        .from('attendance')
        .upsert({
          student_id: personId,
          school_id: student.school_id || schoolId,
          date: today,
          status: 'PRESENT',
          method,
          latitude: lat || null,
          longitude: lng || null,
          device: options?.device || null,
          operator: options?.notes || null,
          remark: `Arrivée: ${new Date().toLocaleTimeString('fr-FR')}`,
        }, { onConflict: 'student_id,date' })
        .select()
        .single();
      if (error) throw error;
      return camel(data) as any;
    }

    if (personType === 'teacher') {
      const { data, error } = await supabase
        .from('teacher_attendance')
        .upsert({
          teacher_id: personId,
          school_id: schoolId,
          date: today,
          status: 'PRESENT',
          check_in_time: now,
          method,
          gps_latitude: lat || null,
          gps_longitude: lng || null,
        }, { onConflict: 'teacher_id,date' })
        .select()
        .single();
      if (error) throw error;
      return camel(data) as any;
    }

    const { data: staff } = await supabase
      .from('staff').select('school_id').eq('id', personId).single();
    if (!staff) throw new Error('Personnel non trouvé');

    const { data, error } = await supabase
      .from('staff_attendance')
      .upsert({
        staff_id: personId,
        user_id: (await supabase.auth.getUser()).data.user?.id,
        school_id: staff.school_id || schoolId,
        date: today,
        check_in_time: now,
        status: 'PRESENT',
        method,
        latitude: lat || null,
        longitude: lng || null,
        recorded_by_type: 'SELF',
        notes: options?.notes || null,
      }, { onConflict: 'staff_id,date' })
      .select()
      .single();
    if (error) throw error;
    return camel(data) as any;
  },

  async checkOut(personId: string, personType: PointagePersonType): Promise<void> {
    const supabase = getSupabase();
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toISOString();

    if (personType === 'student') {
      await supabase.from('attendance')
        .update({ remark: `Départ: ${new Date().toLocaleTimeString('fr-FR')}` })
        .eq('student_id', personId).eq('date', today);
    } else if (personType === 'teacher') {
      await supabase.from('teacher_attendance')
        .update({ check_out_time: now })
        .eq('teacher_id', personId).eq('date', today);
    } else {
      await supabase.from('staff_attendance')
        .update({ check_out_time: now, status: 'DEPARTED' })
        .eq('staff_id', personId).eq('date', today);
    }
  },

  async startBreak(personId: string): Promise<void> {
    const supabase = getSupabase();
    const today = new Date().toISOString().split('T')[0];
    await supabase.from('staff_attendance')
      .update({ break_start: new Date().toISOString(), status: 'ON_BREAK' })
      .eq('staff_id', personId).eq('date', today);
  },

  async endBreak(personId: string): Promise<void> {
    const supabase = getSupabase();
    const today = new Date().toISOString().split('T')[0];
    await supabase.from('staff_attendance')
      .update({ break_end: new Date().toISOString(), status: 'PRESENT' })
      .eq('staff_id', personId).eq('date', today);
  },

  // ─── QR SCANNER ───────────────────────────────────────────────────
  async scanQR(qrCode: string, action: PointageAction = 'ARRIVAL'): Promise<{
    success: boolean;
    person?: any;
    personType?: PointagePersonType;
    record?: any;
    message: string;
    duplicate?: boolean;
  }> {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];

    // Try student QR
    const { data: student } = await supabase
      .from('students')
      .select('*, user:users!students_user_id_fkey(*)')
      .eq('matricule', qrCode)
      .eq('school_id', schoolId)
      .single();

    if (student) {
      const { data: existing } = await supabase
        .from('attendance')
        .select('id')
        .eq('student_id', student.id)
        .eq('date', today)
        .single();

      if (existing && action === 'ARRIVAL') {
        return { success: false, person: camel(student), personType: 'student', message: 'Déjà pointé aujourd\'hui', duplicate: true };
      }

      const updateData: any = {
        student_id: student.id,
        school_id: schoolId,
        date: today,
        status: action === 'ARRIVAL' ? 'PRESENT' : action === 'LATE' ? 'LATE' : 'PRESENT',
        method: 'QR',
      };
      if (action === 'ARRIVAL' || action === 'LATE') {
        updateData.remark = `Arrivée: ${new Date().toLocaleTimeString('fr-FR')}`;
      } else {
        updateData.remark = `Départ: ${new Date().toLocaleTimeString('fr-FR')}`;
      }

      const { data: record, error } = await supabase
        .from('attendance')
        .upsert(updateData, { onConflict: 'student_id,date' })
        .select()
        .single();
      if (error) throw error;

      return {
        success: true,
        person: camel(student),
        personType: 'student',
        record: camel(record),
        message: action === 'DEPARTURE' ? 'Départ enregistré' : 'Arrivée enregistrée',
      };
    }

    // Try teacher QR badge
    const { data: badge } = await supabase
      .from('teacher_badges')
      .select('*, teacher:teachers(*, user:users!teachers_user_id_fkey(*))')
      .eq('badge_code', qrCode)
      .single();

    if (badge?.teacher) {
      const teacher = badge.teacher;
      const { data, error } = await supabase
        .from('teacher_attendance')
        .upsert({
          teacher_id: teacher.id,
          school_id: schoolId,
          date: today,
          status: 'PRESENT',
          check_in_time: action === 'DEPARTURE' ? null : new Date().toISOString(),
          check_out_time: action === 'DEPARTURE' ? new Date().toISOString() : null,
          method: 'QR',
          qr_verified: true,
        }, { onConflict: 'teacher_id,date' })
        .select()
        .single();
      if (error) throw error;

      return {
        success: true,
        person: camel(teacher),
        personType: 'teacher',
        record: camel(data),
        message: action === 'DEPARTURE' ? 'Départ enseignant enregistré' : 'Arrivée enseignant enregistrée',
      };
    }

    return { success: false, message: 'QR Code non reconnu' };
  },

  // ─── CLASS STATS ──────────────────────────────────────────────────
  async getClassStats(): Promise<PointageClassStats[]> {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];

    const { data: classes } = await supabase
      .from('classes')
      .select('id, name')
      .eq('school_id', schoolId);

    if (!classes) return [];

    const stats: PointageClassStats[] = [];

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

  // ─── HOURLY DATA ──────────────────────────────────────────────────
  async getHourlyData(): Promise<PointageHourlyData[]> {
    const records = await this.getTodayRecords();
    const hourly: PointageHourlyData[] = [];

    for (let h = 6; h <= 20; h++) {
      const hourStr = `${String(h).padStart(2, '0')}:00`;
      const arrivals = records.filter(r => {
        if (!r.checkInTime) return false;
        const hr = new Date(r.checkInTime).getHours();
        return hr === h;
      }).length;
      const departures = records.filter(r => {
        if (!r.checkOutTime) return false;
        const hr = new Date(r.checkOutTime).getHours();
        return hr === h;
      }).length;
      hourly.push({ hour: hourStr, arrivals, departures });
    }

    return hourly;
  },

  // ─── WEEKLY DATA ──────────────────────────────────────────────────
  async getWeeklyData(): Promise<PointageWeeklyData[]> {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const weekly: PointageWeeklyData[] = [];

    const now = new Date();
    const dayOfWeek = now.getDay();

    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() - dayOfWeek + i);
      const dateStr = d.toISOString().split('T')[0];

      const { data } = await supabase
        .from('attendance')
        .select('status')
        .eq('school_id', schoolId)
        .eq('date', dateStr);

      const present = (data || []).filter((r: any) => r.status === 'PRESENT').length;
      const late = (data || []).filter((r: any) => r.status === 'LATE').length;
      const totalStudents = await supabase
        .from('students').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);

      const total = totalStudents.count || 0;
      const absent = total - present - late;

      weekly.push({
        day: days[d.getDay()],
        present,
        absent: Math.max(0, absent),
        late,
      });
    }

    return weekly;
  },

  // ─── HISTORY ──────────────────────────────────────────────────────
  async getHistory(filters?: {
    startDate?: string;
    endDate?: string;
    personType?: PointagePersonType;
    status?: string;
    search?: string;
  }): Promise<PointageRecord[]> {
    const allRecords: PointageRecord[] = [];
    const types: PointagePersonType[] = filters?.personType ? [filters.personType] : ['student', 'teacher', 'staff'];

    for (const t of types) {
      const records = await this.getTodayRecords(t);
      allRecords.push(...records);
    }

    let filtered = allRecords;
    if (filters?.status) {
      filtered = filtered.filter(r => r.status === filters.status);
    }
    if (filters?.search) {
      const s = filters.search.toLowerCase();
      filtered = filtered.filter(r =>
        r.personName.toLowerCase().includes(s) ||
        (r.matricule && r.matricule.toLowerCase().includes(s)) ||
        (r.className && r.className.toLowerCase().includes(s))
      );
    }

    return filtered;
  },

  // ─── REPORTS ──────────────────────────────────────────────────────
  async generateReport(
    period: 'daily' | 'weekly' | 'monthly' | 'yearly',
    date?: string
  ): Promise<{
    summary: PointageDashboardStats;
    classStats: PointageClassStats[];
    hourlyData: PointageHourlyData[];
    weeklyData: PointageWeeklyData[];
  }> {
    const [summary, classStats, hourlyData, weeklyData] = await Promise.all([
      this.getDashboardStats(),
      this.getClassStats(),
      this.getHourlyData(),
      this.getWeeklyData(),
    ]);

    return { summary, classStats, hourlyData, weeklyData };
  },

  // ─── ANTI-FRAUD ───────────────────────────────────────────────────
  async detectAnomalies(): Promise<{
    doubleScans: number;
    qrExpired: number;
    outOfRange: number;
    suspiciousActivity: number;
  }> {
    const records = await this.getTodayRecords();
    const now = new Date();

    let doubleScans = 0;
    let outOfRange = 0;

    const personScans: Record<string, number> = {};
    records.forEach(r => {
      personScans[r.personId] = (personScans[r.personId] || 0) + 1;
    });
    Object.values(personScans).forEach(count => {
      if (count > 2) doubleScans++;
    });

    records.forEach(r => {
      if (r.distanceMeters && r.distanceMeters > 500) outOfRange++;
    });

    return {
      doubleScans,
      qrExpired: 0,
      outOfRange,
      suspiciousActivity: doubleScans + outOfRange,
    };
  },
};
