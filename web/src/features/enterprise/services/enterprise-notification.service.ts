import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createEnterpriseNotificationService(repo: EnterpriseRepositoryExtended) {
  return {
    async findNotifications(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findNotifications(enterpriseId, filters);
    },

    async findNotificationById(enterpriseId: string, notificationId: string) {
      if (!enterpriseId || !notificationId) throw new AppError('Identifiants requis');
      const notification = await repo.findNotificationById(enterpriseId, notificationId);
      if (!notification) throw new AppError('Notification non trouvée');
      return notification;
    },

    async createNotification(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!data?.title) throw new AppError('Le titre est requis');
      if (!data?.message) throw new AppError('Le message est requis');
      return repo.createNotification({ ...data, enterprise_id: enterpriseId });
    },

    async updateNotification(enterpriseId: string, notificationId: string, data: any) {
      if (!enterpriseId || !notificationId) throw new AppError('Identifiants requis');
      const existing = await repo.findNotificationById(enterpriseId, notificationId);
      if (!existing) throw new AppError('Notification non trouvée');
      return repo.updateNotification(enterpriseId, notificationId, data);
    },

    async deleteNotification(enterpriseId: string, notificationId: string) {
      if (!enterpriseId || !notificationId) throw new AppError('Identifiants requis');
      const existing = await repo.findNotificationById(enterpriseId, notificationId);
      if (!existing) throw new AppError('Notification non trouvée');
      return repo.deleteNotification(enterpriseId, notificationId);
    },

    async sendNotification(enterpriseId: string, notificationId: string) {
      if (!enterpriseId || !notificationId) throw new AppError('Identifiants requis');
      const existing = await repo.findNotificationById(enterpriseId, notificationId);
      if (!existing) throw new AppError('Notification non trouvée');
      return repo.sendNotification(enterpriseId, notificationId);
    },
  };
}
