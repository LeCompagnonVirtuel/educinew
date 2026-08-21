import type {
  Attendance, AttendanceFilters, AttendanceSummary, AttendanceStatistics,
  AttendanceRepositoryExtended,
} from '../types';
import { AttendanceNotFoundError, StudentNotFoundError } from '@educi/errors';
import { logger } from '@educi/logger';

export class StudentAttendanceService {
  constructor(private readonly attendanceRepo: AttendanceRepositoryExtended) {}

  async getByStudent(schoolId: string, studentId: string, filters?: AttendanceFilters): Promise<{ data: Attendance[]; total: number }> {
    const student = await this.attendanceRepo.findStudent(studentId);
    if (!student || student.schoolId !== schoolId) {
      throw new StudentNotFoundError(studentId);
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 20;

    const queryFilters: AttendanceFilters = {
      ...filters,
      studentId,
      page,
      limit,
    };

    if (filters?.startDate) {
      queryFilters.startDate = filters.startDate;
    }
    if (filters?.endDate) {
      queryFilters.endDate = filters.endDate;
    }
    if (filters?.classId) {
      queryFilters.classId = filters.classId;
    }
    if (filters?.status) {
      queryFilters.status = filters.status;
    }

    const result = await this.attendanceRepo.findAllAttendances(schoolId, queryFilters);
    logger.info('Student attendance retrieved', { schoolId, studentId, total: result.total }, 'attendance');
    return result;
  }

  async getByClass(schoolId: string, classId: string, date: string): Promise<Attendance[]> {
    const { data } = await this.attendanceRepo.findAllAttendances(schoolId, {
      classId,
      date,
      limit: 10000,
    });

    logger.info('Class attendance retrieved', { schoolId, classId, date, count: data.length }, 'attendance');
    return data;
  }

  async getByDate(schoolId: string, date: string, filters?: AttendanceFilters): Promise<{ data: Attendance[]; total: number }> {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;

    const queryFilters: AttendanceFilters = {
      ...filters,
      date,
      page,
      limit,
    };

    if (filters?.classId) {
      queryFilters.classId = filters.classId;
    }
    if (filters?.status) {
      queryFilters.status = filters.status;
    }

    const result = await this.attendanceRepo.findAllAttendances(schoolId, queryFilters);
    logger.info('Attendance by date retrieved', { schoolId, date, total: result.total }, 'attendance');
    return result;
  }

  async getDailySummary(schoolId: string, classId: string, date: string): Promise<AttendanceSummary> {
    const counts = await this.attendanceRepo.countByClassAndDate(schoolId, classId, date);

    const summary: AttendanceSummary = {
      date,
      classId,
      total: counts.total,
      present: counts.present,
      absent: counts.absent,
      late: counts.late,
      attendanceRate: counts.total > 0 ? Math.round((counts.present / counts.total) * 100) : 0,
    };

    logger.info('Daily attendance summary', { schoolId, classId, date }, 'attendance');
    return summary;
  }

  async getWeeklySummary(schoolId: string, classId: string, startDate: string, endDate: string): Promise<AttendanceSummary[]> {
    const { data } = await this.attendanceRepo.findAllAttendances(schoolId, {
      classId,
      startDate,
      endDate,
      limit: 10000,
    });

    const byDateMap = new Map<string, { total: number; present: number; absent: number; late: number }>();

    for (const att of data) {
      const existing = byDateMap.get(att.date) || { total: 0, present: 0, absent: 0, late: 0 };
      existing.total++;
      if (att.status === 'PRESENT') existing.present++;
      else if (att.status === 'ABSENT') existing.absent++;
      else if (att.status === 'LATE') existing.late++;
      byDateMap.set(att.date, existing);
    }

    const summaries: AttendanceSummary[] = Array.from(byDateMap.entries())
      .map(([date, counts]) => ({
        date,
        classId,
        total: counts.total,
        present: counts.present,
        absent: counts.absent,
        late: counts.late,
        attendanceRate: counts.total > 0 ? Math.round((counts.present / counts.total) * 100) : 0,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    logger.info('Weekly attendance summary', { schoolId, classId, startDate, endDate }, 'attendance');
    return summaries;
  }

  async getMonthlySummary(schoolId: string, classId: string, year: number, month: number): Promise<AttendanceSummary[]> {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

    return this.getWeeklySummary(schoolId, classId, startDate, endDate);
  }
}
