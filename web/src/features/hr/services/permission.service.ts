import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createPermissionService(repo: HRRepositoryExtended) {
  return {
    async canViewEmployee(userId: string, schoolId: string) {
      if (!userId || !schoolId) throw new AppError('Identifiants requis');
      const user = await repo.findUser(userId);
      if (!user) throw new AppError('Utilisateur non trouvé');
      return user.school_id === schoolId;
    },

    async canEditEmployee(userId: string, schoolId: string) {
      if (!userId || !schoolId) throw new AppError('Identifiants requis');
      const user = await repo.findUser(userId);
      if (!user) throw new AppError('Utilisateur non trouvé');
      if (user.school_id !== schoolId) return false;
      return ['admin', 'hr_manager', 'hr_officer'].includes(user.role);
    },

    async canDeleteEmployee(userId: string, schoolId: string) {
      if (!userId || !schoolId) throw new AppError('Identifiants requis');
      const user = await repo.findUser(userId);
      if (!user) throw new AppError('Utilisateur non trouvé');
      if (user.school_id !== schoolId) return false;
      return ['admin', 'hr_manager'].includes(user.role);
    },

    async canApproveLeave(userId: string, schoolId: string) {
      if (!userId || !schoolId) throw new AppError('Identifiants requis');
      const user = await repo.findUser(userId);
      if (!user) throw new AppError('Utilisateur non trouvé');
      if (user.school_id !== schoolId) return false;
      return ['admin', 'hr_manager', 'hr_officer', 'department_head'].includes(user.role);
    },

    async canManageDepartment(userId: string, schoolId: string) {
      if (!userId || !schoolId) throw new AppError('Identifiants requis');
      const user = await repo.findUser(userId);
      if (!user) throw new AppError('Utilisateur non trouvé');
      if (user.school_id !== schoolId) return false;
      return ['admin', 'hr_manager'].includes(user.role);
    },

    async canManageRecruitment(userId: string, schoolId: string) {
      if (!userId || !schoolId) throw new AppError('Identifiants requis');
      const user = await repo.findUser(userId);
      if (!user) throw new AppError('Utilisateur non trouvé');
      if (user.school_id !== schoolId) return false;
      return ['admin', 'hr_manager', 'hr_officer'].includes(user.role);
    },

    async canViewReports(userId: string, schoolId: string) {
      if (!userId || !schoolId) throw new AppError('Identifiants requis');
      const user = await repo.findUser(userId);
      if (!user) throw new AppError('Utilisateur non trouvé');
      if (user.school_id !== schoolId) return false;
      return ['admin', 'hr_manager', 'hr_officer'].includes(user.role);
    },

    async canManageSettings(userId: string, schoolId: string) {
      if (!userId || !schoolId) throw new AppError('Identifiants requis');
      const user = await repo.findUser(userId);
      if (!user) throw new AppError('Utilisateur non trouvé');
      if (user.school_id !== schoolId) return false;
      return user.role === 'admin';
    },
  };
}
