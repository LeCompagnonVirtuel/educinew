import type { AttendanceRepository, AttendanceCorrection } from '../types';
import { AttendanceCorrectionNotFoundError, AttendanceCorrectionError } from '@educi/errors';
import { logger } from '@educi/logger';

export class AttendanceCorrectionService {
  constructor(private readonly repo: AttendanceRepository) {}

  async create(schoolId: string, attendanceId: string, originalStatus: string, newStatus: string, reason: string, correctedBy: string): Promise<AttendanceCorrection> {
    logger.info('Creating attendance correction', { schoolId, attendanceId }, 'attendance');
    return this.repo.createCorrection({
      schoolId, attendanceId, originalStatus: originalStatus as any, newStatus: newStatus as any,
      reason, correctedBy, status: 'PENDING',
    });
  }

  async approve(id: string, approvedBy: string, reviewNote?: string): Promise<AttendanceCorrection> {
    const correction = await this.repo.findCorrection(id);
    if (!correction) throw new AttendanceCorrectionNotFoundError(id);
    if (correction.status !== 'PENDING') throw new AttendanceCorrectionError('Cette correction a déjà été traitée');
    return this.repo.updateCorrection(id, { status: 'APPROVED', approvedBy, approvedAt: new Date().toISOString(), reviewNote });
  }

  async reject(id: string, rejectedBy: string, reviewNote?: string): Promise<AttendanceCorrection> {
    const correction = await this.repo.findCorrection(id);
    if (!correction) throw new AttendanceCorrectionNotFoundError(id);
    return this.repo.updateCorrection(id, { status: 'REJECTED', approvedBy: rejectedBy, approvedAt: new Date().toISOString(), reviewNote });
  }

  async getById(schoolId: string, id: string): Promise<AttendanceCorrection> {
    const correction = await this.repo.findCorrection(id);
    if (!correction || correction.schoolId !== schoolId) throw new AttendanceCorrectionNotFoundError(id);
    return correction;
  }

  async list(schoolId: string, filters: any): Promise<{ data: AttendanceCorrection[]; total: number }> {
    return this.repo.findAllCorrections(schoolId, filters);
  }

  async getPending(schoolId: string): Promise<AttendanceCorrection[]> {
    const { data } = await this.repo.findAllCorrections(schoolId, { status: 'PENDING' });
    return data;
  }
}
