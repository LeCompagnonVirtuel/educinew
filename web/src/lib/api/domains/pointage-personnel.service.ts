import { getSupabase, camel } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export type StaffPointageStatus = 'PRESENT' | 'LATE' | 'ABSENT' | 'DEPARTED' | 'ON_BREAK' | 'EXCUSED';
export type StaffPointageMethod = 'QR' | 'GPS' | 'NFC' | 'BLUETOOTH' | 'BIOMETRIC' | 'MANUAL' | 'FACIAL' | 'PIN';
export type StaffCategory = 'teacher' | 'admin_staff';

export interface StaffPointageRecord {
  id: string;
  personId: string;
  personName: string;
  personPhoto?: string;
  personRole: string;
  department?: string;
  category: StaffCategory;
  matricule?: string;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  breakStart: string | null;
  breakEnd: string | null;
  repriseTime: string | null;
  serviceStart: string | null;
  status: StaffPointageStatus;
  method: StaffPointageMethod;
  latitude: number | null;
  longitude: number | null;
  distanceMeters: number | null;
  qrVerified: boolean;
  lateMinutes: number;
  totalWorkMinutes: number;
  breakMinutes: number;
  overtimeMinutes: number;
  notes?: string;
  createdAt: string;
}

export interface ActivityEvent {
  id: string;
  personName: string;
  personPhoto?: string;
  personRole: string;
  category: StaffCategory;
  action: 'ARRIVAL' | 'DEPARTURE' | 'BREAK_START' | 'BREAK_END' | 'LATE';
  time: string;
  method: StaffPointageMethod;
  lateMinutes?: number;
}

export interface StaffDashboardStats {
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
  totalPersonnel: number;
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
  totalOnBreak: number;
  totalDeparted: number;
  notCheckedIn: number;
  attendanceRate: number;
  lateRate: number;
  avgWorkMinutes: number;
  totalOvertime: number;
  punctualityRate: number;
  lastActivity?: ActivityEvent;
  activityFeed: ActivityEvent[];
  weeklyData: { day: string; present: number; absent: number; late: number }[];
  departmentStats: { department: string; total: number; present: number; rate: number }[];
}

export const sbPointagePersonnel = {
  async getTodayRecords(): Promise<StaffPointageRecord[]> {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];
    const records: StaffPointageRecord[] = [];

    const { data: teacherData } = await supabase
      .from('teacher_attendance')
      .select('*, teacher:teachers(*, user:users!teachers_user_id_fkey(*))')
      .eq('school_id', schoolId)
      .eq('date', today)
      .order('created_at', { ascending: false });

    for (const r of teacherData || []) {
      const teacher = (r as any).teacher;
      const user = teacher?.user;
      const checkIn = r.check_in_time ? new Date(r.check_in_time) : null;
      const checkOut = r.check_out_time ? new Date(r.check_out_time) : null;
      const workMins = checkIn && checkOut ? Math.floor((checkOut.getTime() - checkIn.getTime()) / 60000) : 0;

      records.push({
        id: r.id,
        personId: r.teacher_id,
        personName: user?.name || `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || 'Enseignant',
        personPhoto: user?.photo_url,
        personRole: 'Enseignant',
        department: teacher?.subject?.name || '',
        category: 'teacher',
        matricule: teacher?.employee_code,
        date: r.date,
        checkInTime: r.check_in_time,
        checkOutTime: r.check_out_time,
        breakStart: null,
        breakEnd: null,
        repriseTime: null,
        serviceStart: null,
        status: (r.status || 'PRESENT') as StaffPointageStatus,
        method: (r.method || 'GPS') as StaffPointageMethod,
        latitude: r.gps_latitude || r.latitude,
        longitude: r.gps_longitude || r.longitude,
        distanceMeters: r.distance_meters,
        qrVerified: r.qr_verified || false,
        lateMinutes: r.late_minutes || 0,
        totalWorkMinutes: workMins,
        breakMinutes: 0,
        overtimeMinutes: workMins > 480 ? workMins - 480 : 0,
        notes: r.remark || r.notes,
        createdAt: r.created_at,
      });
    }

    const { data: staffData } = await supabase
      .from('staff_attendance')
      .select('*, staff:staff(*, user:users(*))')
      .eq('school_id', schoolId)
      .eq('date', today)
      .order('created_at', { ascending: false });

    for (const r of staffData || []) {
      const staff = (r as any).staff;
      const user = staff?.user;
      records.push({
        id: r.id,
        personId: r.staff_id,
        personName: user?.name || `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || 'Personnel',
        personPhoto: user?.photo_url,
        personRole: staff?.position || staff?.role || 'Personnel',
        department: staff?.department || '',
        category: 'admin_staff',
        matricule: staff?.employee_code,
        date: r.date,
        checkInTime: r.check_in_time,
        checkOutTime: r.check_out_time,
        breakStart: r.break_start,
        breakEnd: r.break_end,
        repriseTime: r.reprise_time,
        serviceStart: r.service_start,
        status: (r.status || 'PRESENT') as StaffPointageStatus,
        method: (r.method || 'GPS') as StaffPointageMethod,
        latitude: r.latitude,
        longitude: r.longitude,
        distanceMeters: null,
        qrVerified: r.qr_verified || false,
        lateMinutes: r.late_minutes || 0,
        totalWorkMinutes: r.total_work_minutes || 0,
        breakMinutes: r.break_minutes || 0,
        overtimeMinutes: r.overtime_minutes || 0,
        notes: r.notes,
        createdAt: r.created_at,
      });
    }

    return records.sort((a, b) => {
      const timeA = a.checkInTime || a.createdAt;
      const timeB = b.checkInTime || b.createdAt;
      return new Date(timeB).getTime() - new Date(timeA).getTime();
    });
  },

  async getDashboardStats(): Promise<StaffDashboardStats> {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];

    const [teachersAtt, staffAtt, totalTeachers, totalStaff, schoolInfo] = await Promise.all([
      supabase.from('teacher_attendance').select('status, late_minutes, check_in_time, check_out_time, method, teacher_id, teacher:teachers(*, user:users!teachers_user_id_fkey(*))').eq('school_id', schoolId).eq('date', today),
      supabase.from('staff_attendance').select('status, late_minutes, total_work_minutes, break_minutes, overtime_minutes, check_in_time, check_out_time, method, staff_id, staff:staff(*, user:users(*))').eq('school_id', schoolId).eq('date', today),
      supabase.from('teachers').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
      supabase.from('staff').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
      supabase.from('schools').select('timezone').eq('id', schoolId).single(),
    ]);

    const tData = teachersAtt.data || [];
    const sData = staffAtt.data || [];

    const teachersPresent = tData.filter((r: any) => r.status === 'PRESENT').length;
    const teachersLate = tData.filter((r: any) => r.status === 'LATE').length;
    const staffPresent = sData.filter((r: any) => r.status === 'PRESENT').length;
    const staffLate = sData.filter((r: any) => r.status === 'LATE').length;
    const staffOnBreak = sData.filter((r: any) => r.status === 'ON_BREAK').length;
    const staffDeparted = sData.filter((r: any) => r.status === 'DEPARTED').length;

    const totalT = totalTeachers.count || 0;
    const totalS = totalStaff.count || 0;
    const totalPersonnel = totalT + totalS;
    const totalPresent = teachersPresent + teachersLate + staffPresent + staffLate;
    const totalAbsent = totalPersonnel - totalPresent - staffOnBreak - staffDeparted;
    const totalLate = teachersLate + staffLate;
    const totalOnBreak = staffOnBreak;
    const totalDeparted = staffDeparted;
    const notCheckedIn = totalAbsent;
    const attendanceRate = totalPersonnel > 0 ? Math.round((totalPresent / totalPersonnel) * 100) : 0;
    const lateRate = totalPresent > 0 ? Math.round((totalLate / totalPresent) * 100) : 0;
    const punctualityRate = totalPresent > 0 ? Math.round(((totalPresent - totalLate) / totalPresent) * 100) : 0;

    const workMinutes = sData.reduce((sum: number, r: any) => sum + (r.total_work_minutes || 0), 0);
    const avgWorkMinutes = sData.length > 0 ? Math.round(workMinutes / sData.length) : 0;
    const totalOvertime = sData.reduce((sum: number, r: any) => sum + (r.overtime_minutes || 0), 0);

    // Build activity feed
    const activityFeed: ActivityEvent[] = [];

    for (const r of tData) {
      const teacher = (r as any).teacher;
      const user = teacher?.user;
      const name = user?.name || 'Enseignant';
      const photo = user?.photo_url;
      const role = 'Enseignant';

      if (r.check_in_time) {
        activityFeed.push({
          id: `${r.id}-in`,
          personName: name,
          personPhoto: photo,
          personRole: role,
          category: 'teacher',
          action: r.status === 'LATE' ? 'LATE' : 'ARRIVAL',
          time: r.check_in_time,
          method: (r.method || 'GPS') as StaffPointageMethod,
          lateMinutes: r.late_minutes || 0,
        });
      }
      if (r.check_out_time) {
        activityFeed.push({
          id: `${r.id}-out`,
          personName: name,
          personPhoto: photo,
          personRole: role,
          category: 'teacher',
          action: 'DEPARTURE',
          time: r.check_out_time,
          method: (r.method || 'GPS') as StaffPointageMethod,
        });
      }
    }

    for (const r of sData) {
      const staff = (r as any).staff;
      const user = staff?.user;
      const name = user?.name || 'Personnel';
      const photo = user?.photo_url;
      const role = staff?.position || 'Personnel';

      if (r.check_in_time) {
        activityFeed.push({
          id: `${r.id}-in`,
          personName: name,
          personPhoto: photo,
          personRole: role,
          category: 'admin_staff',
          action: r.status === 'LATE' ? 'LATE' : 'ARRIVAL',
          time: r.check_in_time,
          method: (r.method || 'GPS') as StaffPointageMethod,
          lateMinutes: r.late_minutes || 0,
        });
      }
      if (r.break_start) {
        activityFeed.push({
          id: `${r.id}-break`,
          personName: name,
          personPhoto: photo,
          personRole: role,
          category: 'admin_staff',
          action: 'BREAK_START',
          time: r.break_start,
          method: 'MANUAL',
        });
      }
      if (r.break_end) {
        activityFeed.push({
          id: `${r.id}-resume`,
          personName: name,
          personPhoto: photo,
          personRole: role,
          category: 'admin_staff',
          action: 'BREAK_END',
          time: r.break_end,
          method: 'MANUAL',
        });
      }
      if (r.check_out_time) {
        activityFeed.push({
          id: `${r.id}-out`,
          personName: name,
          personPhoto: photo,
          personRole: role,
          category: 'admin_staff',
          action: 'DEPARTURE',
          time: r.check_out_time,
          method: (r.method || 'GPS') as StaffPointageMethod,
        });
      }
    }

    activityFeed.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

    // Weekly data (last 7 days)
    const weeklyData: { day: string; present: number; absent: number; late: number }[] = [];
    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];

      const { data: weekTeachers } = await supabase
        .from('teacher_attendance')
        .select('status')
        .eq('school_id', schoolId)
        .eq('date', dateStr);

      const { data: weekStaff } = await supabase
        .from('staff_attendance')
        .select('status')
        .eq('school_id', schoolId)
        .eq('date', dateStr);

      const allWeek = [...(weekTeachers || []), ...(weekStaff || [])];
      const present = allWeek.filter((r: any) => r.status === 'PRESENT').length;
      const late = allWeek.filter((r: any) => r.status === 'LATE').length;
      const absent = totalPersonnel - present - late;

      weeklyData.push({
        day: dayNames[d.getDay()],
        present: present + late,
        absent: Math.max(0, absent),
        late,
      });
    }

    // Department stats
    const deptMap = new Map<string, { total: number; present: number }>();
    for (const r of sData) {
      const staff = (r as any).staff;
      const dept = staff?.department || 'Général';
      if (!deptMap.has(dept)) deptMap.set(dept, { total: 0, present: 0 });
      const entry = deptMap.get(dept)!;
      entry.total++;
      if (r.status === 'PRESENT' || r.status === 'LATE' || r.status === 'ON_BREAK') entry.present++;
    }
    const departmentStats = Array.from(deptMap.entries()).map(([department, v]) => ({
      department,
      total: v.total,
      present: v.present,
      rate: v.total > 0 ? Math.round((v.present / v.total) * 100) : 0,
    }));

    return {
      totalTeachers: totalT,
      teachersPresent,
      teachersAbsent: totalT - teachersPresent - teachersLate,
      teachersLate,
      totalStaff: totalS,
      staffPresent,
      staffAbsent: totalS - staffPresent - staffLate - staffOnBreak - staffDeparted,
      staffLate,
      staffOnBreak,
      staffDeparted,
      totalPersonnel,
      totalPresent,
      totalAbsent,
      totalLate,
      totalOnBreak,
      totalDeparted,
      notCheckedIn,
      attendanceRate,
      lateRate,
      avgWorkMinutes,
      totalOvertime,
      punctualityRate,
      lastActivity: activityFeed[0] || undefined,
      activityFeed: activityFeed.slice(0, 20),
      weeklyData,
      departmentStats,
    };
  },

  async scanQR(code: string, action: 'ARRIVAL' | 'DEPARTURE' = 'ARRIVAL') {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];

    // PRIMARY: Look up by qr_codes table (unified system)
    let teacher: any = null;
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
        .from('teachers')
        .select('*, user:users!teachers_user_id_fkey(*)')
        .eq('user_id', qrRecord.user_id)
        .eq('school_id', schoolId)
        .single();
      teacher = data;
    }

    // FALLBACK: Teacher badge lookup (scoped to school!)
    if (!teacher) {
      const { data: badge } = await supabase
        .from('teacher_badges')
        .select('*, teacher:teachers(*, user:users!teachers_user_id_fkey(*))')
        .eq('badge_code', code)
        .single();

      if (badge?.teacher && (badge as any).teacher.school_id === schoolId) {
        teacher = (badge as any).teacher;
      }
    }

    if (teacher) {
      // Update QR scan count if we have a qr record
      if (qrRecord) {
        await supabase.from('qr_codes').update({ last_scanned_at: new Date().toISOString() }).eq('user_id', qrRecord.user_id).eq('school_id', schoolId);
      }

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

      const user = teacher.user;
      return {
        success: true,
        message: action === 'DEPARTURE' ? 'Départ enseignant enregistré' : 'Arrivée enseignant enregistrée',
        person: { name: user?.name || 'Enseignant', role: 'Enseignant', photo: user?.photo_url },
        category: 'teacher' as const,
      };
    }

    const { data: staffUser } = await supabase
      .from('staff')
      .select('*, user:users(*)')
      .eq('employee_code', code)
      .eq('school_id', schoolId)
      .single();

    if (staffUser) {
      const { data, error } = await supabase
        .from('staff_attendance')
        .upsert({
          staff_id: staffUser.id,
          user_id: staffUser.user_id,
          school_id: schoolId,
          date: today,
          check_in_time: action === 'DEPARTURE' ? null : new Date().toISOString(),
          check_out_time: action === 'DEPARTURE' ? new Date().toISOString() : null,
          status: action === 'DEPARTURE' ? 'DEPARTED' : 'PRESENT',
          method: 'QR',
          recorded_by_type: 'QR_SCAN',
        }, { onConflict: 'staff_id,date' })
        .select()
        .single();
      if (error) throw error;

      const user = (staffUser as any).user;
      return {
        success: true,
        message: action === 'DEPARTURE' ? 'Départ personnel enregistré' : 'Arrivée personnel enregistré',
        person: { name: user?.name || 'Personnel', role: staffUser.position || 'Personnel', photo: user?.photo_url },
        category: 'admin_staff' as const,
      };
    }

    return { success: false, message: 'QR Code non reconnu pour le personnel' };
  },

  async getHistory(filters?: { startDate?: string; endDate?: string; category?: StaffCategory; status?: string; search?: string }) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();

    let query = supabase
      .from('teacher_attendance')
      .select('*, teacher:teachers(*, user:users!teachers_user_id_fkey(*))')
      .eq('school_id', schoolId);

    if (filters?.startDate) query = query.gte('date', filters.startDate);
    if (filters?.endDate) query = query.lte('date', filters.endDate);
    if (filters?.status) query = query.eq('status', filters.status);

    const { data: teacherData, error: tErr } = await query.order('created_at', { ascending: false }).limit(300);
    if (tErr) throw tErr;

    let staffQuery = supabase
      .from('staff_attendance')
      .select('*, staff:staff(*, user:users(*))')
      .eq('school_id', schoolId);

    if (filters?.startDate) staffQuery = staffQuery.gte('date', filters.startDate);
    if (filters?.endDate) staffQuery = staffQuery.lte('date', filters.endDate);
    if (filters?.status) staffQuery = staffQuery.eq('status', filters.status);

    const { data: staffData, error: sErr } = await staffQuery.order('created_at', { ascending: false }).limit(300);
    if (sErr) throw sErr;

    const records: StaffPointageRecord[] = [];

    for (const r of teacherData || []) {
      const teacher = (r as any).teacher;
      const user = teacher?.user;
      const checkIn = r.check_in_time ? new Date(r.check_in_time) : null;
      const checkOut = r.check_out_time ? new Date(r.check_out_time) : null;
      const workMins = checkIn && checkOut ? Math.floor((checkOut.getTime() - checkIn.getTime()) / 60000) : 0;

      records.push({
        id: r.id,
        personId: r.teacher_id,
        personName: user?.name || 'Enseignant',
        personPhoto: user?.photo_url,
        personRole: 'Enseignant',
        category: 'teacher',
        matricule: teacher?.employee_code,
        date: r.date,
        checkInTime: r.check_in_time,
        checkOutTime: r.check_out_time,
        breakStart: null,
        breakEnd: null,
        repriseTime: null,
        serviceStart: null,
        status: (r.status || 'PRESENT') as StaffPointageStatus,
        method: (r.method || 'GPS') as StaffPointageMethod,
        latitude: r.gps_latitude || r.latitude,
        longitude: r.gps_longitude || r.longitude,
        distanceMeters: r.distance_meters,
        qrVerified: r.qr_verified || false,
        lateMinutes: r.late_minutes || 0,
        totalWorkMinutes: workMins,
        breakMinutes: 0,
        overtimeMinutes: workMins > 480 ? workMins - 480 : 0,
        notes: r.remark || r.notes,
        createdAt: r.created_at,
      });
    }

    for (const r of staffData || []) {
      const staff = (r as any).staff;
      const user = staff?.user;
      records.push({
        id: r.id,
        personId: r.staff_id,
        personName: user?.name || 'Personnel',
        personPhoto: user?.photo_url,
        personRole: staff?.position || 'Personnel',
        department: staff?.department || '',
        category: 'admin_staff',
        matricule: staff?.employee_code,
        date: r.date,
        checkInTime: r.check_in_time,
        checkOutTime: r.check_out_time,
        breakStart: r.break_start,
        breakEnd: r.break_end,
        repriseTime: r.reprise_time,
        serviceStart: r.service_start,
        status: (r.status || 'PRESENT') as StaffPointageStatus,
        method: (r.method || 'GPS') as StaffPointageMethod,
        latitude: r.latitude,
        longitude: r.longitude,
        distanceMeters: null,
        qrVerified: r.qr_verified || false,
        lateMinutes: r.late_minutes || 0,
        totalWorkMinutes: r.total_work_minutes || 0,
        breakMinutes: r.break_minutes || 0,
        overtimeMinutes: r.overtime_minutes || 0,
        notes: r.notes,
        createdAt: r.created_at,
      });
    }

    let filtered = records.sort((a, b) => {
      const timeA = a.checkInTime || a.createdAt;
      const timeB = b.checkInTime || b.createdAt;
      return new Date(timeB).getTime() - new Date(timeA).getTime();
    });

    if (filters?.category) {
      filtered = filtered.filter(r => r.category === filters.category);
    }
    if (filters?.search) {
      const s = filters.search.toLowerCase();
      filtered = filtered.filter(r =>
        r.personName.toLowerCase().includes(s) ||
        (r.matricule && r.matricule.toLowerCase().includes(s)) ||
        (r.personRole && r.personRole.toLowerCase().includes(s))
      );
    }

    return filtered;
  },

  async manualCheckInTeacher(teacherId: string, method: string = 'MANUAL') {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('teacher_attendance')
      .upsert({
        teacher_id: teacherId,
        school_id: schoolId,
        date: today,
        status: 'PRESENT',
        check_in_time: now,
        method,
      }, { onConflict: 'teacher_id,date' })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async manualCheckOutTeacher(teacherId: string) {
    const supabase = getSupabase();
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('teacher_attendance')
      .update({ check_out_time: new Date().toISOString() })
      .eq('teacher_id', teacherId)
      .eq('date', today)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async manualCheckInStaff(staffId: string, method: string = 'MANUAL') {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const today = new Date().toISOString().split('T')[0];

    const { data: staff } = await supabase
      .from('staff').select('school_id, user_id').eq('id', staffId).single();
    if (!staff) throw new Error('Personnel non trouvé');

    const { data, error } = await supabase
      .from('staff_attendance')
      .upsert({
        staff_id: staffId,
        user_id: staff.user_id,
        school_id: staff.school_id || schoolId,
        date: today,
        check_in_time: new Date().toISOString(),
        status: 'PRESENT',
        method,
        recorded_by_type: 'MANUAL',
      }, { onConflict: 'staff_id,date' })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async manualCheckOutStaff(staffId: string) {
    const supabase = getSupabase();
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('staff_attendance')
      .update({ check_out_time: new Date().toISOString(), status: 'DEPARTED' })
      .eq('staff_id', staffId)
      .eq('date', today)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
