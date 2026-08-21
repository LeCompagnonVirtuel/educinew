import type { TeacherRepository, TeacherContract } from '../types';
import { TeacherNotFoundError, TeacherContractError } from '@educi/errors';
import { logger } from '@educi/logger';
import { AuditTeacherService } from './audit-teacher.service';

export class ContractService {
  constructor(
    private readonly teacherRepo: TeacherRepository,
    private readonly auditService: AuditTeacherService,
  ) {}

  async getContracts(teacherId: string) {
    const existing = await this.teacherRepo.findById(teacherId);
    if (!existing) throw new TeacherNotFoundError(teacherId);

    return this.teacherRepo.getContracts(teacherId);
  }

  async createContract(data: Omit<TeacherContract, 'id' | 'createdAt' | 'updatedAt'>) {
    const existing = await this.teacherRepo.findById(data.teacherId);
    if (!existing) throw new TeacherNotFoundError(data.teacherId);

    if (data.endDate && data.startDate > data.endDate) {
      throw new TeacherContractError('La date de fin doit être après la date de début');
    }

    await this.auditService.log({
      action: 'TEACHER_CONTRACT_UPDATE',
      teacherId: data.teacherId,
      details: { contractType: data.contractType, startDate: data.startDate },
    });
    logger.info('Contract created', { teacherId: data.teacherId }, 'teachers');
  }
}
