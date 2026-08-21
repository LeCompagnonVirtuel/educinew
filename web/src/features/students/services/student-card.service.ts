import type { StudentRepository } from '../types';
import { StudentNotFoundError, StudentCardError } from '@educi/errors';
import { STUDENT_CARD } from '@educi/config';
import { logger } from '@educi/logger';
import { AuditStudentService } from './audit-student.service';

export class StudentCardService {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly auditService: AuditStudentService,
  ) {}

  async generate(studentId: string): Promise<string> {
    const existing = await this.studentRepo.findById(studentId);
    if (!existing) throw new StudentNotFoundError(studentId);

    try {
      const cardId = await this.studentRepo.generateCard(studentId);

      await this.auditService.log({
        action: 'STUDENT_CARD_GENERATE',
        studentId,
        details: { cardId },
      });

      logger.info('Student card generated', { studentId }, 'students');
      return cardId;
    } catch (err) {
      throw new StudentCardError();
    }
  }

  getCardDimensions() {
    return {
      width: STUDENT_CARD.WIDTH,
      height: STUDENT_CARD.HEIGHT,
      unit: STUDENT_CARD.UNIT,
    };
  }
}
