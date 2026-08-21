import type { TeacherRepository, TeacherAssignment } from '../types';
import { TeacherNotFoundError, TeacherAssignmentError } from '@educi/errors';
import { logger } from '@educi/logger';
import { AuditTeacherService } from './audit-teacher.service';

export class AssignmentService {
  constructor(
    private readonly teacherRepo: TeacherRepository,
    private readonly auditService: AuditTeacherService,
  ) {}

  async getAssignments(teacherId: string) {
    const existing = await this.teacherRepo.findById(teacherId);
    if (!existing) throw new TeacherNotFoundError(teacherId);

    return this.teacherRepo.getAssignments(teacherId);
  }

  async createAssignment(data: Omit<TeacherAssignment, 'id' | 'createdAt'>) {
    const existing = await this.teacherRepo.findById(data.teacherId);
    if (!existing) throw new TeacherNotFoundError(data.teacherId);

    try {
      const assignments = await this.teacherRepo.getAssignments(data.teacherId);
      const hasConflict = assignments.some(
        (a) => a.classId === data.classId && a.subjectId === data.subjectId && a.isActive
      );
      if (hasConflict) throw new TeacherAssignmentError('Une affectation similaire existe déjà');

      await this.auditService.log({
        action: 'TEACHER_ASSIGNMENT',
        teacherId: data.teacherId,
        details: { classId: data.classId, subjectId: data.subjectId },
      });
      logger.info('Teacher assigned', { teacherId: data.teacherId }, 'teachers');
    } catch (err) {
      if (err instanceof TeacherAssignmentError) throw err;
      logger.error('Assignment failed', { teacherId: data.teacherId, error: err }, 'teachers');
      throw new TeacherAssignmentError();
    }
  }
}
