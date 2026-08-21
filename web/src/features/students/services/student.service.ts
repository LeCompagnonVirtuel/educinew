import type { StudentRepository, CreateStudentRequest, UpdateStudentRequest, StudentFilters, StudentListResult, StudentStatistics, StudentDashboard, StudentImport, StudentExport } from '../types';
import { StudentNotFoundError, StudentValidationError } from '@educi/errors';
import { logger } from '@educi/logger';
import { AuditStudentService } from './audit-student.service';
import { ValidationService } from './validation.service';

export class StudentService {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly auditService: AuditStudentService,
    private readonly validationService: ValidationService,
  ) {}

  async create(data: CreateStudentRequest, schoolId: string) {
    const validation = this.validationService.validateCreate(data);
    if (!validation.isValid) throw new StudentValidationError(validation.errors);

    const student = await this.studentRepo.create(data, schoolId);

    await this.auditService.log({
      action: 'STUDENT_CREATE',
      studentId: student.id,
      schoolId,
      details: { firstName: data.firstName, lastName: data.lastName },
    });

    logger.info('Student created', { studentId: student.id }, 'students');
    return student;
  }

  async update(id: string, data: UpdateStudentRequest) {
    const existing = await this.studentRepo.findById(id);
    if (!existing) throw new StudentNotFoundError(id);

    const validation = this.validationService.validateUpdate(data);
    if (!validation.isValid) throw new StudentValidationError(validation.errors);

    const student = await this.studentRepo.update(id, data);

    await this.auditService.log({
      action: 'STUDENT_UPDATE',
      studentId: id,
      details: { fields: Object.keys(data) },
    });

    return student;
  }

  async archive(id: string) {
    const existing = await this.studentRepo.findById(id);
    if (!existing) throw new StudentNotFoundError(id);

    await this.studentRepo.archive(id);

    await this.auditService.log({ action: 'STUDENT_ARCHIVE', studentId: id });
    logger.info('Student archived', { studentId: id }, 'students');
  }

  async restore(id: string) {
    const existing = await this.studentRepo.findById(id);
    if (!existing) throw new StudentNotFoundError(id);

    await this.studentRepo.restore(id);

    await this.auditService.log({ action: 'STUDENT_RESTORE', studentId: id });
    logger.info('Student restored', { studentId: id }, 'students');
  }

  async delete(id: string) {
    const existing = await this.studentRepo.findById(id);
    if (!existing) throw new StudentNotFoundError(id);

    await this.studentRepo.delete(id);

    await this.auditService.log({ action: 'STUDENT_DELETE', studentId: id });
    logger.info('Student deleted', { studentId: id }, 'students');
  }

  async findById(id: string) {
    const student = await this.studentRepo.findById(id);
    if (!student) throw new StudentNotFoundError(id);
    return student;
  }

  async findAll(schoolId: string, filters: StudentFilters) {
    return this.studentRepo.findAll(schoolId, filters);
  }

  async search(schoolId: string, query: string, limit?: number) {
    return this.studentRepo.search(schoolId, query, limit);
  }

  async getStatistics(schoolId: string) {
    return this.studentRepo.getStatistics(schoolId);
  }

  async getDashboard(schoolId: string) {
    return this.studentRepo.getDashboard(schoolId);
  }

  async importStudents(schoolId: string, data: CreateStudentRequest[]) {
    return this.studentRepo.importStudents(schoolId, data);
  }

  async exportStudents(schoolId: string, filters: StudentFilters, format: string) {
    return this.studentRepo.exportStudents(schoolId, filters, format);
  }
}
