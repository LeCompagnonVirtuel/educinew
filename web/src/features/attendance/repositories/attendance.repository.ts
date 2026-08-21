import type {
  Attendance, TeacherAttendance, AttendanceRecord, AttendanceSession,
  AttendanceSummary, AttendanceStatistics, AttendanceDashboard, AttendanceTimeline,
  AttendanceReport, AttendanceAlert, AttendanceNotification, AttendanceImport,
  AttendanceExport, AttendanceHistory, AttendanceCorrection, AttendanceJustification,
  AttendanceDevice, AttendanceLocation, AttendanceSync, AttendanceQR, AttendanceSettings,
  AttendancePolicy, AttendanceAudit, AttendanceFilters, AttendanceAnalytics,
  CreateAttendanceRequest, UpdateAttendanceRequest, CreateTeacherAttendanceRequest,
  CreateSessionRequest, AttendanceReportRequest,
} from '../types';
import { logger } from '@educi/logger';
import type { SupabaseClient } from '@supabase/supabase-js';

export class SupabaseAttendanceRepository {
  private readonly supabase: SupabaseClient;
  constructor(supabase: SupabaseClient) { this.supabase = supabase; }

  async findAttendance(id: string): Promise<Attendance | null> {
    const { data, error } = await this.supabase.from('attendances').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllAttendance(schoolId: string, filters: AttendanceFilters): Promise<{ data: Attendance[]; total: number }> {
    const page = filters.page || 1; const limit = filters.limit || 20; const offset = (page - 1) * limit;
    let query = this.supabase.from('attendances').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (filters.studentId) query = query.eq('student_id', filters.studentId);
    if (filters.classId) query = query.eq('class_id', filters.classId);
    if (filters.academicYearId) query = query.eq('academic_year_id', filters.academicYearId);
    if (filters.date) query = query.eq('date', filters.date);
    if (filters.dateFrom) query = query.gte('date', filters.dateFrom);
    if (filters.dateTo) query = query.lte('date', filters.dateTo);
    if (filters.status) query = query.eq('status', filters.status);
    if (filters.method) query = query.eq('method', filters.method);
    if (filters.period) query = query.eq('period', filters.period);
    query = query.order(filters.sortBy || 'date', { ascending: filters.sortOrder === 'asc' }).range(offset, offset + limit - 1);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createAttendance(data: CreateAttendanceRequest, schoolId: string, recordedBy: string): Promise<Attendance> {
    const { data: result, error } = await this.supabase.from('attendances').insert({
      school_id: schoolId, student_id: data.studentId, class_id: data.classId,
      academic_year_id: data.academicYearId, date: data.date, status: data.status,
      method: data.method || 'MANUAL', reason: data.reason, reason_note: data.reasonNote,
      period: data.period || 'FULL_DAY', check_in_time: data.checkInTime,
      late_minutes: data.lateMinutes, notes: data.notes, recorded_by: recordedBy,
      is_late: data.status === 'LATE', is_excused: data.status === 'EXCUSED',
      source: 'MANUAL',
    }).select().single();
    if (error) throw error;
    return result;
  }

  async updateAttendance(id: string, data: UpdateAttendanceRequest): Promise<Attendance> {
    const u: Record<string, unknown> = {};
    if (data.status !== undefined) { u.status = data.status; u.is_late = data.status === 'LATE'; u.is_excused = data.status === 'EXCUSED'; }
    if (data.reason !== undefined) u.reason = data.reason;
    if (data.reasonNote !== undefined) u.reason_note = data.reasonNote;
    if (data.checkInTime !== undefined) u.check_in_time = data.checkInTime;
    if (data.checkOutTime !== undefined) u.check_out_time = data.checkOutTime;
    if (data.lateMinutes !== undefined) u.late_minutes = data.lateMinutes;
    if (data.notes !== undefined) u.notes = data.notes;
    u.updated_at = new Date().toISOString();
    const { data: result, error } = await this.supabase.from('attendances').update(u).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async deleteAttendance(id: string): Promise<void> {
    const { error } = await this.supabase.from('attendances').delete().eq('id', id);
    if (error) throw error;
  }

  async bulkCreateAttendance(records: Array<CreateAttendanceRequest & { recordedBy: string }>, schoolId: string): Promise<Attendance[]> {
    const insertData = records.map(r => ({
      school_id: schoolId, student_id: r.studentId, class_id: r.classId,
      academic_year_id: r.academicYearId, date: r.date, status: r.status,
      method: r.method || 'MANUAL', reason: r.reason, reason_note: r.reasonNote,
      period: r.period || 'FULL_DAY', check_in_time: r.checkInTime,
      late_minutes: r.lateMinutes, notes: r.notes, recorded_by: r.recordedBy,
      is_late: r.status === 'LATE', is_excused: r.status === 'EXCUSED', source: 'MANUAL',
    }));
    const { data, error } = await this.supabase.from('attendances').insert(insertData).select();
    if (error) throw error;
    return data || [];
  }

  async findTeacherAttendance(id: string): Promise<TeacherAttendance | null> {
    const { data, error } = await this.supabase.from('teacher_attendances').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllTeacherAttendance(schoolId: string, filters: AttendanceFilters): Promise<{ data: TeacherAttendance[]; total: number }> {
    const page = filters.page || 1; const limit = filters.limit || 20; const offset = (page - 1) * limit;
    let query = this.supabase.from('teacher_attendances').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (filters.teacherId) query = query.eq('teacher_id', filters.teacherId);
    if (filters.date) query = query.eq('date', filters.date);
    if (filters.dateFrom) query = query.gte('date', filters.dateFrom);
    if (filters.dateTo) query = query.lte('date', filters.dateTo);
    if (filters.status) query = query.eq('status', filters.status);
    query = query.order('date', { ascending: false }).range(offset, offset + limit - 1);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createTeacherAttendance(data: CreateTeacherAttendanceRequest, schoolId: string, recordedBy: string): Promise<TeacherAttendance> {
    const { data: result, error } = await this.supabase.from('teacher_attendances').insert({
      school_id: schoolId, teacher_id: data.teacherId, date: data.date, status: data.status,
      method: data.method || 'MANUAL', reason: data.reason, reason_note: data.reasonNote,
      period: data.period || 'FULL_DAY', check_in_time: data.checkInTime,
      late_minutes: data.lateMinutes, notes: data.notes, recorded_by: recordedBy,
      is_late: data.status === 'LATE', source: 'MANUAL',
    }).select().single();
    if (error) throw error;
    return result;
  }

  async updateTeacherAttendance(id: string, data: Partial<TeacherAttendance>): Promise<TeacherAttendance> {
    const u: Record<string, unknown> = {};
    if (data.status !== undefined) { u.status = data.status; u.is_late = data.status === 'LATE'; }
    if (data.reason !== undefined) u.reason = data.reason;
    if (data.checkInTime !== undefined) u.check_in_time = data.checkInTime;
    if (data.checkOutTime !== undefined) u.check_out_time = data.checkOutTime;
    if (data.notes !== undefined) u.notes = data.notes;
    u.updated_at = new Date().toISOString();
    const { data: result, error } = await this.supabase.from('teacher_attendances').update(u).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async findSession(id: string): Promise<AttendanceSession | null> {
    const { data, error } = await this.supabase.from('attendance_sessions').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllSessions(schoolId: string, filters: AttendanceFilters): Promise<{ data: AttendanceSession[]; total: number }> {
    const page = filters.page || 1; const limit = filters.limit || 20; const offset = (page - 1) * limit;
    let query = this.supabase.from('attendance_sessions').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (filters.classId) query = query.eq('class_id', filters.classId);
    if (filters.teacherId) query = query.eq('teacher_id', filters.teacherId);
    if (filters.date) query = query.eq('date', filters.date);
    if (filters.dateFrom) query = query.gte('date', filters.dateFrom);
    if (filters.dateTo) query = query.lte('date', filters.dateTo);
    query = query.order('date', { ascending: false }).range(offset, offset + limit - 1);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createSession(data: CreateSessionRequest, schoolId: string, createdBy: string): Promise<AttendanceSession> {
    const { count } = await this.supabase.from('students').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('class_id', data.classId).eq('status', 'ACTIVE');
    const { data: result, error } = await this.supabase.from('attendance_sessions').insert({
      school_id: schoolId, class_id: data.classId, teacher_id: data.teacherId,
      subject_id: data.subjectId, academic_year_id: data.academicYearId, date: data.date,
      period: data.period, status: 'ACTIVE', start_time: data.startTime,
      total_students: count || 0, present_count: 0, absent_count: count || 0,
      late_count: 0, excused_count: 0, attendance_rate: 0,
      qr_enabled: data.qrEnabled ?? false, gps_enabled: data.gpsEnabled ?? false,
      nfc_enabled: data.nfcEnabled ?? false, face_enabled: data.faceEnabled ?? false,
      created_by: createdBy, notes: data.notes,
    }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSession(id: string, data: Partial<AttendanceSession>): Promise<AttendanceSession> {
    const u: Record<string, unknown> = {};
    if (data.status !== undefined) u.status = data.status;
    if (data.presentCount !== undefined) u.present_count = data.presentCount;
    if (data.absentCount !== undefined) u.absent_count = data.absentCount;
    if (data.lateCount !== undefined) u.late_count = data.lateCount;
    if (data.excusedCount !== undefined) u.excused_count = data.excusedCount;
    if (data.attendanceRate !== undefined) u.attendance_rate = data.attendanceRate;
    if (data.notes !== undefined) u.notes = data.notes;
    u.updated_at = new Date().toISOString();
    const { data: result, error } = await this.supabase.from('attendance_sessions').update(u).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async completeSession(id: string, completedBy: string): Promise<void> {
    const { error } = await this.supabase.from('attendance_sessions').update({ status: 'COMPLETED', completed_by: completedBy, completed_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', id);
    if (error) throw error;
  }

  async cancelSession(id: string): Promise<void> {
    const { error } = await this.supabase.from('attendance_sessions').update({ status: 'CANCELLED', updated_at: new Date().toISOString() }).eq('id', id);
    if (error) throw error;
  }

  async findRecord(id: string): Promise<AttendanceRecord | null> {
    const { data, error } = await this.supabase.from('attendance_records').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findRecordsBySession(sessionId: string): Promise<AttendanceRecord[]> {
    const { data, error } = await this.supabase.from('attendance_records').select('*').eq('session_id', sessionId);
    if (error) throw error;
    return data || [];
  }

  async createRecord(data: Omit<AttendanceRecord, 'id' | 'createdAt'>): Promise<AttendanceRecord> {
    const { data: result, error } = await this.supabase.from('attendance_records').insert({
      school_id: data.schoolId, session_id: data.sessionId, student_id: data.studentId,
      class_id: data.classId, status: data.status, method: data.method,
      recorded_by: data.recordedBy, check_in_time: data.checkInTime,
      late_minutes: data.lateMinutes, notes: data.notes,
    }).select().single();
    if (error) throw error;
    return result;
  }

  async updateRecord(id: string, data: Partial<AttendanceRecord>): Promise<AttendanceRecord> {
    const u: Record<string, unknown> = {};
    if (data.status !== undefined) u.status = data.status;
    if (data.method !== undefined) u.method = data.method;
    if (data.checkInTime !== undefined) u.check_in_time = data.checkInTime;
    if (data.checkOutTime !== undefined) u.check_out_time = data.checkOutTime;
    if (data.lateMinutes !== undefined) u.late_minutes = data.lateMinutes;
    if (data.notes !== undefined) u.notes = data.notes;
    const { data: result, error } = await this.supabase.from('attendance_records').update(u).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async findJustification(id: string): Promise<AttendanceJustification | null> {
    const { data, error } = await this.supabase.from('attendance_justifications').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllJustifications(schoolId: string, filters: AttendanceFilters): Promise<{ data: AttendanceJustification[]; total: number }> {
    const page = filters.page || 1; const limit = filters.limit || 20; const offset = (page - 1) * limit;
    let query = this.supabase.from('attendance_justifications').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (filters.studentId) query = query.eq('student_id', filters.studentId);
    if (filters.status) query = query.eq('status', filters.status);
    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createJustification(data: Omit<AttendanceJustification, 'id' | 'createdAt' | 'updatedAt'>): Promise<AttendanceJustification> {
    const { data: result, error } = await this.supabase.from('attendance_justifications').insert({
      school_id: data.schoolId, student_id: data.studentId, attendance_id: data.attendanceId,
      reason: data.reason, description: data.description, document_url: data.documentUrl,
      start_date: data.startDate, end_date: data.endDate, status: 'PENDING',
    }).select().single();
    if (error) throw error;
    return result;
  }

  async updateJustification(id: string, data: Partial<AttendanceJustification>): Promise<AttendanceJustification> {
    const u: Record<string, unknown> = {};
    if (data.status !== undefined) u.status = data.status;
    if (data.reviewedBy !== undefined) u.reviewed_by = data.reviewedBy;
    if (data.reviewedAt !== undefined) u.reviewed_at = data.reviewedAt;
    if (data.reviewNote !== undefined) u.review_note = data.reviewNote;
    u.updated_at = new Date().toISOString();
    const { data: result, error } = await this.supabase.from('attendance_justifications').update(u).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async findCorrection(id: string): Promise<AttendanceCorrection | null> {
    const { data, error } = await this.supabase.from('attendance_corrections').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllCorrections(schoolId: string, filters: AttendanceFilters): Promise<{ data: AttendanceCorrection[]; total: number }> {
    const page = filters.page || 1; const limit = filters.limit || 20; const offset = (page - 1) * limit;
    let query = this.supabase.from('attendance_corrections').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (filters.status) query = query.eq('status', filters.status);
    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createCorrection(data: Omit<AttendanceCorrection, 'id' | 'createdAt'>): Promise<AttendanceCorrection> {
    const { data: result, error } = await this.supabase.from('attendance_corrections').insert({
      school_id: data.schoolId, attendance_id: data.attendanceId,
      original_status: data.originalStatus, new_status: data.newStatus,
      reason: data.reason, corrected_by: data.correctedBy, status: 'PENDING',
    }).select().single();
    if (error) throw error;
    return result;
  }

  async updateCorrection(id: string, data: Partial<AttendanceCorrection>): Promise<AttendanceCorrection> {
    const u: Record<string, unknown> = {};
    if (data.status !== undefined) u.status = data.status;
    if (data.approvedBy !== undefined) u.approved_by = data.approvedBy;
    if (data.approvedAt !== undefined) u.approved_at = data.approvedAt;
    const { data: result, error } = await this.supabase.from('attendance_corrections').update(u).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async findAlerts(schoolId: string, filters?: AttendanceFilters): Promise<AttendanceAlert[]> {
    let query = this.supabase.from('attendance_alerts').select('*').eq('school_id', schoolId).eq('resolved', false);
    if (filters?.status) query = query.eq('severity', filters.status);
    query = query.order('created_at', { ascending: false }).limit(50);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createAlert(data: Omit<AttendanceAlert, 'id' | 'createdAt'>): Promise<AttendanceAlert> {
    const { data: result, error } = await this.supabase.from('attendance_alerts').insert({
      school_id: data.schoolId, alert_type: data.alertType, severity: data.severity,
      title: data.title, message: data.message, target_type: data.targetType,
      target_id: data.targetId, resolved: false,
    }).select().single();
    if (error) throw error;
    return result;
  }

  async resolveAlert(id: string, resolvedBy: string): Promise<void> {
    const { error } = await this.supabase.from('attendance_alerts').update({ resolved: true, resolved_by: resolvedBy, resolved_at: new Date().toISOString() }).eq('id', id);
    if (error) throw error;
  }

  async findNotifications(schoolId: string, recipientId: string): Promise<AttendanceNotification[]> {
    const { data, error } = await this.supabase.from('attendance_notifications').select('*').eq('school_id', schoolId).eq('recipient_id', recipientId).order('created_at', { ascending: false }).limit(50);
    if (error) throw error;
    return data || [];
  }

  async createNotification(data: Omit<AttendanceNotification, 'id' | 'createdAt'>): Promise<AttendanceNotification> {
    const { data: result, error } = await this.supabase.from('attendance_notifications').insert({
      school_id: data.schoolId, notification_type: data.notificationType,
      recipient_type: data.recipientType, recipient_id: data.recipientId,
      channel: data.channel, title: data.title, message: data.message, sent: false, read: false,
    }).select().single();
    if (error) throw error;
    return result;
  }

  async markNotificationRead(id: string): Promise<void> {
    const { error } = await this.supabase.from('attendance_notifications').update({ read: true, read_at: new Date().toISOString() }).eq('id', id);
    if (error) throw error;
  }

  async getStatistics(schoolId: string, academicYearId: string, date?: string): Promise<AttendanceStatistics> {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const [students, teachers, attendances, teacherAttendances] = await Promise.all([
      this.supabase.from('students').select('id', { count: 'exact' }).eq('school_id', schoolId).eq('status', 'ACTIVE'),
      this.supabase.from('teachers').select('id', { count: 'exact' }).eq('school_id', schoolId).eq('status', 'ACTIVE'),
      this.supabase.from('attendances').select('status,class_id').eq('school_id', schoolId).eq('date', targetDate),
      this.supabase.from('teacher_attendances').select('status').eq('school_id', schoolId).eq('date', targetDate),
    ]);
    const totalStudents = students.count || 0;
    const totalTeachers = teachers.count || 0;
    const attData = attendances.data || [];
    const tAttData = teacherAttendances.data || [];
    const presentStudents = attData.filter((a: any) => ['PRESENT', 'LATE', 'EXCUSED', 'REMOTE'].includes(a.status)).length;
    const absentStudents = attData.filter((a: any) => a.status === 'ABSENT').length;
    const lateStudents = attData.filter((a: any) => a.status === 'LATE').length;
    const excusedStudents = attData.filter((a: any) => a.status === 'EXCUSED').length;
    const presentTeachers = tAttData.filter((a: any) => ['PRESENT', 'REMOTE'].includes(a.status)).length;
    const absentTeachers = tAttData.filter((a: any) => a.status === 'ABSENT').length;
    const lateTeachers = tAttData.filter((a: any) => a.status === 'LATE').length;
    return {
      schoolId, academicYearId, date: targetDate,
      totalStudents, presentStudents, absentStudents, lateStudents, excusedStudents,
      attendanceRate: totalStudents > 0 ? Math.round((presentStudents / totalStudents) * 100) : 0,
      punctualityRate: totalStudents > 0 ? Math.round(((totalStudents - lateStudents) / totalStudents) * 100) : 0,
      totalTeachers, presentTeachers, absentTeachers, lateTeachers,
      teacherAttendanceRate: totalTeachers > 0 ? Math.round((presentTeachers / totalTeachers) * 100) : 0,
      byClass: [], byLevel: [], byDay: [], byMonth: [],
      trends: { weekly: [], monthly: [], yearly: [] },
    };
  }

  async getDashboard(schoolId: string, date?: string): Promise<AttendanceDashboard> {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const stats = await this.getStatistics(schoolId, '', targetDate);
    return {
      schoolId, date: targetDate,
      presentToday: stats.presentStudents, absentToday: stats.absentStudents,
      lateToday: stats.lateStudents, excusedToday: stats.excusedStudents,
      attendanceRate: stats.attendanceRate, totalStudents: stats.totalStudents,
      totalTeachers: stats.totalTeachers, presentTeachers: stats.presentTeachers,
      absentTeachers: stats.absentTeachers, teacherAttendanceRate: stats.teacherAttendanceRate,
      mostAssiduousClass: { classId: '', className: '', rate: 100 },
      leastAssiduousClass: { classId: '', className: '', rate: 100 },
      atRiskStudents: [], absentTeachers: [],
      monthlyEvolution: [], weeklyHeatmap: [],
      alerts: [], recentActivity: [],
    };
  }

  async getSummary(schoolId: string, studentId: string, startDate: string, endDate: string): Promise<AttendanceSummary> {
    const { data } = await this.supabase.from('attendances').select('status,date').eq('school_id', schoolId).eq('student_id', studentId).gte('date', startDate).lte('date', endDate);
    const records = data || [];
    const totalDays = records.length;
    const presentDays = records.filter((r: any) => r.status === 'PRESENT').length;
    const absentDays = records.filter((r: any) => r.status === 'ABSENT').length;
    const lateDays = records.filter((r: any) => r.status === 'LATE').length;
    const excusedDays = records.filter((r: any) => r.status === 'EXCUSED').length;
    const sickDays = records.filter((r: any) => r.status === 'SICK').length;
    const permissionDays = records.filter((r: any) => r.status === 'PERMISSION').length;
    return {
      schoolId, studentId, academicYearId: '', startDate, endDate,
      totalDays, presentDays, absentDays, lateDays, excusedDays, sickDays, permissionDays,
      attendanceRate: totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0,
      punctualityRate: totalDays > 0 ? Math.round(((totalDays - lateDays) / totalDays) * 100) : 0,
      totalHoursPresent: presentDays * 8, totalHoursExpected: totalDays * 8,
      byMonth: [], byClass: [], bySubject: [],
    };
  }

  async getTimeline(schoolId: string, studentId?: string, teacherId?: string, page = 1, limit = 50): Promise<AttendanceTimeline> {
    const events: AttendanceTimeline['events'] = [];
    return { schoolId, studentId, teacherId, events, totalEvents: 0, page, limit };
  }

  async getAnalytics(schoolId: string, academicYearId: string, period: string): Promise<AttendanceAnalytics> {
    return {
      schoolId, academicYearId, period: period as any,
      metrics: { overallRate: 0, studentRate: 0, teacherRate: 0, punctualityRate: 0, improvementRate: 0 },
      trends: { attendance: [], punctuality: [], byClass: [], byLevel: [] },
      predictions: { atRiskStudents: [], dropoutRisk: [], improvementOpportunities: [] },
      recommendations: [],
    };
  }

  async generateReport(schoolId: string, request: AttendanceReportRequest): Promise<AttendanceReport> {
    const summary = await this.getSummary(schoolId, '', request.startDate, request.endDate);
    return {
      schoolId, reportType: request.reportType, startDate: request.startDate,
      endDate: request.endDate, classId: request.classId, levelId: request.levelId,
      studentId: request.studentId,
      data: { summary, details: [], statistics: await this.getStatistics(schoolId, ''), charts: [] },
      generatedAt: new Date().toISOString(), generatedBy: '',
    };
  }

  async getDailyReport(schoolId: string, date: string, classId?: string): Promise<AttendanceReport> {
    return this.generateReport(schoolId, { reportType: 'DAILY', startDate: date, endDate: date, classId });
  }

  async getMonthlyReport(schoolId: string, month: string, year: number, classId?: string): Promise<AttendanceReport> {
    const startDate = `${year}-${month}-01`;
    const endDate = `${year}-${month}-31`;
    return this.generateReport(schoolId, { reportType: 'MONTHLY', startDate, endDate, classId });
  }

  async search(schoolId: string, query: string, types?: string[], limit = 20): Promise<Array<{ id: string; name: string; type: string }>> {
    const results: Array<{ id: string; name: string; type: string }> = [];
    const searchTypes = types || ['STUDENT', 'TEACHER', 'CLASS'];
    if (searchTypes.includes('STUDENT')) {
      const { data } = await this.supabase.from('students').select('id,first_name,last_name').eq('school_id', schoolId).or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%`).limit(limit);
      (data || []).forEach((d: any) => results.push({ id: d.id, name: `${d.first_name} ${d.last_name}`, type: 'STUDENT' }));
    }
    if (searchTypes.includes('TEACHER')) {
      const { data } = await this.supabase.from('teachers').select('id,first_name,last_name').eq('school_id', schoolId).or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%`).limit(limit);
      (data || []).forEach((d: any) => results.push({ id: d.id, name: `${d.first_name} ${d.last_name}`, type: 'TEACHER' }));
    }
    if (searchTypes.includes('CLASS')) {
      const { data } = await this.supabase.from('school_classes').select('id,name').eq('school_id', schoolId).ilike('name', `%${query}%`).limit(limit);
      (data || []).forEach((d: any) => results.push({ id: d.id, name: d.name, type: 'CLASS' }));
    }
    return results.slice(0, limit);
  }

  async importAttendance(schoolId: string, data: Record<string, unknown>[], importType: string): Promise<AttendanceImport> {
    const { data: result } = await this.supabase.from('attendance_imports').insert({
      school_id: schoolId, import_type: importType, file_name: 'import',
      status: 'COMPLETED', total_rows: data.length, processed_rows: data.length,
      success_rows: data.length, error_rows: 0, imported_by: '',
    }).select().single();
    return result;
  }

  async exportAttendance(schoolId: string, filters: AttendanceFilters, format: string): Promise<AttendanceExport> {
    return { format: format as any, exportType: 'STUDENT_ATTENDANCE', filters, data: [], filename: 'export' };
  }

  async getHistory(schoolId: string, entityType: string, entityId: string): Promise<AttendanceHistory> {
    return { schoolId, entityType: entityType as any, entityId, records: [], totalRecords: 0 };
  }

  async getSettings(schoolId: string): Promise<AttendanceSettings> {
    const { data } = await this.supabase.from('attendance_settings').select('*').eq('school_id', schoolId).single();
    return data || { id: '', schoolId, qrEnabled: true, gpsEnabled: false, nfcEnabled: false, faceEnabled: false, gpsRadius: 100, qrExpiryMinutes: 5, autoMarkAbsentAfterMinutes: 30, allowLateJustification: true, lateThresholdMinutes: 15, notificationsEnabled: true, parentNotifications: true, smsEnabled: true, whatsappEnabled: false, pushEnabled: true, emailEnabled: true, consecutiveAbsenceThreshold: 3, lowAttendanceThreshold: 75, createdAt: '', updatedAt: '' };
  }

  async updateSettings(schoolId: string, data: Partial<AttendanceSettings>): Promise<AttendanceSettings> {
    const u: Record<string, unknown> = {};
    if (data.qrEnabled !== undefined) u.qr_enabled = data.qrEnabled;
    if (data.gpsEnabled !== undefined) u.gps_enabled = data.gpsEnabled;
    if (data.gpsRadius !== undefined) u.gps_radius = data.gpsRadius;
    u.updated_at = new Date().toISOString();
    const { data: result } = await this.supabase.from('attendance_settings').update(u).eq('school_id', schoolId).select().single();
    return result;
  }

  async getPolicies(schoolId: string): Promise<AttendancePolicy[]> {
    const { data } = await this.supabase.from('attendance_policies').select('*').eq('school_id', schoolId).eq('is_active', true);
    return data || [];
  }

  async createPolicy(data: Omit<AttendancePolicy, 'id' | 'createdAt' | 'updatedAt'>, schoolId: string): Promise<AttendancePolicy> {
    const { data: result } = await this.supabase.from('attendance_policies').insert({ ...data, school_id: schoolId }).select().single();
    return result;
  }

  async updatePolicy(id: string, data: Partial<AttendancePolicy>): Promise<AttendancePolicy> {
    const { data: result } = await this.supabase.from('attendance_policies').update(data).eq('id', id).select().single();
    return result;
  }

  async generateQRCode(sessionId: string, schoolId: string): Promise<AttendanceQR> {
    const code = Array.from({ length: 32 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    const { data: result } = await this.supabase.from('attendance_qr_codes').insert({
      school_id: schoolId, session_id: sessionId, code, expires_at: expiresAt,
      max_scans: 100, scan_count: 0, is_active: true,
    }).select().single();
    return result;
  }

  async validateQRCode(code: string, schoolId: string): Promise<boolean> {
    const { data } = await this.supabase.from('attendance_qr_codes').select('*').eq('code', code).eq('school_id', schoolId).eq('is_active', true).single();
    if (!data) return false;
    if (new Date(data.expires_at) < new Date()) return false;
    if (data.scan_count >= data.max_scans) return false;
    await this.supabase.from('attendance_qr_codes').update({ scan_count: data.scan_count + 1 }).eq('id', data.id);
    return true;
  }

  async validateGPS(schoolId: string, studentId: string, latitude: number, longitude: number): Promise<boolean> {
    const { data: locations } = await this.supabase.from('attendance_locations').select('*').eq('school_id', schoolId).eq('is_active', true);
    if (!locations || locations.length === 0) return true;
    for (const loc of locations) {
      const distance = Math.sqrt(Math.pow((latitude - loc.latitude) * 111320, 2) + Math.pow((longitude - loc.longitude) * 111320 * Math.cos(loc.latitude * Math.PI / 180), 2));
      if (distance <= loc.radius) return true;
    }
    return false;
  }

  async validateFace(schoolId: string, studentId: string, photoData: string): Promise<boolean> {
    return true;
  }

  async validateNFC(schoolId: string, studentId: string, nfcTagId: string): Promise<boolean> {
    const { data } = await this.supabase.from('attendance_nfc_tags').select('*').eq('student_id', studentId).eq('nfc_tag_id', nfcTagId).single();
    return !!data;
  }

  async syncAttendance(schoolId: string, deviceId: string, records: Attendance[]): Promise<AttendanceSync> {
    const { data: result } = await this.supabase.from('attendance_syncs').insert({
      school_id: schoolId, device_id: deviceId, sync_type: 'INCREMENTAL',
      status: 'COMPLETED', records_count: records.length, synced_count: records.length,
      failed_count: 0, conflicts_count: 0,
    }).select().single();
    return result;
  }

  async getSyncStatus(schoolId: string, deviceId: string): Promise<AttendanceSync | null> {
    const { data } = await this.supabase.from('attendance_syncs').select('*').eq('school_id', schoolId).eq('device_id', deviceId).order('created_at', { ascending: false }).limit(1).single();
    return data;
  }

  async findDevices(schoolId: string): Promise<AttendanceDevice[]> {
    const { data } = await this.supabase.from('attendance_devices').select('*').eq('school_id', schoolId);
    return data || [];
  }

  async registerDevice(data: Omit<AttendanceDevice, 'id' | 'createdAt'>, schoolId: string): Promise<AttendanceDevice> {
    const { data: result } = await this.supabase.from('attendance_devices').insert({ ...data, school_id: schoolId }).select().single();
    return result;
  }

  async findLocations(schoolId: string): Promise<AttendanceLocation[]> {
    const { data } = await this.supabase.from('attendance_locations').select('*').eq('school_id', schoolId);
    return data || [];
  }

  async createLocation(data: Omit<AttendanceLocation, 'id' | 'createdAt'>, schoolId: string): Promise<AttendanceLocation> {
    const { data: result } = await this.supabase.from('attendance_locations').insert({ ...data, school_id: schoolId }).select().single();
    return result;
  }

  async logAudit(schoolId: string, userId: string, action: string, entityType: string, entityId: string, details?: Record<string, unknown>): Promise<void> {
    await this.supabase.from('attendance_audit_logs').insert({
      school_id: schoolId, user_id: userId, action, entity_type: entityType,
      entity_id: entityId, details,
    });
  }

  async getAuditLog(schoolId: string, filters?: AttendanceFilters): Promise<AttendanceAudit[]> {
    let query = this.supabase.from('attendance_audit_logs').select('*').eq('school_id', schoolId);
    query = query.order('created_at', { ascending: false }).limit(100);
    const { data } = await query;
    return data || [];
  }

  async countByClassAndDate(schoolId: string, classId: string, date: string): Promise<{ total: number; present: number; absent: number; late: number }> {
    const { data } = await this.supabase.from('attendances').select('status').eq('school_id', schoolId).eq('class_id', classId).eq('date', date);
    const records = data || [];
    return {
      total: records.length,
      present: records.filter((r: any) => r.status === 'PRESENT').length,
      absent: records.filter((r: any) => r.status === 'ABSENT').length,
      late: records.filter((r: any) => r.status === 'LATE').length,
    };
  }

  async countByTeacherAndDate(schoolId: string, teacherId: string, date: string): Promise<{ total: number; present: number; absent: number }> {
    const { data } = await this.supabase.from('teacher_attendances').select('status').eq('school_id', schoolId).eq('teacher_id', teacherId).eq('date', date);
    const records = data || [];
    return {
      total: records.length,
      present: records.filter((r: any) => r.status === 'PRESENT').length,
      absent: records.filter((r: any) => r.status === 'ABSENT').length,
    };
  }

  async findActiveSession(schoolId: string, classId: string): Promise<AttendanceSession | null> {
    const { data } = await this.supabase.from('attendance_sessions').select('*').eq('school_id', schoolId).eq('class_id', classId).eq('status', 'ACTIVE').limit(1).single();
    return data;
  }

  async getConsecutiveAbsences(schoolId: string, studentId: string): Promise<number> {
    const { data } = await this.supabase.from('attendances').select('status,date').eq('school_id', schoolId).eq('student_id', studentId).order('date', { ascending: false }).limit(30);
    let count = 0;
    for (const r of data || []) {
      if (r.status === 'ABSENT') count++;
      else break;
    }
    return count;
  }

  async getAttendanceRate(schoolId: string, studentId: string, startDate: string, endDate: string): Promise<number> {
    const { data } = await this.supabase.from('attendances').select('status').eq('school_id', schoolId).eq('student_id', studentId).gte('date', startDate).lte('date', endDate);
    const records = data || [];
    if (records.length === 0) return 0;
    const present = records.filter((r: any) => ['PRESENT', 'LATE', 'EXCUSED', 'REMOTE'].includes(r.status)).length;
    return Math.round((present / records.length) * 100);
  }

  async getTeacherAttendanceRate(schoolId: string, teacherId: string, startDate: string, endDate: string): Promise<number> {
    const { data } = await this.supabase.from('teacher_attendances').select('status').eq('school_id', schoolId).eq('teacher_id', teacherId).gte('date', startDate).lte('date', endDate);
    const records = data || [];
    if (records.length === 0) return 0;
    const present = records.filter((r: any) => ['PRESENT', 'REMOTE'].includes(r.status)).length;
    return Math.round((present / records.length) * 100);
  }
}
