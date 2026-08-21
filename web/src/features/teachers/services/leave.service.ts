import type { TeacherRepository, TeacherLeave } from '../types';
import { TeacherNotFoundError, TeacherLeaveError } from '@educi/errors';
import { TEACHER_LEAVE } from '@educi/config';
import { logger } from '@educi/logger';
import { AuditTeacherService } from './audit-teacher.service';

export class LeaveService {
  constructor(
    private readonly teacherRepo: TeacherRepository,
    private readonly auditService: AuditTeacherService,
  ) {}

  async getLeaves(teacherId: string) {
    const existing = await this.teacherRepo.findById(teacherId);
    if (!existing) throw new TeacherNotFoundError(teacherId);

    return this.teacherRepo.getLeaves(teacherId);
  }

  async requestLeave(data: Omit<TeacherLeave, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'approvedBy' | 'approvedAt' | 'rejectionReason'>) {
    const existing = await this.teacherRepo.findById(data.teacherId);
    if (!existing) throw new TeacherNotFoundError(data.teacherId);

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const daysCount = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    if (daysCount > TEACHER_LEAVE.MAX_DAYS_PER_YEAR) {
      throw new TeacherLeaveError(`Maximum ${TEACHER_LEAVE.MAX_DAYS_PER_YEAR} jours de congé par an`);
    }

    if (data.leaveType === 'MALADIE' && daysCount > TEACHER_LEAVE.MALADIE_MAX_CONSECUTIVE_DAYS) {
      throw new TeacherLeaveError(`Maximum ${TEACHER_LEAVE.MALADIE_MAX_CONSECUTIVE_DAYS} jours consécutifs pour congé maladie`);
    }

    await this.auditService.log({
      action: 'TEACHER_LEAVE',
      teacherId: data.teacherId,
      details: { leaveType: data.leaveType, startDate: data.startDate, endDate: data.endDate, daysCount },
    });
    logger.info('Leave requested', { teacherId: data.teacherId, daysCount }, 'teachers');
  }

  async approveLeave(teacherId: string, leaveId: string, approvedBy: string) {
    const existing = await this.teacherRepo.findById(teacherId);
    if (!existing) throw new TeacherNotFoundError(teacherId);

    await this.auditService.log({
      action: 'TEACHER_LEAVE',
      teacherId,
      details: { leaveId, action: 'APPROVED', approvedBy },
    });
    logger.info('Leave approved', { teacherId, leaveId }, 'teachers');
  }

  async rejectLeave(teacherId: string, leaveId: string, rejectedBy: string, reason: string) {
    const existing = await this.teacherRepo.findById(teacherId);
    if (!existing) throw new TeacherNotFoundError(teacherId);

    await this.auditService.log({
      action: 'TEACHER_LEAVE',
      teacherId,
      details: { leaveId, action: 'REJECTED', rejectedBy, reason },
    });
    logger.info('Leave rejected', { teacherId, leaveId }, 'teachers');
  }
}
