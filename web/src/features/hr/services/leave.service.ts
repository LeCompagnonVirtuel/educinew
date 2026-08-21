import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createLeaveService(repo: HRRepositoryExtended) {
  return {
    async findLeaves(schoolId: string, employeeId?: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findLeaves(schoolId, employeeId);
    },

    async findLeaveById(schoolId: string, leaveId: string) {
      if (!schoolId || !leaveId) throw new AppError('Identifiants requis');
      const leave = await repo.findLeaveById(schoolId, leaveId);
      if (!leave) throw new AppError('Demande de congé non trouvée');
      return leave;
    },

    async findPendingLeaves(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      return repo.findPendingLeaves(schoolId);
    },

    async createLeave(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.employee_id) throw new AppError('L\'identifiant de l\'employé est requis');
      if (!data?.leave_type) throw new AppError('Le type de congé est requis');
      if (!data?.start_date) throw new AppError('La date de début est requise');
      if (!data?.end_date) throw new AppError('La date de fin est requise');

      if (new Date(data.end_date) < new Date(data.start_date)) {
        throw new AppError('La date de fin doit être postérieure à la date de début');
      }

      const balance = await repo.findLeaveBalance(schoolId, data.employee_id, data.leave_type);
      if (balance) {
        const requestedDays = Math.ceil(
          (new Date(data.end_date).getTime() - new Date(data.start_date).getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;
        const remainingDays = (balance.total_days || 0) - (balance.days_used || 0);
        if (requestedDays > remainingDays) {
          throw new AppError(`Solde de congé insuffisant. Jours restants: ${remainingDays}`);
        }
      }

      return repo.createLeave({ ...data, school_id: schoolId, status: 'pending' });
    },

    async updateLeave(schoolId: string, leaveId: string, data: any) {
      if (!schoolId || !leaveId) throw new AppError('Identifiants requis');
      const existing = await repo.findLeaveById(schoolId, leaveId);
      if (!existing) throw new AppError('Demande de congé non trouvée');
      if (existing.status !== 'pending') throw new AppError('Seules les demandes en attente peuvent être modifiées');
      return repo.updateLeave(schoolId, leaveId, data);
    },

    async approveLeave(schoolId: string, leaveId: string, approvedBy: string, approved: boolean, rejectionReason?: string) {
      if (!schoolId || !leaveId || !approvedBy) throw new AppError('Identifiants requis');
      const existing = await repo.findLeaveById(schoolId, leaveId);
      if (!existing) throw new AppError('Demande de congé non trouvée');
      if (existing.status !== 'pending') throw new AppError('Cette demande a déjà été traitée');

      const result = await repo.approveLeave(schoolId, leaveId, approvedBy, approved, rejectionReason);

      if (approved) {
        const daysUsed = Math.ceil(
          (new Date(existing.end_date).getTime() - new Date(existing.start_date).getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;
        const balance = await repo.findLeaveBalance(schoolId, existing.employee_id, existing.leave_type);
        const currentDaysUsed = balance?.days_used || 0;
        await repo.updateLeaveBalance(schoolId, existing.employee_id, existing.leave_type, currentDaysUsed + daysUsed);
      }

      return result;
    },

    async findLeaveBalance(schoolId: string, employeeId: string, leaveType: string) {
      if (!schoolId || !employeeId || !leaveType) throw new AppError('Identifiants requis');
      return repo.findLeaveBalance(schoolId, employeeId, leaveType);
    },

    async updateLeaveBalance(schoolId: string, employeeId: string, leaveType: string, daysUsed: number) {
      if (!schoolId || !employeeId || !leaveType) throw new AppError('Identifiants requis');
      if (daysUsed < 0) throw new AppError('Le nombre de jours utilisé ne peut pas être négatif');
      return repo.updateLeaveBalance(schoolId, employeeId, leaveType, daysUsed);
    },
  };
}
