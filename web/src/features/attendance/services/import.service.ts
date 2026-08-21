import type { AttendanceRepository, AttendanceImport } from '../types';
import { AttendanceImportError } from '@educi/errors';
import { logger } from '@educi/logger';
import { ATTENDANCE_IMPORT } from '@educi/config';

export class AttendanceImportService {
  constructor(private readonly repo: AttendanceRepository) {}

  async importCSV(schoolId: string, data: string, importType: string): Promise<AttendanceImport> {
    logger.info('Importing attendance from CSV', { schoolId, importType }, 'attendance');
    const rows = this.parseCSV(data);
    if (rows.length === 0) throw new AttendanceImportError('Aucune donnée à importer');
    if (rows.length > ATTENDANCE_IMPORT.MAX_ROWS) throw new AttendanceImportError(`Trop de lignes: ${rows.length}`);
    return this.repo.importAttendance(schoolId, rows, importType);
  }

  async importExcel(schoolId: string, data: Record<string, unknown>[], importType: string): Promise<AttendanceImport> {
    logger.info('Importing attendance from Excel', { schoolId, importType }, 'attendance');
    if (data.length === 0) throw new AttendanceImportError('Aucune donnée à importer');
    return this.repo.importAttendance(schoolId, data, importType);
  }

  async validateImportData(data: string, importType: string): Promise<Array<{ field: string; message: string }>> {
    const errors: Array<{ field: string; message: string }> = [];
    const lines = data.split('\n').filter(l => l.trim());
    if (lines.length < 2) {
      errors.push({ field: 'data', message: 'Le fichier doit contenir au moins un en-tête et une ligne de données' });
      return errors;
    }
    const headers = lines[0].split(',').map(h => h.trim());
    const required = importType === 'STUDENT_ATTENDANCE'
      ? ATTENDANCE_IMPORT.REQUIRED_COLUMNS_STUDENT
      : ATTENDANCE_IMPORT.REQUIRED_COLUMNS_TEACHER;
    for (const col of required) {
      if (!headers.includes(col)) errors.push({ field: 'columns', message: `Colonne manquante: ${col}` });
    }
    return errors;
  }

  async processImport(schoolId: string, data: Record<string, unknown>[], importType: string): Promise<AttendanceImport> {
    return this.repo.importAttendance(schoolId, data, importType);
  }

  private parseCSV(data: string): Record<string, string>[] {
    const lines = data.split('\n').filter(l => l.trim());
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const row: Record<string, string> = {};
      headers.forEach((h, i) => { row[h] = values[i] || ''; });
      return row;
    });
  }
}
