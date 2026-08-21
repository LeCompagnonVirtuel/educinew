import type { AcademicRepository, TeacherAssignment, AcademicFilters, CreateAssignmentRequest } from '../types';
import { AssignmentNotFoundError, TeacherNotFoundError, ClassNotFoundError, SubjectNotFoundError, AssignmentConflictError, AppError } from '@educi/errors';
import { logger } from '@educi/logger';

export class AssignmentService {
  constructor(private readonly academicRepo: AcademicRepository) {}

  /**
   * Creates a new assignment after validating teacher, class, subject existence and checking for conflicts.
   */
  async create(schoolId: string, userId: string, data: CreateAssignmentRequest): Promise<TeacherAssignment> {
    const errors: Array<{ field: string; message: string }> = [];

    if (!data.teacherId) {
      errors.push({ field: 'teacherId', message: "L'enseignant est requis" });
    }
    if (!data.classId) {
      errors.push({ field: 'classId', message: 'La classe est requise' });
    }
    if (!data.subjectId) {
      errors.push({ field: 'subjectId', message: 'La matière est requise' });
    }
    if (!data.academicYearId) {
      errors.push({ field: 'academicYearId', message: "L'année scolaire est requise" });
    }
    if (data.hoursPerWeek !== undefined && (data.hoursPerWeek < 1 || data.hoursPerWeek > 30)) {
      errors.push({ field: 'hoursPerWeek', message: "Le nombre d'heures par semaine doit être entre 1 et 30" });
    }

    if (errors.length > 0) {
      throw new AppError(
        `Erreur de validation: ${errors.length} erreur(s)`,
        'ASSIGNMENT_VALIDATION_ERROR',
        400,
      );
    }

    const teacher = await this.academicRepo.findAssignment(data.teacherId);
    if (!teacher) {
      const teacherCheck = await this.academicRepo.findAssignment(data.teacherId);
      if (!teacherCheck) {
        throw new TeacherNotFoundError(data.teacherId);
      }
    }

    const classExists = await this.academicRepo.findClass(data.classId);
    if (!classExists || classExists.schoolId !== schoolId) {
      throw new ClassNotFoundError(data.classId);
    }

    const subjectExists = await this.academicRepo.findSubject(data.subjectId);
    if (!subjectExists || subjectExists.schoolId !== schoolId) {
      throw new SubjectNotFoundError(data.subjectId);
    }

    const { data: existingAssignments } = await this.academicRepo.findAllAssignments(schoolId, {
      academicYearId: data.academicYearId,
      limit: 10000,
    });

    const teacherAssignments = existingAssignments.filter(
      (a) => a.teacherId === data.teacherId && a.status === 'ACTIVE',
    );

    const conflictingAssignment = teacherAssignments.find((a) => {
      const existingStart = new Date(a.startDate).getTime();
      const existingEnd = a.endDate ? new Date(a.endDate).getTime() : Infinity;
      const newStart = data.startDate ? new Date(data.startDate).getTime() : Date.now();
      const newEnd = data.endDate ? new Date(data.endDate).getTime() : Infinity;

      return newStart <= existingEnd && newEnd >= existingStart;
    });

    if (conflictingAssignment) {
      throw new AssignmentConflictError(
        "Conflit d'affectation: cet enseignant est déjà affecté à une classe pendant cette période",
      );
    }

    if (data.hoursPerWeek) {
      const totalHours = teacherAssignments.reduce((sum, a) => sum + (a.hoursPerWeek || 0), 0);
      if (totalHours + data.hoursPerWeek > 30) {
        throw new AppError(
          `Dépassement de la charge horaire: ${totalHours}h déjà assignées, ${data.hoursPerWeek}h demandées (max 30h)`,
          'ASSIGNMENT_HOURS_EXCEEDED',
          400,
        );
      }
    }

    const assignment = await this.academicRepo.createAssignment(data, schoolId);
    logger.info('Assignment created', { assignmentId: assignment.id, schoolId, userId }, 'academic');
    return assignment;
  }

  /**
   * Retrieves an assignment by its ID within a school.
   */
  async getById(schoolId: string, assignmentId: string): Promise<TeacherAssignment> {
    const assignment = await this.academicRepo.findAssignment(assignmentId);
    if (!assignment || assignment.schoolId !== schoolId) {
      throw new AssignmentNotFoundError(assignmentId);
    }
    logger.info('Assignment retrieved', { assignmentId, schoolId }, 'academic');
    return assignment;
  }

  /**
   * Lists assignments with filtering, search, and pagination.
   */
  async list(schoolId: string, filters: AcademicFilters): Promise<{ data: TeacherAssignment[]; total: number }> {
    const page = filters.page || 1;
    const limit = filters.limit || 20;

    let queryFilters: AcademicFilters = { ...filters, page, limit };

    if (filters.teacherId || filters.classId || filters.subjectId) {
      const { data: allAssignments } = await this.academicRepo.findAllAssignments(schoolId, {
        academicYearId: filters.academicYearId,
        limit: 10000,
      });

      let filtered = allAssignments;

      if (filters.teacherId) {
        filtered = filtered.filter((a) => a.teacherId === filters.teacherId);
      }
      if (filters.classId) {
        filtered = filtered.filter((a) => a.classId === filters.classId);
      }
      if (filters.subjectId) {
        filtered = filtered.filter((a) => a.subjectId === filters.subjectId);
      }

      const start = (page - 1) * limit;
      const paginated = filtered.slice(start, start + limit);

      return { data: paginated, total: filtered.length };
    }

    return this.academicRepo.findAllAssignments(schoolId, queryFilters);
  }

  /**
   * Deletes an assignment by its ID.
   */
  async delete(schoolId: string, userId: string, assignmentId: string): Promise<void> {
    const existing = await this.academicRepo.findAssignment(assignmentId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new AssignmentNotFoundError(assignmentId);
    }

    await this.academicRepo.deleteAssignment(assignmentId);
    logger.info('Assignment deleted', { assignmentId, schoolId, userId }, 'academic');
  }
}
