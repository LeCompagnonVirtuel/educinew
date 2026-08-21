import type { HRRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createNotificationService(repo: HRRepositoryExtended) {
  return {
    async findNotifications(schoolId: string, employeeId?: string) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      const { data, error } = await (repo as any).supabase
        .from('hr_notifications')
        .select('*')
        .eq('school_id', schoolId)
        .eq(employeeId ? 'employee_id' : 'school_id', employeeId || schoolId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },

    async findNotificationById(schoolId: string, notificationId: string) {
      if (!schoolId || !notificationId) throw new AppError('Identifiants requis');
      const { data } = await (repo as any).supabase
        .from('hr_notifications')
        .select('*')
        .eq('school_id', schoolId)
        .eq('id', notificationId)
        .single();
      if (!data) throw new AppError('Notification non trouvée');
      return data;
    },

    async createNotification(schoolId: string, data: any) {
      if (!schoolId) throw new AppError('Identifiant de l\'école requis');
      if (!data?.title) throw new AppError('Le titre est requis');
      if (!data?.message) throw new AppError('Le message est requis');

      const { data: result, error } = await (repo as any).supabase
        .from('hr_notifications')
        .insert({ ...data, school_id: schoolId })
        .select()
        .single();
      if (error) throw error;
      return result;
    },

    async markAsRead(schoolId: string, notificationId: string) {
      if (!schoolId || !notificationId) throw new AppError('Identifiants requis');
      const { data: existing } = await (repo as any).supabase
        .from('hr_notifications')
        .select('*')
        .eq('school_id', schoolId)
        .eq('id', notificationId)
        .single();
      if (!existing) throw new AppError('Notification non trouvée');

      const { data: result, error } = await (repo as any).supabase
        .from('hr_notifications')
        .update({ read: true, read_at: new Date().toISOString() })
        .eq('school_id', schoolId)
        .eq('id', notificationId)
        .select()
        .single();
      if (error) throw error;
      return result;
    },

    async deleteNotification(schoolId: string, notificationId: string) {
      if (!schoolId || !notificationId) throw new AppError('Identifiants requis');
      const { data: existing } = await (repo as any).supabase
        .from('hr_notifications')
        .select('*')
        .eq('school_id', schoolId)
        .eq('id', notificationId)
        .single();
      if (!existing) throw new AppError('Notification non trouvée');

      const { error } = await (repo as any).supabase
        .from('hr_notifications')
        .delete()
        .eq('school_id', schoolId)
        .eq('id', notificationId);
      if (error) throw error;
    },
  };
}
