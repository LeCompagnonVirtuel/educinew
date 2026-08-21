import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createContractService(repo: HRRepositoryExtended) {
  return {
    async findContracts(schoolId: string, employeeId?: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findContracts(schoolId, employeeId);
    },

    async findContractById(schoolId: string, contractId: string) {
      if (!schoolId || !contractId) throw new AppError('Identifiants requis');
      const contract = await repo.findContractById(schoolId, contractId);
      if (!contract) throw new AppError('Contrat non trouvé');
      return contract;
    },

    async findActiveContract(schoolId: string, employeeId: string) {
      if (!schoolId || !employeeId) throw new AppError('Identifiants requis');
      return repo.findActiveContract(schoolId, employeeId);
    },

    async createContract(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.employee_id) throw new AppError('L\'identifiant de l\'employé est requis');
      if (!data?.contract_type) throw new AppError('Le type de contrat est requis');
      if (!data?.start_date) throw new AppError('La date de début est requise');

      const existingContract = await repo.findActiveContract(schoolId, data.employee_id);
      if (existingContract) throw new AppError('L\'employé a déjà un contrat actif');

      return repo.createContract({ ...data, school_id: schoolId });
    },

    async updateContract(schoolId: string, contractId: string, data: any) {
      if (!schoolId || !contractId) throw new AppError('Identifiants requis');
      const existing = await repo.findContractById(schoolId, contractId);
      if (!existing) throw new AppError('Contrat non trouvé');
      return repo.updateContract(schoolId, contractId, data);
    },

    async endContract(schoolId: string, contractId: string, endDate: string) {
      if (!schoolId || !contractId) throw new AppError('Identifiants requis');
      if (!endDate) throw new AppError('La date de fin est requise');
      const existing = await repo.findContractById(schoolId, contractId);
      if (!existing) throw new AppError('Contrat non trouvé');
      if (existing.status !== 'active') throw new AppError('Seuls les contrats actifs peuvent être terminés');
      return repo.endContract(schoolId, contractId, endDate);
    },

    async renewContract(schoolId: string, contractId: string, newEndDate: string) {
      if (!schoolId || !contractId) throw new AppError('Identifiants requis');
      if (!newEndDate) throw new AppError('La nouvelle date de fin est requise');
      const existing = await repo.findContractById(schoolId, contractId);
      if (!existing) throw new AppError('Contrat non trouvé');
      return repo.updateContract(schoolId, contractId, { end_date: newEndDate });
    },
  };
}
