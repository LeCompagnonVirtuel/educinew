import type {
  Attendance, AttendanceFilters, CreateAttendanceRequest, UpdateAttendanceRequest,
  AttendanceRepositoryExtended,
} from '../types';
import {
  AttendanceNotFoundError,
  AttendanceValidationError,
  AttendanceDuplicateError,
  StudentNotFoundError,
  ClassNotFoundError,
} from '@educi/errors';
import { logger } from '@educi/logger';
import { ATTENDANCE_THRESHOLDS } from '@educi/config';

export class AttendanceService {
  constructor(private readonly attendanceRepo: AttendanceRepositoryExtended) {}

  async create(schoolId: string, userId: string, data: CreateAttendanceRequest): Promise<Attendance> {
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

    if (errors.length > 0) {
      throw new AttendanceValidationError(errors);
    }

    const student = await this.attendanceRepo.findStudent(data.studentId);
    if (!student || student.schoolId !== schoolId) {
      throw new StudentNotFoundError(data.studentId);
    }

    const cls = await this.attendanceRepo.findClass(data.classId);
    if (!cls || cls.schoolId !== schoolId) {
      throw new ClassNotFoundError(data.classId);
    }

    const existing = await this.attendanceRepo.findAttendanceByStudentAndDate(
      schoolId,
      data.studentId,
      data.classId,
      data.date,
    );

    if (existing) {
      throw new AttendanceDuplicateError(data.date, data.studentId);
    }

    const attendance = await this.attendanceRepo.createAttendance(data, schoolId);
    logger.info('Attendance created', { attendanceId: attendance.id, schoolId, userId }, 'attendance');
    return attendance;
  }

  async getById(schoolId: string, attendanceId: string): Promise<Attendance> {
    const attendance = await this.attendanceRepo.findAttendance(attendanceId);
    if (!attendance || attendance.schoolId !== schoolId) {
      throw new AttendanceNotFoundError(attendanceId);
    }
    return attendance;
  }

  async list(schoolId: string, filters: AttendanceFilters): Promise<{ data: Attendance[]; total: number }> {
    const page = filters.page || 1;
    const limit = filters.limit || 20;

    let queryFilters: AttendanceFilters = { ...filters, page, limit };

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const { data: all } = await this.attendanceRepo.findAllAttendances(schoolId, { limit: 10000 });
      const filtered = all.filter(
        (a) =>
          a.student?.firstName?.toLowerCase().includes(searchLower) ||
          a.student?.lastName?.toLowerCase().includes(searchLower),
      );

      const start = (page - 1) * limit;
      const paginated = filtered.slice(start, start + limit);

      return { data: paginated, total: filtered.length };
    }

    if (filters.classId) {
      queryFilters = { ...queryFilters, classId: filters.classId };
    }
    if (filters.studentId) {
      queryFilters = { ...queryFilters, studentId: filters.studentId };
    }
    if (filters.date) {
      queryFilters = { ...queryFilters, date: filters.date };
    }
    if (filters.startDate) {
      queryFilters = { ...queryFilters, startDate: filters.startDate };
    }
    if (filters.endDate) {
      queryFilters = { ...queryFilters, endDate: filters.endDate };
    }
    if (filters.status) {
      queryFilters = { ...queryFilters, status: filters.status };
    }

    return this.attendanceRepo.findAllAttendances(schoolId, queryFilters);
  }

  async update(schoolId: string, userId: string, attendanceId: string, data: UpdateAttendanceRequest): Promise<Attendance> {
    const existing = await this.attendanceRepo.findAttendance(attendanceId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new AttendanceNotFoundError(attendanceId);
    }

    const errors: Array<{ field: string; message: string }> = [];

    if (data.status !== undefined && !data.status) {
      errors.push({ field: 'status', message: 'Le statut ne peut pas être vide' });
    }

    if (errors.length > 0) {
      throw new AttendanceValidationError(errors);
    }

    const updated = await this.attendanceRepo.updateAttendance(attendanceId, data);
    logger.info('Attendance updated', { attendanceId, schoolId, userId }, 'attendance');
    return updated;
  }

  async delete(schoolId: string, userId: string, attendanceId: string): Promise<void> {
    const existing = await this.attendanceRepo.findAttendance(attendanceId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new AttendanceNotFoundError(attendanceId);
    }

    await this.attendanceRepo.deleteAttendance(attendanceId);
    logger.info('Attendance deleted', { attendanceId, schoolId, userId }, 'attendance');
  }

  async bulkCreate(schoolId: string, userId: string, items: CreateAttendanceRequest[]): Promise<Attendance[]> {
    const results: Attendance[] = [];
    const errors: Array<{ index: number; field: string; message: string }> = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (!item.studentId) {
        errors.push({ index: i, field: 'studentId', message: "L'élève est requis" });
        continue;
      }
      if (!item.classId) {
        errors.push({ index: i, field: 'classId', message: 'La classe est requise' });
        continue;
      }
      if (!item.date) {
        errors.push({ index: i, field: 'date', message: 'La date est requise' });
        continue;
      }
      if (!item.status) {
        errors.push({ index: i, field: 'status', message: 'Le statut est requis' });
        continue;
      }

      const student = await this.attendanceRepo.findStudent(item.studentId);
      if (!student || student.schoolId !== schoolId) {
        errors.push({ index: i, field: 'studentId', message: `Élève (${item.studentId}) introuvable` });
        continue;
      }

      const cls = await this.attendanceRepo.findClass(item.classId);
      if (!cls || cls.schoolId !== schoolId) {
        errors.push({ index: i, field: 'classId', message: `Classe (${item.classId}) introuvable` });
        continue;
      }

      const existing = await this.attendanceRepo.findAttendanceByStudentAndDate(
        schoolId,
        item.studentId,
        item.classId,
        item.date,
      );

      if (existing) {
        errors.push({ index: i, field: 'date', message: `Présence déjà enregistrée pour cet élève le ${item.date}` });
        continue;
      }

      const attendance = await this.attendanceRepo.createAttendance(item, schoolId);
      results.push(attendance);
    }

    if (errors.length > 0 && results.length === 0) {
      throw new AttendanceValidationError(errors.map((e) => ({ field: e.field, message: `[Ligne ${e.index + 1}] ${e.message}` })));
    }

    logger.info('Bulk attendance created', { schoolId, userId, count: results.length, errorCount: errors.length }, 'attendance');
    return results;
  }

  async bulkUpdate(schoolId: string, userId: string, items: Array<{ id: string } & UpdateAttendanceRequest>): Promise<Attendance[]> {
    const results: Attendance[] = [];
    const errors: Array<{ index: number; field: string; message: string }> = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      const existing = await this.attendanceRepo.findAttendance(item.id);
      if (!existing || existing.schoolId !== schoolId) {
        errors.push({ index: i, field: 'id', message: `Présence (${item.id}) introuvable` });
        continue;
      }

      const { id, ...data } = item;
      const updated = await this.attendanceRepo.updateAttendance(id, data);
      results.push(updated);
    }

    if (errors.length > 0 && results.length === 0) {
      throw new AttendanceValidationError(errors.map((e) => ({ field: e.field, message: `[Ligne ${e.index + 1}] ${e.message}` })));
    }

    logger.info('Bulk attendance updated', { schoolId, userId, count: results.length, errorCount: errors.length }, 'attendance');
    return results;
  }
}
