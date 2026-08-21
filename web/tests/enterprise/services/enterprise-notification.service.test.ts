import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('EnterpriseNotificationService', () => {
  const mockRepo = {
    findNotifications: vi.fn(),
    findNotificationById: vi.fn(),
    createNotification: vi.fn(),
    updateNotification: vi.fn(),
    deleteNotification: vi.fn(),
    markAsRead: vi.fn(),
    markAllAsRead: vi.fn(),
    getUnreadCount: vi.fn(),
    getNotificationPreferences: vi.fn(),
    updatePreferences: vi.fn(),
    sendBulkNotification: vi.fn(),
    getNotificationTemplates: vi.fn(),
    createTemplate: vi.fn(),
    getNotificationStats: vi.fn(),
  };

  const enterpriseId = 'ent-1';
  const notificationId = 'notif-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findNotifications', () => {
    it('should return notifications', async () => {
      const notifs = [{ id: notificationId, title: 'New enrollment', read: false }];
      mockRepo.findNotifications.mockResolvedValue(notifs);
      const result = await mockRepo.findNotifications(enterpriseId, 'usr-1');
      expect(result).toEqual(notifs);
    });

    it('should filter by read status', async () => {
      mockRepo.findNotifications.mockResolvedValue([]);
      await mockRepo.findNotifications(enterpriseId, 'usr-1', { read: false });
      expect(mockRepo.findNotifications).toHaveBeenCalled();
    });

    it('should filter by type', async () => {
      mockRepo.findNotifications.mockResolvedValue([]);
      await mockRepo.findNotifications(enterpriseId, 'usr-1', { type: 'enrollment' });
      expect(mockRepo.findNotifications).toHaveBeenCalled();
    });

    it('should paginate results', async () => {
      mockRepo.findNotifications.mockResolvedValue([]);
      await mockRepo.findNotifications(enterpriseId, 'usr-1', { page: 1, limit: 20 });
      expect(mockRepo.findNotifications).toHaveBeenCalled();
    });

    it('should handle empty results', async () => {
      mockRepo.findNotifications.mockResolvedValue([]);
      const result = await mockRepo.findNotifications(enterpriseId, 'usr-1');
      expect(result).toHaveLength(0);
    });

    it('should sort by date descending', async () => {
      mockRepo.findNotifications.mockResolvedValue([]);
      await mockRepo.findNotifications(enterpriseId, 'usr-1', { sortBy: 'createdAt', order: 'desc' });
      expect(mockRepo.findNotifications).toHaveBeenCalled();
    });
  });

  describe('findNotificationById', () => {
    it('should return notification by id', async () => {
      const notif = { id: notificationId, title: 'New enrollment' };
      mockRepo.findNotificationById.mockResolvedValue(notif);
      const result = await mockRepo.findNotificationById(notificationId);
      expect(result).toEqual(notif);
    });

    it('should throw if not found', async () => {
      mockRepo.findNotificationById.mockResolvedValue(null);
      const findOrThrow = async (id: string) => {
        const notif = await mockRepo.findNotificationById(id);
        if (!notif) throw new Error('Notification non trouvée');
      };
      await expect(findOrThrow('nonexistent')).rejects.toThrow('Notification non trouvée');
    });

    it('should require notificationId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant requis');
      };
      expect(() => validate('')).toThrow('Identifiant requis');
    });

    it('should include action URL', async () => {
      mockRepo.findNotificationById.mockResolvedValue({ id: notificationId, actionUrl: '/schools/sch-1' });
      const result = await mockRepo.findNotificationById(notificationId);
      expect(result.actionUrl).toBe('/schools/sch-1');
    });

    it('should include related entity', async () => {
      mockRepo.findNotificationById.mockResolvedValue({ id: notificationId, entityType: 'school', entityId: 'sch-1' });
      const result = await mockRepo.findNotificationById(notificationId);
      expect(result.entityType).toBe('school');
    });
  });

  describe('createNotification', () => {
    it('should create notification', async () => {
      const data = { title: 'New enrollment', message: 'A new student enrolled', userId: 'usr-1', type: 'enrollment' };
      mockRepo.createNotification.mockResolvedValue({ id: notificationId, ...data, read: false, createdAt: new Date().toISOString() });
      const result = await mockRepo.createNotification({ ...data, enterprise_id: enterpriseId });
      expect(result.title).toBe('New enrollment');
    });

    it('should require title', () => {
      const validate = (data: any) => {
        if (!data?.title) throw new Error('Le titre est requis');
      };
      expect(() => validate({ message: 'Msg' })).toThrow('Le titre est requis');
    });

    it('should require message', () => {
      const validate = (data: any) => {
        if (!data?.message) throw new Error('Le message est requis');
      };
      expect(() => validate({ title: 'Title' })).toThrow('Le message est requis');
    });

    it('should require userId', () => {
      const validate = (data: any) => {
        if (!data?.userId) throw new Error('L\'utilisateur est requis');
      };
      expect(() => validate({ title: 'T', message: 'M' })).toThrow('L\'utilisateur est requis');
    });

    it('should validate title length', () => {
      const validate = (title: string) => {
        if (title.length < 3 || title.length > 200) throw new Error('Le titre doit contenir entre 3 et 200 caractères');
      };
      expect(() => validate('Hi')).toThrow();
      expect(() => validate('Valid title')).not.toThrow();
    });

    it('should set read to false by default', async () => {
      mockRepo.createNotification.mockResolvedValue({ id: notificationId, read: false });
      const result = await mockRepo.createNotification({ title: 'T', message: 'M', userId: 'usr-1', enterprise_id: enterpriseId });
      expect(result.read).toBe(false);
    });

    it('should set timestamp automatically', async () => {
      mockRepo.createNotification.mockResolvedValue({ id: notificationId, createdAt: new Date().toISOString() });
      const result = await mockRepo.createNotification({ title: 'T', message: 'M', userId: 'usr-1', enterprise_id: enterpriseId });
      expect(result.createdAt).toBeDefined();
    });

    it('should accept valid notification types', () => {
      const validTypes = ['enrollment', 'system', 'alert', 'reminder', 'update'];
      const validate = (type: string) => {
        if (!validTypes.includes(type)) throw new Error('Type invalide');
      };
      expect(() => validate('enrollment')).not.toThrow();
      expect(() => validate('invalid')).toThrow();
    });
  });

  describe('updateNotification', () => {
    it('should update notification', async () => {
      mockRepo.findNotificationById.mockResolvedValue({ id: notificationId, title: 'Old' });
      mockRepo.updateNotification.mockResolvedValue({ id: notificationId, title: 'Updated' });
      const result = await mockRepo.updateNotification(notificationId, { title: 'Updated' });
      expect(result.title).toBe('Updated');
    });

    it('should throw if not found', async () => {
      mockRepo.findNotificationById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const notif = await mockRepo.findNotificationById(notificationId);
        if (!notif) throw new Error('Notification non trouvée');
      };
      await expect(updateOrThrow()).rejects.toThrow('Notification non trouvée');
    });

    it('should allow marking as read', async () => {
      mockRepo.findNotificationById.mockResolvedValue({ id: notificationId });
      mockRepo.updateNotification.mockResolvedValue({ read: true, readAt: new Date().toISOString() });
      const result = await mockRepo.updateNotification(notificationId, { read: true });
      expect(result.read).toBe(true);
    });

    it('should validate update data', () => {
      const validate = (data: any) => {
        if (data.title && data.title.length < 3) throw new Error('Le titre est trop court');
      };
      expect(() => validate({ title: 'Hi' })).toThrow();
      expect(() => validate({ title: 'Valid' })).not.toThrow();
    });
  });

  describe('deleteNotification', () => {
    it('should delete notification', async () => {
      mockRepo.findNotificationById.mockResolvedValue({ id: notificationId });
      mockRepo.deleteNotification.mockResolvedValue(undefined);
      await mockRepo.deleteNotification(notificationId);
      expect(mockRepo.deleteNotification).toHaveBeenCalledWith(notificationId);
    });

    it('should throw if not found', async () => {
      mockRepo.findNotificationById.mockResolvedValue(null);
      const deleteOrThrow = async () => {
        const notif = await mockRepo.findNotificationById(notificationId);
        if (!notif) throw new Error('Notification non trouvée');
      };
      await expect(deleteOrThrow()).rejects.toThrow('Notification non trouvée');
    });

    it('should not delete system notifications', async () => {
      mockRepo.findNotificationById.mockResolvedValue({ id: notificationId, type: 'system' });
      const deleteOrThrow = async () => {
        const notif = await mockRepo.findNotificationById(notificationId);
        if (notif?.type === 'system') throw new Error('Les notifications système ne peuvent pas être supprimées');
      };
      await expect(deleteOrThrow()).rejects.toThrow();
    });

    it('should soft delete notification', async () => {
      mockRepo.findNotificationById.mockResolvedValue({ id: notificationId });
      mockRepo.deleteNotification.mockResolvedValue({ deleted: true });
      const result = await mockRepo.deleteNotification(notificationId);
      expect(result.deleted).toBe(true);
    });
  });

  describe('markAsRead', () => {
    it('should mark notification as read', async () => {
      mockRepo.markAsRead.mockResolvedValue({ id: notificationId, read: true, readAt: new Date().toISOString() });
      const result = await mockRepo.markAsRead(notificationId);
      expect(result.read).toBe(true);
    });

    it('should handle already read', async () => {
      mockRepo.markAsRead.mockResolvedValue({ id: notificationId, read: true, alreadyRead: true });
      const result = await mockRepo.markAsRead(notificationId);
      expect(result.alreadyRead).toBe(true);
    });

    it('should set read timestamp', async () => {
      mockRepo.markAsRead.mockResolvedValue({ readAt: new Date().toISOString() });
      const result = await mockRepo.markAsRead(notificationId);
      expect(result.readAt).toBeDefined();
    });
  });

  describe('markAllAsRead', () => {
    it('should mark all notifications as read', async () => {
      mockRepo.markAllAsRead.mockResolvedValue({ markedCount: 15 });
      const result = await mockRepo.markAllAsRead(enterpriseId, 'usr-1');
      expect(result.markedCount).toBe(15);
    });

    it('should handle no unread notifications', async () => {
      mockRepo.markAllAsRead.mockResolvedValue({ markedCount: 0 });
      const result = await mockRepo.markAllAsRead(enterpriseId, 'usr-1');
      expect(result.markedCount).toBe(0);
    });

    it('should filter by type', async () => {
      mockRepo.markAllAsRead.mockResolvedValue({ markedCount: 5 });
      const result = await mockRepo.markAllAsRead(enterpriseId, 'usr-1', { type: 'enrollment' });
      expect(result.markedCount).toBe(5);
    });
  });

  describe('getUnreadCount', () => {
    it('should return unread count', async () => {
      mockRepo.getUnreadCount.mockResolvedValue(10);
      const result = await mockRepo.getUnreadCount(enterpriseId, 'usr-1');
      expect(result).toBe(10);
    });

    it('should return zero when all read', async () => {
      mockRepo.getUnreadCount.mockResolvedValue(0);
      const result = await mockRepo.getUnreadCount(enterpriseId, 'usr-1');
      expect(result).toBe(0);
    });

    it('should filter by type', async () => {
      mockRepo.getUnreadCount.mockResolvedValue(3);
      const result = await mockRepo.getUnreadCount(enterpriseId, 'usr-1', { type: 'alert' });
      expect(result).toBe(3);
    });
  });

  describe('getNotificationPreferences', () => {
    it('should return user preferences', async () => {
      mockRepo.getNotificationPreferences.mockResolvedValue({ email: true, push: true, sms: false });
      const result = await mockRepo.getNotificationPreferences(enterpriseId, 'usr-1');
      expect(result.email).toBe(true);
    });

    it('should include type preferences', async () => {
      mockRepo.getNotificationPreferences.mockResolvedValue({ types: { enrollment: true, system: false } });
      const result = await mockRepo.getNotificationPreferences(enterpriseId, 'usr-1');
      expect(result.types.enrollment).toBe(true);
    });

    it('should handle default preferences', async () => {
      mockRepo.getNotificationPreferences.mockResolvedValue(null);
      const result = await mockRepo.getNotificationPreferences(enterpriseId, 'usr-1');
      expect(result).toBeNull();
    });
  });

  describe('updatePreferences', () => {
    it('should update notification preferences', async () => {
      mockRepo.updatePreferences.mockResolvedValue({ email: false, push: true });
      const result = await mockRepo.updatePreferences(enterpriseId, 'usr-1', { email: false });
      expect(result.email).toBe(false);
    });

    it('should validate channel values', () => {
      const validate = (channels: any) => {
        const validChannels = ['email', 'push', 'sms', 'in_app'];
        Object.keys(channels).forEach(ch => {
          if (!validChannels.includes(ch)) throw new Error('Canal invalide');
        });
      };
      expect(() => validate({ email: true })).not.toThrow();
      expect(() => validate({ invalid: true })).toThrow();
    });

    it('should handle partial update', async () => {
      mockRepo.updatePreferences.mockResolvedValue({ email: true, push: false, sms: true });
      const result = await mockRepo.updatePreferences(enterpriseId, 'usr-1', { push: false });
      expect(result.push).toBe(false);
    });
  });

  describe('sendBulkNotification', () => {
    it('should send bulk notification', async () => {
      mockRepo.sendBulkNotification.mockResolvedValue({ sent: 50, failed: 2 });
      const result = await mockRepo.sendBulkNotification(enterpriseId, { title: 'System update', message: 'Scheduled maintenance', targetUserIds: ['usr-1', 'usr-2'] });
      expect(result.sent).toBe(50);
    });

    it('should require title and message', () => {
      const validate = (data: any) => {
        if (!data?.title || !data?.message) throw new Error('Titre et message requis');
      };
      expect(() => validate({})).toThrow('Titre et message requis');
    });

    it('should handle no recipients', async () => {
      mockRepo.sendBulkNotification.mockResolvedValue({ sent: 0, failed: 0 });
      const result = await mockRepo.sendBulkNotification(enterpriseId, { title: 'T', message: 'M', targetUserIds: [] });
      expect(result.sent).toBe(0);
    });

    it('should report partial failures', async () => {
      mockRepo.sendBulkNotification.mockResolvedValue({ sent: 48, failed: 2, errors: ['usr-5: invalid email'] });
      const result = await mockRepo.sendBulkNotification(enterpriseId, { title: 'T', message: 'M', targetUserIds: ['usr-1'] });
      expect(result.errors).toHaveLength(1);
    });

    it('should support role targeting', async () => {
      mockRepo.sendBulkNotification.mockResolvedValue({ sent: 20 });
      const result = await mockRepo.sendBulkNotification(enterpriseId, { title: 'T', message: 'M', targetRole: 'admin' });
      expect(result.sent).toBe(20);
    });
  });

  describe('getNotificationTemplates', () => {
    it('should return templates', async () => {
      mockRepo.getNotificationTemplates.mockResolvedValue([{ id: 'tpl-1', name: 'Enrollment confirmation' }]);
      const result = await mockRepo.getNotificationTemplates(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should filter by category', async () => {
      mockRepo.getNotificationTemplates.mockResolvedValue([]);
      await mockRepo.getNotificationTemplates(enterpriseId, { category: 'enrollment' });
      expect(mockRepo.getNotificationTemplates).toHaveBeenCalled();
    });

    it('should handle no templates', async () => {
      mockRepo.getNotificationTemplates.mockResolvedValue([]);
      const result = await mockRepo.getNotificationTemplates(enterpriseId);
      expect(result).toHaveLength(0);
    });
  });

  describe('createTemplate', () => {
    it('should create notification template', async () => {
      mockRepo.createTemplate.mockResolvedValue({ id: 'tpl-1', name: 'Welcome', subject: 'Welcome to {{school}}' });
      const result = await mockRepo.createTemplate({ name: 'Welcome', subject: 'Welcome to {{school}}', body: 'Hello {{name}}', enterprise_id: enterpriseId });
      expect(result.name).toBe('Welcome');
    });

    it('should require name', () => {
      const validate = (data: any) => {
        if (!data?.name) throw new Error('Le nom est requis');
      };
      expect(() => validate({ subject: 'S' })).toThrow('Le nom est requis');
    });

    it('should require subject', () => {
      const validate = (data: any) => {
        if (!data?.subject) throw new Error('L\'objet est requis');
      };
      expect(() => validate({ name: 'N' })).toThrow('L\'objet est requis');
    });

    it('should validate template variables', () => {
      const validate = (template: string) => {
        const matches = template.match(/\{\{(\w+)\}\}/g);
        return matches ? matches.map(m => m.replace(/\{\{|\}\}/g, '')) : [];
      };
      const vars = validate('Hello {{name}}, welcome to {{school}}');
      expect(vars).toContain('name');
      expect(vars).toContain('school');
    });

    it('should reject duplicate template name', async () => {
      mockRepo.getNotificationTemplates.mockResolvedValue([{ name: 'Existing' }]);
      const createOrThrow = async (name: string) => {
        const templates = await mockRepo.getNotificationTemplates(enterpriseId);
        if (templates.some((t: any) => t.name === name)) throw new Error('Un template avec ce nom existe déjà');
      };
      await expect(createOrThrow('Existing')).rejects.toThrow();
    });
  });

  describe('getNotificationStats', () => {
    it('should return notification statistics', async () => {
      mockRepo.getNotificationStats.mockResolvedValue({ total: 500, unread: 50, readRate: 90 });
      const result = await mockRepo.getNotificationStats(enterpriseId);
      expect(result.total).toBe(500);
    });

    it('should include type breakdown', async () => {
      mockRepo.getNotificationStats.mockResolvedValue({ byType: { enrollment: 200, system: 150, alert: 150 } });
      const result = await mockRepo.getNotificationStats(enterpriseId);
      expect(result.byType.enrollment).toBe(200);
    });

    it('should include engagement metrics', async () => {
      mockRepo.getNotificationStats.mockResolvedValue({ clickRate: 35, openRate: 75 });
      const result = await mockRepo.getNotificationStats(enterpriseId);
      expect(result.clickRate).toBe(35);
    });

    it('should handle zero notifications', async () => {
      mockRepo.getNotificationStats.mockResolvedValue({ total: 0 });
      const result = await mockRepo.getNotificationStats(enterpriseId);
      expect(result.total).toBe(0);
    });

    it('should include delivery stats', async () => {
      mockRepo.getNotificationStats.mockResolvedValue({ delivered: 480, bounced: 15, failed: 5 });
      const result = await mockRepo.getNotificationStats(enterpriseId);
      expect(result.delivered).toBe(480);
    });
  });
});
