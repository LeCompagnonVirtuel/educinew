import type { StudentRepository, StudentTimeline } from '../types';
import { STUDENT_TIMELINE } from '@educi/config';
import { logger } from '@educi/logger';
import { AuditStudentService } from './audit-student.service';

export class TimelineService {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly auditService: AuditStudentService,
  ) {}

  async getTimeline(studentId: string, limit?: number) {
    return this.studentRepo.getTimeline(studentId, limit || STUDENT_TIMELINE.MAX_EVENTS);
  }

  getEventLabel(type: string): string {
    return STUDENT_TIMELINE.EVENT_LABELS[type as keyof typeof STUDENT_TIMELINE.EVENT_LABELS] || 'Autre';
  }

  getEventTypes() {
    return STUDENT_TIMELINE.EVENT_TYPES;
  }
}
