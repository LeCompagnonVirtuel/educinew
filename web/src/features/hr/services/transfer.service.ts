import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createTransferService(repo: HRRepositoryExtended) {
  return {
    async findTransfers(schoolId: string, employeeId?: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findTransfers(schoolId, employeeId);
    },

    async findTransferById(schoolId: string, transferId: string) {
      if (!schoolId || !transferId) throw new AppError('Identifiants requis');
      const transfer = await repo.findTransferById(schoolId, transferId);
      if (!transfer) throw new AppError('Transfert non trouvé');
      return transfer;
    },

    async createTransfer(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.employee_id) throw new AppError('L\'identifiant de l\'employé est requis');
      if (!data?.new_department_id) throw new AppError('Le nouveau département est requis');

      const employee = await repo.findEmployeeById(schoolId, data.employee_id);
      if (!employee) throw new AppError('Employé non trouvé');

      return repo.createTransfer({ ...data, school_id: schoolId });
    },

    async updateTransfer(schoolId: string, transferId: string, data: any) {
      if (!schoolId || !transferId) throw new AppError('Identifiants requis');
      const existing = await repo.findTransferById(schoolId, transferId);
      if (!existing) throw new AppError('Transfert non trouvé');
      return repo.updateTransfer(schoolId, transferId, data);
    },

    async findTransfersByEmployee(schoolId: string, employeeId: string) {
      if (!schoolId || !employeeId) throw new AppError('Identifiants requis');
      return repo.findTransfers(schoolId, employeeId);
    },
  };
}
