import type { AcademicRepository, AcademicFilters, Subject, CreateSubjectRequest, UpdateSubjectRequest } from '../types';
import { SubjectNotFoundError, SubjectDuplicateError, AppError } from '@educi/errors';
import { logger } from '@educi/logger';

interface SubjectStatistics {
  total: number;
  byDepartment: Array<{ departmentId: string; departmentName: string; count: number }>;
  avgCoefficient: number;
}

export class SubjectService {
  constructor(private readonly academicRepo: AcademicRepository) {}

  /**
   * Creates a new subject after validating code uniqueness.
   */
  async create(schoolId: string, userId: string, data: CreateSubjectRequest): Promise<Subject> {
    const errors: Array<{ field: string; message: string }> = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Le nom est requis' });
    }
    if (!data.code || data.code.trim().length === 0) {
      errors.push({ field: 'code', message: 'Le code est requis' });
    }
    if (data.coefficient !== undefined && data.coefficient < 0) {
      errors.push({ field: 'coefficient', message: 'Le coefficient doit être positif' });
    }
    if (data.maxHoursPerWeek !== undefined && data.maxHoursPerWeek < 1) {
      errors.push({ field: 'maxHoursPerWeek', message: "Le nombre maximal d'heures par semaine doit être supérieur à 0" });
    }

    if (errors.length > 0) {
      throw new AppError(
        `Erreur de validation: ${errors.length} erreur(s)`,
        'SUBJECT_VALIDATION_ERROR',
        400,
      );
    }

    const { data: existingSubjects } = await this.academicRepo.findAllSubjects(schoolId, { limit: 1000 });

    const duplicate = existingSubjects.find(
      (s) => s.code.toLowerCase() === data.code.trim().toLowerCase(),
    );

    if (duplicate) {
      throw new SubjectDuplicateError(data.code);
    }

    const subject = await this.academicRepo.createSubject(data, schoolId);
    logger.info('Subject created', { subjectId: subject.id, schoolId, userId }, 'academic');
    return subject;
  }

  /**
   * Retrieves a subject by its ID within a school.
   */
  async getById(schoolId: string, subjectId: string): Promise<Subject> {
    const subject = await this.academicRepo.findSubject(subjectId);
    if (!subject || subject.schoolId !== schoolId) {
      throw new SubjectNotFoundError(subjectId);
    }
    logger.info('Subject retrieved', { subjectId, schoolId }, 'academic');
    return subject;
  }

  /**
   * Lists subjects with filtering, search, and pagination.
   */
  async list(schoolId: string, filters: AcademicFilters): Promise<{ data: Subject[]; total: number }> {
    const page = filters.page || 1;
    const limit = filters.limit || 20;

    let queryFilters: AcademicFilters = { ...filters, page, limit };

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const { data: allSubjects } = await this.academicRepo.findAllSubjects(schoolId, { limit: 1000 });
      const filtered = allSubjects.filter(
        (s) => s.name.toLowerCase().includes(searchLower) || s.code.toLowerCase().includes(searchLower),
      );

      const start = (page - 1) * limit;
      const paginated = filtered.slice(start, start + limit);

      return { data: paginated, total: filtered.length };
    }

    if (filters.departmentId) {
      queryFilters = { ...queryFilters, departmentId: filters.departmentId };
    }

    return this.academicRepo.findAllSubjects(schoolId, queryFilters);
  }

  /**
   * Updates a subject after validating the update data.
   */
  async update(schoolId: string, userId: string, subjectId: string, data: UpdateSubjectRequest): Promise<Subject> {
    const existing = await this.academicRepo.findSubject(subjectId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new SubjectNotFoundError(subjectId);
    }

    const errors: Array<{ field: string; message: string }> = [];

    if (data.name !== undefined && data.name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Le nom ne peut pas être vide' });
    }
    if (data.code !== undefined && data.code.trim().length === 0) {
      errors.push({ field: 'code', message: 'Le code ne peut pas être vide' });
    }
    if (data.coefficient !== undefined && data.coefficient < 0) {
      errors.push({ field: 'coefficient', message: 'Le coefficient doit être positif' });
    }

    if (errors.length > 0) {
      throw new AppError(
        `Erreur de validation: ${errors.length} erreur(s)`,
        'SUBJECT_VALIDATION_ERROR',
        400,
      );
    }

    if (data.code !== undefined) {
      const targetCode = data.code.trim().toLowerCase();

      const { data: existingSubjects } = await this.academicRepo.findAllSubjects(schoolId, { limit: 1000 });

      const duplicate = existingSubjects.find(
        (s) => s.id !== subjectId && s.code.toLowerCase() === targetCode,
      );

      if (duplicate) {
        throw new SubjectDuplicateError(data.code);
      }
    }

    const updated = await this.academicRepo.updateSubject(subjectId, data);
    logger.info('Subject updated', { subjectId, schoolId, userId }, 'academic');
    return updated;
  }

  /**
   * Archives a subject by setting its archived flag to true.
   */
  async archive(schoolId: string, userId: string, subjectId: string): Promise<void> {
    const existing = await this.academicRepo.findSubject(subjectId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new SubjectNotFoundError(subjectId);
    }

    if (existing.archived) {
      throw new AppError('La matière est déjà archivée', 'SUBJECT_ALREADY_ARCHIVED', 400);
    }

    await this.academicRepo.archiveSubject(subjectId);
    logger.info('Subject archived', { subjectId, schoolId, userId }, 'academic');
  }

  /**
   * Restores an archived subject by setting its archived flag to false.
   */
  async restore(schoolId: string, userId: string, subjectId: string): Promise<void> {
    const existing = await this.academicRepo.findSubject(subjectId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new SubjectNotFoundError(subjectId);
    }

    if (!existing.archived) {
      throw new AppError('Seules les matières archivées peuvent être restaurées', 'SUBJECT_NOT_ARCHIVED', 400);
    }

    await this.academicRepo.restoreSubject(subjectId);
    logger.info('Subject restored', { subjectId, schoolId, userId }, 'academic');
  }

  /**
   * Deletes a subject after verifying no active teacher assignments reference it.
   */
  async delete(schoolId: string, userId: string, subjectId: string): Promise<void> {
    const existing = await this.academicRepo.findSubject(subjectId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new SubjectNotFoundError(subjectId);
    }

    const { data: assignments } = await this.academicRepo.findAllAssignments(schoolId, { limit: 10000 });

    const activeAssignments = assignments.filter(
      (a) => a.subjectId === subjectId && a.status === 'ACTIVE',
    );

    if (activeAssignments.length > 0) {
      throw new AppError(
        `Impossible de supprimer la matière: ${activeAssignments.length} affectation(s) active(s) y sont associée(s)`,
        'SUBJECT_DELETION_ERROR',
        400,
      );
    }

    await this.academicRepo.deleteSubject(subjectId);
    logger.info('Subject deleted', { subjectId, schoolId, userId }, 'academic');
  }

  /**
   * Returns statistics about subjects for a school including breakdowns by department and average coefficient.
   */
  async getStatistics(schoolId: string): Promise<SubjectStatistics> {
    const { data: subjects } = await this.academicRepo.findAllSubjects(schoolId, { limit: 10000 });

    const total = subjects.length;

    const byDepartmentMap = new Map<string, { departmentId: string; departmentName: string; count: number }>();

    let totalCoefficient = 0;

    for (const subject of subjects) {
      if (subject.department) {
        const existing = byDepartmentMap.get(subject.department.id);
        if (existing) {
          existing.count++;
        } else {
          byDepartmentMap.set(subject.department.id, {
            departmentId: subject.department.id,
            departmentName: subject.department.name,
            count: 1,
          });
        }
      }

      totalCoefficient += subject.coefficient;
    }

    const avgCoefficient = total > 0 ? Math.round((totalCoefficient / total) * 100) / 100 : 0;

    logger.info('Subject statistics retrieved', { schoolId, total }, 'academic');

    return {
      total,
      byDepartment: Array.from(byDepartmentMap.values()),
      avgCoefficient,
    };
  }
}
