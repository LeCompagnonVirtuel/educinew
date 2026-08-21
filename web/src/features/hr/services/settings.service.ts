import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createSettingsService(repo: HRRepositoryExtended) {
  return {
    async getSettings(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const settings = await repo.getSchoolSettings(schoolId);
      return settings;
    },

    async updateSettings(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const existing = await repo.getSchoolSettings(schoolId);
      if (!existing) throw new AppError('Paramètres non trouvés');

      const { data: result, error } = await (repo as any).supabase
        .from('school_settings')
        .update(data)
        .eq('school_id', schoolId)
        .select()
        .single();
      if (error) throw error;
      return result;
    },

    async getLeavePolicy(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const settings = await repo.getSchoolSettings(schoolId);
      return settings?.leave_policy || {};
    },

    async getWorkSchedule(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const settings = await repo.getSchoolSettings(schoolId);
      return settings?.work_schedule || {};
    },

    async getNotificationSettings(schoolId: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const settings = await repo.getSchoolSettings(schoolId);
      return settings?.notification_settings || {};
    },
  };
}
