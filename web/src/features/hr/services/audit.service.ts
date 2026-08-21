import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createAuditService(repo: HRRepositoryExtended) {
  return {
    async logAuditEntry(schoolId: string, userId: string, action: string, entityType: string, entityId: string, previousValue?: Record<string, unknown>, newValue?: Record<string, unknown>) {
      if (!schoolId || !userId) throw new AppError('Identifiants requis');
      if (!action) throw new AppError('L\'action est requise');
      if (!entityType) throw new AppError('Le type d\'entité est requis');
      if (!entityId) throw new AppError('L\'identifiant de l\'entité est requis');
      return repo.logAuditEntry(schoolId, userId, action, entityType, entityId, previousValue, newValue);
    },

    async logEmployeeCreated(schoolId: string, userId: string, employeeId: string, newEmployee: Record<string, unknown>) {
      return this.logAuditEntry(schoolId, userId, 'create', 'employee', employeeId, undefined, newEmployee);
    },

    async logEmployeeUpdated(schoolId: string, userId: string, employeeId: string, previousData: Record<string, unknown>, newData: Record<string, unknown>) {
      return this.logAuditEntry(schoolId, userId, 'update', 'employee', employeeId, previousData, newData);
    },

    async logEmployeeDeleted(schoolId: string, userId: string, employeeId: string, previousData: Record<string, unknown>) {
      return this.logAuditEntry(schoolId, userId, 'delete', 'employee', employeeId, previousData, undefined);
    },

    async logLeaveAction(schoolId: string, userId: string, leaveId: string, action: string, previousData?: Record<string, unknown>, newData?: Record<string, unknown>) {
      return this.logAuditEntry(schoolId, userId, `leave_${action}`, 'leave', leaveId, previousData, newData);
    },

    async logContractAction(schoolId: string, userId: string, contractId: string, action: string, previousData?: Record<string, unknown>, newData?: Record<string, unknown>) {
      return this.logAuditEntry(schoolId, userId, `contract_${action}`, 'contract', contractId, previousData, newData);
    },
  };
}
