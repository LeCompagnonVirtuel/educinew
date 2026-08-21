import type {
  TeacherAttendance, AttendanceFilters, CreateTeacherAttendanceRequest,
  AttendanceRepositoryExtended,
} from '../types';
import {
  AttendanceNotFoundError,
  AttendanceValidationError,
  TeacherNotFoundError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export class TeacherAttendanceService {
  constructor(private readonly attendanceRepo: AttendanceRepositoryExtended) {}

  async create(schoolId: string, userId: string, data: CreateTeacherAttendanceRequest): Promise<TeacherAttendance> {
    const errors: Array<{ field: string; message: string }> = [];

    if (!data.teacherId) {
      errors.push({ field: 'teacherId', message: "L'enseignant est requis" });
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

    const teacher = await this.attendanceRepo.findTeacher(data.teacherId);
    if (!teacher || teacher.schoolId !== schoolId) {
      throw new TeacherNotFoundError(data.teacherId);
    }

    const existing = await this.attendanceRepo.findTeacherAttendanceByTeacherAndDate(
      schoolId,
      data.teacherId,
      data.date,
    );

    if (existing) {
      throw new AttendanceValidationError([
        { field: 'date', message: `Présence déjà enregistrée pour cet enseignant le ${data.date}` },
      ]);
    }

    const attendance = await this.attendanceRepo.createTeacherAttendance(data, schoolId);
    logger.info('Teacher attendance created', { attendanceId: attendance.id, schoolId, userId }, 'attendance');
    return attendance;
  }

  async getById(schoolId: string, attendanceId: string): Promise<TeacherAttendance> {
    const attendance = await this.attendanceRepo.findTeacherAttendance(attendanceId);
    if (!attendance || attendance.schoolId !== schoolId) {
      throw new AttendanceNotFoundError(attendanceId);
    }
    return attendance;
  }

  async list(schoolId: string, filters: AttendanceFilters): Promise<{ data: TeacherAttendance[]; total: number }> {
    const page = filters.page || 1;
    const limit = filters.limit || 20;

    let queryFilters: AttendanceFilters = { ...filters, page, limit };

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const { data: all } = await this.attendanceRepo.findAllTeacherAttendances(schoolId, { limit: 10000 });
      const filtered = all.filter(
        (a) =>
          a.teacher?.firstName?.toLowerCase().includes(searchLower) ||
          a.teacher?.lastName?.toLowerCase().includes(searchLower),
      );

      const start = (page - 1) * limit;
      const paginated = filtered.slice(start, start + limit);

      return { data: paginated, total: filtered.length };
    }

    if (filters.teacherId) {
      queryFilters = { ...queryFilters, teacherId: filters.teacherId };
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

    return this.attendanceRepo.findAllTeacherAttendances(schoolId, queryFilters);
  }

  async update(schoolId: string, userId: string, attendanceId: string, data: Partial<CreateTeacherAttendanceRequest>): Promise<TeacherAttendance> {
    const existing = await this.attendanceRepo.findTeacherAttendance(attendanceId);
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

    const updated = await this.attendanceRepo.updateTeacherAttendance(attendanceId, data);
    logger.info('Teacher attendance updated', { attendanceId, schoolId, userId }, 'attendance');
    return updated;
  }

  async getByTeacher(schoolId: string, teacherId: string, filters?: AttendanceFilters): Promise<{ data: TeacherAttendance[]; total: number }> {
    const teacher = await this.attendanceRepo.findTeacher(teacherId);
    if (!teacher || teacher.schoolId !== schoolId) {
      throw new TeacherNotFoundError(teacherId);
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 20;

    const queryFilters: AttendanceFilters = {
      ...filters,
      teacherId,
      page,
      limit,
    };

    if (filters?.startDate) {
      queryFilters.startDate = filters.startDate;
    }
    if (filters?.endDate) {
      queryFilters.endDate = filters.endDate;
    }

    const result = await this.attendanceRepo.findAllTeacherAttendances(schoolId, queryFilters);
    logger.info('Teacher attendance by teacher retrieved', { schoolId, teacherId, total: result.total }, 'attendance');
    return result;
  }

  async getByDate(schoolId: string, date: string, filters?: AttendanceFilters): Promise<{ data: TeacherAttendance[]; total: number }> {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;

    const queryFilters: AttendanceFilters = {
      ...filters,
      date,
      page,
      limit,
    };

    if (filters?.teacherId) {
      queryFilters.teacherId = filters.teacherId;
    }
    if (filters?.status) {
      queryFilters.status = filters.status;
    }

    const result = await this.attendanceRepo.findAllTeacherAttendances(schoolId, queryFilters);
    logger.info('Teacher attendance by date retrieved', { schoolId, date, total: result.total }, 'attendance');
    return result;
  }
}
