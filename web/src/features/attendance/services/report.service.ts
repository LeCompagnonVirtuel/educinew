import type { AttendanceRepository, AttendanceReport, AttendanceReportRequest } from '../types';
import { logger } from '@educi/logger';

export class AttendanceReportService {
  constructor(private readonly repo: AttendanceRepository) {}

  async generateDaily(schoolId: string, date: string, classId?: string): Promise<AttendanceReport> {
    logger.info('Generating daily attendance report', { schoolId, date }, 'attendance');
    return this.repo.getDailyReport(schoolId, date, classId);
  }

  async generateWeekly(schoolId: string, startDate: string, classId?: string): Promise<AttendanceReport> {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    return this.repo.generateReport(schoolId, {
      reportType: 'WEEKLY', startDate, endDate: endDate.toISOString().split('T')[0], classId,
    });
  }

  async generateMonthly(schoolId: string, month: string, year: number, classId?: string): Promise<AttendanceReport> {
    return this.repo.getMonthlyReport(schoolId, month, year, classId);
  }

  async generateYearly(schoolId: string, year: number, classId?: string): Promise<AttendanceReport> {
    return this.repo.generateReport(schoolId, {
      reportType: 'YEARLY', startDate: `${year}-01-01`, endDate: `${year}-12-31`, classId,
    });
  }

  async generateCustom(schoolId: string, request: AttendanceReportRequest): Promise<AttendanceReport> {
    return this.repo.generateReport(schoolId, request);
  }

  async exportReport(report: AttendanceReport, format: string): Promise<string | object> {
    if (format === 'JSON') return report;
    return JSON.stringify(report, null, 2);
  }
}
