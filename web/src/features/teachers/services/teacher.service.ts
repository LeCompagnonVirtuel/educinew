import type { TeacherRepository, CreateTeacherRequest, UpdateTeacherRequest, TeacherFilters } from '../types';
import { TeacherNotFoundError, TeacherValidationError } from '@educi/errors';
import { logger } from '@educi/logger';
import { AuditTeacherService } from './audit-teacher.service';
import { ValidationService } from './validation.service';

export class TeacherService {
  constructor(
    private readonly teacherRepo: TeacherRepository,
    private readonly auditService: AuditTeacherService,
    private readonly validationService: ValidationService,
  ) {}

  async create(data: CreateTeacherRequest, schoolId: string) {
    const validation = this.validationService.validateCreate(data);
    if (!validation.isValid) throw new TeacherValidationError(validation.errors);

    const teacher = await this.teacherRepo.create(data, schoolId);

    await this.auditService.log({
      action: 'TEACHER_CREATE',
      teacherId: teacher.id,
      schoolId,
      details: { firstName: data.firstName, lastName: data.lastName },
    });

    logger.info('Teacher created', { teacherId: teacher.id }, 'teachers');
    return teacher;
  }

  async update(id: string, data: UpdateTeacherRequest) {
    const existing = await this.teacherRepo.findById(id);
    if (!existing) throw new TeacherNotFoundError(id);

    const validation = this.validationService.validateUpdate(data);
    if (!validation.isValid) throw new TeacherValidationError(validation.errors);

    const teacher = await this.teacherRepo.update(id, data);

    await this.auditService.log({
      action: 'TEACHER_UPDATE',
      teacherId: id,
      details: { fields: Object.keys(data) },
    });

    return teacher;
  }

  async archive(id: string) {
    const existing = await this.teacherRepo.findById(id);
    if (!existing) throw new TeacherNotFoundError(id);

    await this.teacherRepo.archive(id);

    await this.auditService.log({ action: 'TEACHER_ARCHIVE', teacherId: id });
    logger.info('Teacher archived', { teacherId: id }, 'teachers');
  }

  async restore(id: string) {
    const existing = await this.teacherRepo.findById(id);
    if (!existing) throw new TeacherNotFoundError(id);

    await this.teacherRepo.restore(id);

    await this.auditService.log({ action: 'TEACHER_RESTORE', teacherId: id });
    logger.info('Teacher restored', { teacherId: id }, 'teachers');
  }

  async delete(id: string) {
    const existing = await this.teacherRepo.findById(id);
    if (!existing) throw new TeacherNotFoundError(id);

    await this.teacherRepo.delete(id);

    await this.auditService.log({ action: 'TEACHER_DELETE', teacherId: id });
    logger.info('Teacher deleted', { teacherId: id }, 'teachers');
  }

  async findById(id: string) {
    const teacher = await this.teacherRepo.findById(id);
    if (!teacher) throw new TeacherNotFoundError(id);
    return teacher;
  }

  async findAll(schoolId: string, filters: TeacherFilters) {
    return this.teacherRepo.findAll(schoolId, filters);
  }

  async search(schoolId: string, query: string, limit?: number) {
    return this.teacherRepo.search(schoolId, query, limit);
  }

  async getStatistics(schoolId: string) {
    return this.teacherRepo.getStatistics(schoolId);
  }

  async getDashboard(schoolId: string) {
    return this.teacherRepo.getDashboard(schoolId);
  }

  async getTimeline(teacherId: string, limit?: number) {
    return this.teacherRepo.getTimeline(teacherId, limit);
  }

  async importTeachers(schoolId: string, data: CreateTeacherRequest[]) {
    return this.teacherRepo.importTeachers(schoolId, data);
  }

  async exportTeachers(schoolId: string, filters: TeacherFilters, format: string) {
    return this.teacherRepo.exportTeachers(schoolId, filters, format);
  }
}
