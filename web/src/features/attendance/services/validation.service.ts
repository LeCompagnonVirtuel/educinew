import type {
  Attendance, AttendanceSession, CreateAttendanceRequest,
  AttendanceRepositoryExtended,
} from '../types';
import {
  AttendanceValidationError,
  AttendanceDuplicateError,
  AttendanceSessionNotFoundError,
  AttendanceSessionError,
  StudentNotFoundError,
  ClassNotFoundError,
} from '@educi/errors';
import { logger } from '@educi/logger';
import { ATTENDANCE_THRESHOLDS, ATTENDANCE_STUDENT_STATUS } from '@educi/config';

export class AttendanceValidationService {
  constructor(private readonly attendanceRepo: AttendanceRepositoryExtended) {}

  async validateAttendance(schoolId: string, data: CreateAttendanceRequest): Promise<{ valid: boolean; errors: Array<{ field: string; message: string }> }> {
    const errors: Array<{ field: string; message: string }> = [];

    if (!data.studentId) {
      errors.push({ field: 'studentId', message: "L'élève est requis" });
    }
    if (!data.classId) {
      errors.push({ field: 'classId', message: 'La classe est requise' });
    }
    if (!data.date) {
      errors.push({ field: 'date', message: 'La date est requise' });
    }
    if (!data.status) {
      errors.push({ field: 'status', message: 'Le statut est requis' });
    }

    if (data.status && !ATTENDANCE_STUDENT_STATUS.STATUSES.includes(data.status as any)) {
      errors.push({ field: 'status', message: `Statut invalide: ${data.status}` });
    }

    if (data.studentId) {
      const student = await this.attendanceRepo.findStudent(data.studentId);
      if (!student || student.schoolId !== schoolId) {
        errors.push({ field: 'studentId', message: `Élève (${data.studentId}) introuvable` });
      }
    }

    if (data.classId) {
      const cls = await this.attendanceRepo.findClass(data.classId);
      if (!cls || cls.schoolId !== schoolId) {
        errors.push({ field: 'classId', message: `Classe (${data.classId}) introuvable` });
      }
    }

    if (data.studentId && data.classId && data.date) {
      const duplicate = await this.attendanceRepo.findAttendanceByStudentAndDate(
        schoolId,
        data.studentId,
        data.classId,
        data.date,
      );
      if (duplicate) {
        errors.push({ field: 'date', message: `Présence déjà enregistrée pour cet élève le ${data.date}` });
      }
    }

    if (errors.length > 0) {
      logger.info('Attendance validation failed', { schoolId, errors }, 'attendance');
      return { valid: false, errors };
    }

    return { valid: true, errors: [] };
  }

  async validateBulk(schoolId: string, items: CreateAttendanceRequest[]): Promise<{ valid: boolean; results: Array<{ index: number; valid: boolean; errors: Array<{ field: string; message: string }> }> }> {
    const results: Array<{ index: number; valid: boolean; errors: Array<{ field: string; message: string }> }> = [];

    for (let i = 0; i < items.length; i++) {
      const result = await this.validateAttendance(schoolId, items[i]);
      results.push({ index: i, ...result });
    }

    const allValid = results.every((r) => r.valid);

    logger.info('Bulk attendance validation', { schoolId, total: items.length, valid: allValid }, 'attendance');
    return { valid: allValid, results };
  }

  async checkDuplicate(schoolId: string, studentId: string, classId: string, date: string, excludeId?: string): Promise<boolean> {
    const existing = await this.attendanceRepo.findAttendanceByStudentAndDate(schoolId, studentId, classId, date);

    if (!existing) return false;

    if (excludeId && existing.id === excludeId) return false;

    return true;
  }

  async checkSessionActive(schoolId: string, classId: string): Promise<{ active: boolean; session?: AttendanceSession }> {
    const session = await this.attendanceRepo.findActiveSession(schoolId, classId);

    if (!session) {
      return { active: false };
    }

    return { active: true, session };
  }
}
