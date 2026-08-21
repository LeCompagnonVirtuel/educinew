import type { Attendance, AttendanceFilters, AttendanceSession, AttendanceDashboard, AttendanceStatistics, AttendanceTimeline, AttendanceAlert, AttendanceCorrection, AttendanceReport } from '@educi/types';
import { AttendanceMobileRepository } from '../repositories/attendance.repository';

export class AttendanceMobileService {
  constructor(private readonly repo: AttendanceMobileRepository) {}

  async getAttendance(id: string): Promise<Attendance | null> {
    return this.repo.findById(id);
  }

  async getAttendances(filters: AttendanceFilters): Promise<{ data: Attendance[]; total: number }> {
    return this.repo.findAll(filters);
  }

  async createAttendance(data: Partial<Attendance>): Promise<Attendance> {
    return this.repo.create(data);
  }

  async updateAttendance(id: string, data: Partial<Attendance>): Promise<Attendance> {
    return this.repo.update(id, data);
  }

  async deleteAttendance(id: string): Promise<void> {
    return this.repo.delete(id);
  }

  async bulkCreate(records: Array<{ studentId: string; date: string; status: string; remark?: string }>): Promise<Attendance[]> {
    return this.repo.bulkCreate(records);
  }

  async createTeacherAttendance(data: { teacherId: string; date: string; status: string; periods?: number }): Promise<Attendance> {
    return this.repo.createTeacherAttendance(data);
  }

  async getTeacherAttendances(filters: AttendanceFilters): Promise<{ data: Attendance[]; total: number }> {
    return this.repo.findTeacherAttendances(filters);
  }

  async getSession(id: string): Promise<AttendanceSession | null> {
    return this.repo.getSession(id);
  }

  async getSessions(filters: AttendanceFilters): Promise<{ data: AttendanceSession[]; total: number }> {
    return this.repo.findSessions(filters);
  }

  async startSession(data: { classId: string; date: string; period?: string }): Promise<AttendanceSession> {
    return this.repo.startSession(data);
  }

  async endSession(id: string): Promise<AttendanceSession> {
    return this.repo.endSession(id);
  }

  async getDashboard(date?: string): Promise<AttendanceDashboard> {
    return this.repo.getDashboard(date);
  }

  async getStatistics(academicYearId: string): Promise<AttendanceStatistics> {
    return this.repo.getStatistics(academicYearId);
  }

  async getTimeline(studentId?: string): Promise<AttendanceTimeline> {
    return this.repo.getTimeline(studentId);
  }

  async search(query: string): Promise<Attendance[]> {
    return this.repo.search(query);
  }

  async generateReport(params: { reportType: string; startDate?: string; endDate?: string; classId?: string }): Promise<AttendanceReport> {
    return this.repo.generateReport(params);
  }

  async validateQR(sessionId: string, studentId: string): Promise<Attendance> {
    return this.repo.validateQR(sessionId, studentId);
  }

  async validateGPS(studentId: string, lat: number, lng: number): Promise<Attendance> {
    return this.repo.validateGPS(studentId, lat, lng);
  }

  async validateNFC(sessionId: string, deviceId: string): Promise<Attendance> {
    return this.repo.validateNFC(sessionId, deviceId);
  }

  async validateFace(studentId: string, imageUrl: string): Promise<Attendance> {
    return this.repo.validateFace(studentId, imageUrl);
  }

  async getAlerts(): Promise<AttendanceAlert[]> {
    return this.repo.getAlerts();
  }

  async createCorrection(data: { attendanceId: string; newStatus: string; reason: string }): Promise<AttendanceCorrection> {
    return this.repo.createCorrection(data);
  }

  async approveCorrection(id: string, reviewNote?: string): Promise<AttendanceCorrection> {
    return this.repo.approveCorrection(id, reviewNote);
  }

  async rejectCorrection(id: string, reviewNote?: string): Promise<AttendanceCorrection> {
    return this.repo.rejectCorrection(id, reviewNote);
  }

  async importAttendance(data: string, importType: string): Promise<{ imported: number; errors: Array<{ field: string; message: string }> }> {
    return this.repo.importAttendance(data, importType);
  }

  async exportAttendance(format: string, filters: AttendanceFilters): Promise<{ url: string }> {
    return this.repo.exportAttendance(format, filters);
  }

  async getHistory(studentId?: string): Promise<Attendance[]> {
    return this.repo.getHistory(studentId);
  }

  async getAnalytics(academicYearId: string): Promise<Record<string, unknown>> {
    return this.repo.getAnalytics(academicYearId);
  }

  async getAuditLog(): Promise<Record<string, unknown>[]> {
    return this.repo.getAuditLog();
  }
}
