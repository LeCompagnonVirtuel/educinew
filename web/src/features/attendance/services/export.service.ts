import type { AttendanceRepository, AttendanceExport, AttendanceFilters } from '../types';
import { AttendanceExportError } from '@educi/errors';
import { logger } from '@educi/logger';
import { ATTENDANCE_EXPORT } from '@educi/config';

export class AttendanceExportService {
  constructor(private readonly repo: AttendanceRepository) {}

  async exportPDF(schoolId: string, filters: AttendanceFilters): Promise<AttendanceExport> {
    logger.info('Exporting attendance as PDF', { schoolId }, 'attendance');
    return this.repo.exportAttendance(schoolId, filters, 'PDF');
  }

  async exportExcel(schoolId: string, filters: AttendanceFilters): Promise<AttendanceExport> {
    logger.info('Exporting attendance as Excel', { schoolId }, 'attendance');
    return this.repo.exportAttendance(schoolId, filters, 'EXCEL');
  }

  async exportCSV(schoolId: string, filters: AttendanceFilters): Promise<AttendanceExport> {
    logger.info('Exporting attendance as CSV', { schoolId }, 'attendance');
    return this.repo.exportAttendance(schoolId, filters, 'CSV');
  }

  async exportJSON(schoolId: string, filters: AttendanceFilters): Promise<AttendanceExport> {
    logger.info('Exporting attendance as JSON', { schoolId }, 'attendance');
    return this.repo.exportAttendance(schoolId, filters, 'JSON');
  }

  generateCSV(data: Record<string, unknown>[], columns: Array<{ key: string; header: string }>): string {
    const header = columns.map(c => `"${c.header}"`).join(',');
    const rows = data.map(item =>
      columns.map(col => {
        const value = item[col.key];
        return `"${String(value ?? '').replace(/"/g, '""')}"`;
      }).join(',')
    );
    return [header, ...rows].join('\n');
  }
}
