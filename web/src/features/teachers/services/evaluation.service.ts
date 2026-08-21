import type { TeacherRepository, TeacherEvaluation } from '../types';
import { TeacherNotFoundError, TeacherEvaluationError } from '@educi/errors';
import { TEACHER_EVALUATION } from '@educi/config';
import { logger } from '@educi/logger';
import { AuditTeacherService } from './audit-teacher.service';

export class EvaluationService {
  constructor(
    private readonly teacherRepo: TeacherRepository,
    private readonly auditService: AuditTeacherService,
  ) {}

  async getEvaluations(teacherId: string) {
    const existing = await this.teacherRepo.findById(teacherId);
    if (!existing) throw new TeacherNotFoundError(teacherId);

    return this.teacherRepo.getEvaluations(teacherId);
  }

  async createEvaluation(data: Omit<TeacherEvaluation, 'id' | 'createdAt'>) {
    const existing = await this.teacherRepo.findById(data.teacherId);
    if (!existing) throw new TeacherNotFoundError(data.teacherId);

    if (data.score !== undefined && data.score > data.maxScore) {
      throw new TeacherEvaluationError('Le score ne peut pas dépasser le score maximum');
    }

    if (data.criteria.length === 0) {
      throw new TeacherEvaluationError('Au moins un critère est requis');
    }

    await this.auditService.log({
      action: 'TEACHER_EVALUATION',
      teacherId: data.teacherId,
      details: { evaluationType: data.evaluationType, score: data.score, period: data.period },
    });
    logger.info('Evaluation created', { teacherId: data.teacherId, type: data.evaluationType }, 'teachers');
  }

  getDefaultCriteria(): Array<{ name: string; maxScore: number }> {
    return TEACHER_EVALUATION.DEFAULT_CRITERIA.map((name) => ({
      name,
      maxScore: TEACHER_EVALUATION.MAX_SCORE,
    }));
  }
}
