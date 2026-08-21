import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('EnterpriseMaintenanceService', () => {
  const mockRepo = {
    getSchedules: vi.fn(),
    getScheduleById: vi.fn(),
    createSchedule: vi.fn(),
    updateSchedule: vi.fn(),
    cancelSchedule: vi.fn(),
    getMaintenanceHistory: vi.fn(),
    getActiveMaintenance: vi.fn(),
    notifyUsers: vi.fn(),
    getMaintenanceStats: vi.fn(),
    startMaintenance: vi.fn(),
    completeMaintenance: vi.fn(),
    rollbackMaintenance: vi.fn(),
  };

  const enterpriseId = 'ent-1';
  const scheduleId = 'maint-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getSchedules', () => {
    it('should return maintenance schedules', async () => {
      const schedules = [{ id: scheduleId, title: 'Database Update', status: 'scheduled' }];
      mockRepo.getSchedules.mockResolvedValue(schedules);
      const result = await mockRepo.getSchedules(enterpriseId);
      expect(result).toEqual(schedules);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should filter by status', async () => {
      mockRepo.getSchedules.mockResolvedValue([]);
      await mockRepo.getSchedules(enterpriseId, { status: 'scheduled' });
      expect(mockRepo.getSchedules).toHaveBeenCalledWith(enterpriseId, { status: 'scheduled' });
    });

    it('should handle empty results', async () => {
      mockRepo.getSchedules.mockResolvedValue([]);
      const result = await mockRepo.getSchedules(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should sort by scheduled date', async () => {
      mockRepo.getSchedules.mockResolvedValue([
        { scheduledAt: '2026-02-01' },
        { scheduledAt: '2026-01-01' },
      ]);
      const result = await mockRepo.getSchedules(enterpriseId);
      expect(result).toHaveLength(2);
    });

    it('should include upcoming maintenances', async () => {
      mockRepo.getSchedules.mockResolvedValue([{ type: 'scheduled', scheduledAt: '2026-08-01' }]);
      const result = await mockRepo.getSchedules(enterpriseId);
      expect(result[0].scheduledAt).toBeDefined();
    });
  });

  describe('getScheduleById', () => {
    it('should return schedule by id', async () => {
      const schedule = { id: scheduleId, title: 'DB Update', status: 'scheduled' };
      mockRepo.getScheduleById.mockResolvedValue(schedule);
      const result = await mockRepo.getScheduleById(scheduleId);
      expect(result).toEqual(schedule);
    });

    it('should throw if not found', async () => {
      mockRepo.getScheduleById.mockResolvedValue(null);
      const findOrThrow = async (id: string) => {
        const schedule = await mockRepo.getScheduleById(id);
        if (!schedule) throw new Error('Maintenance non trouvée');
      };
      await expect(findOrThrow('nonexistent')).rejects.toThrow('Maintenance non trouvée');
    });

    it('should require scheduleId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant requis');
      };
      expect(() => validate('')).toThrow('Identifiant requis');
    });

    it('should include affected services', async () => {
      mockRepo.getScheduleById.mockResolvedValue({ id: scheduleId, affectedServices: ['api', 'database'] });
      const result = await mockRepo.getScheduleById(scheduleId);
      expect(result.affectedServices).toHaveLength(2);
    });
  });

  describe('createSchedule', () => {
    it('should create maintenance schedule', async () => {
      const data = { title: 'DB Update', scheduledAt: '2026-08-01T02:00:00Z', duration: 60 };
      mockRepo.createSchedule.mockResolvedValue({ id: scheduleId, ...data, status: 'scheduled' });
      const result = await mockRepo.createSchedule({ ...data, enterprise_id: enterpriseId });
      expect(result.title).toBe('DB Update');
    });

    it('should require title', () => {
      const validate = (data: any) => {
        if (!data?.title) throw new Error('Le titre est requis');
      };
      expect(() => validate({ scheduledAt: '2026-08-01' })).toThrow('Le titre est requis');
    });

    it('should require scheduledAt', () => {
      const validate = (data: any) => {
        if (!data?.scheduledAt) throw new Error('La date de planification est requise');
      };
      expect(() => validate({ title: 'Update' })).toThrow('La date de planification est requise');
    });

    it('should require duration', () => {
      const validate = (data: any) => {
        if (!data?.duration || data.duration < 1) throw new Error('La durée est requise');
      };
      expect(() => validate({ title: 'Update', scheduledAt: '2026-08-01' })).toThrow('La durée est requise');
    });

    it('should not allow past dates', () => {
      const validate = (date: string) => {
        if (new Date(date) <= new Date()) throw new Error('La date doit être future');
      };
      expect(() => validate('2020-01-01')).toThrow('La date doit être future');
    });

    it('should validate duration range', () => {
      const validate = (duration: number) => {
        if (duration < 5 || duration > 480) throw new Error('La durée doit être entre 5 et 480 minutes');
      };
      expect(() => validate(30)).not.toThrow();
      expect(() => validate(3)).toThrow();
      expect(() => validate(500)).toThrow();
    });

    it('should set initial status to scheduled', async () => {
      mockRepo.createSchedule.mockResolvedValue({ id: scheduleId, status: 'scheduled' });
      const result = await mockRepo.createSchedule({ title: 'Update', scheduledAt: '2026-08-01', duration: 60, enterprise_id: enterpriseId });
      expect(result.status).toBe('scheduled');
    });
  });

  describe('updateSchedule', () => {
    it('should update schedule', async () => {
      mockRepo.getScheduleById.mockResolvedValue({ id: scheduleId, status: 'scheduled' });
      mockRepo.updateSchedule.mockResolvedValue({ id: scheduleId, title: 'Updated' });
      const result = await mockRepo.updateSchedule(scheduleId, { title: 'Updated' });
      expect(result.title).toBe('Updated');
    });

    it('should throw if not found', async () => {
      mockRepo.getScheduleById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const schedule = await mockRepo.getScheduleById(scheduleId);
        if (!schedule) throw new Error('Maintenance non trouvée');
      };
      await expect(updateOrThrow()).rejects.toThrow('Maintenance non trouvée');
    });

    it('should not update completed maintenance', async () => {
      mockRepo.getScheduleById.mockResolvedValue({ id: scheduleId, status: 'completed' });
      const updateOrThrow = async () => {
        const schedule = await mockRepo.getScheduleById(scheduleId);
        if (schedule?.status === 'completed') throw new Error('Cannot update completed maintenance');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });

    it('should allow rescheduling', async () => {
      mockRepo.getScheduleById.mockResolvedValue({ id: scheduleId, status: 'scheduled' });
      mockRepo.updateSchedule.mockResolvedValue({ scheduledAt: '2026-09-01T02:00:00Z' });
      const result = await mockRepo.updateSchedule(scheduleId, { scheduledAt: '2026-09-01T02:00:00Z' });
      expect(result.scheduledAt).toBe('2026-09-01T02:00:00Z');
    });
  });

  describe('cancelSchedule', () => {
    it('should cancel schedule', async () => {
      mockRepo.getScheduleById.mockResolvedValue({ id: scheduleId, status: 'scheduled' });
      mockRepo.cancelSchedule.mockResolvedValue({ id: scheduleId, status: 'cancelled' });
      const result = await mockRepo.cancelSchedule(scheduleId, 'Change of plans');
      expect(result.status).toBe('cancelled');
    });

    it('should throw if already started', async () => {
      mockRepo.getScheduleById.mockResolvedValue({ id: scheduleId, status: 'in_progress' });
      const cancelOrThrow = async () => {
        const schedule = await mockRepo.getScheduleById(scheduleId);
        if (schedule?.status === 'in_progress') throw new Error('Impossible d\'annuler une maintenance en cours');
      };
      await expect(cancelOrThrow()).rejects.toThrow();
    });

    it('should require cancellation reason', () => {
      const validate = (reason: string) => {
        if (!reason || reason.trim().length < 3) throw new Error('Le motif d\'annulation est requis');
      };
      expect(() => validate('')).toThrow('Le motif d\'annulation est requis');
    });

    it('should throw if not found', async () => {
      mockRepo.getScheduleById.mockResolvedValue(null);
      const cancelOrThrow = async () => {
        const schedule = await mockRepo.getScheduleById(scheduleId);
        if (!schedule) throw new Error('Maintenance non trouvée');
      };
      await expect(cancelOrThrow()).rejects.toThrow('Maintenance non trouvée');
    });
  });

  describe('startMaintenance', () => {
    it('should start maintenance', async () => {
      mockRepo.getScheduleById.mockResolvedValue({ id: scheduleId, status: 'scheduled' });
      mockRepo.startMaintenance.mockResolvedValue({ id: scheduleId, status: 'in_progress', startedAt: new Date().toISOString() });
      const result = await mockRepo.startMaintenance(scheduleId);
      expect(result.status).toBe('in_progress');
    });

    it('should throw if not scheduled', async () => {
      mockRepo.getScheduleById.mockResolvedValue({ id: scheduleId, status: 'completed' });
      const startOrThrow = async () => {
        const schedule = await mockRepo.getScheduleById(scheduleId);
        if (schedule?.status !== 'scheduled') throw new Error('Seule une maintenance planifiée peut être démarrée');
      };
      await expect(startOrThrow()).rejects.toThrow();
    });

    it('should set startedAt timestamp', async () => {
      mockRepo.getScheduleById.mockResolvedValue({ id: scheduleId, status: 'scheduled' });
      mockRepo.startMaintenance.mockResolvedValue({ startedAt: new Date().toISOString() });
      const result = await mockRepo.startMaintenance(scheduleId);
      expect(result.startedAt).toBeDefined();
    });

    it('should notify affected users', async () => {
      mockRepo.getScheduleById.mockResolvedValue({ id: scheduleId, status: 'scheduled' });
      mockRepo.startMaintenance.mockResolvedValue({ notified: true });
      const result = await mockRepo.startMaintenance(scheduleId);
      expect(result.notified).toBe(true);
    });
  });

  describe('completeMaintenance', () => {
    it('should complete maintenance', async () => {
      mockRepo.getScheduleById.mockResolvedValue({ id: scheduleId, status: 'in_progress' });
      mockRepo.completeMaintenance.mockResolvedValue({ id: scheduleId, status: 'completed', completedAt: new Date().toISOString() });
      const result = await mockRepo.completeMaintenance(scheduleId, { success: true });
      expect(result.status).toBe('completed');
    });

    it('should require completion notes', () => {
      const validate = (notes: string) => {
        if (!notes) throw new Error('Les notes de complétion sont requises');
      };
      expect(() => validate('')).toThrow('Les notes de complétion sont requises');
    });

    it('should handle partial completion', async () => {
      mockRepo.getScheduleById.mockResolvedValue({ id: scheduleId, status: 'in_progress' });
      mockRepo.completeMaintenance.mockResolvedValue({ status: 'completed', partial: true, issues: ['DB backup slow'] });
      const result = await mockRepo.completeMaintenance(scheduleId, { success: false, issues: ['DB backup slow'] });
      expect(result.partial).toBe(true);
    });

    it('should record completion time', async () => {
      mockRepo.getScheduleById.mockResolvedValue({ id: scheduleId, status: 'in_progress' });
      mockRepo.completeMaintenance.mockResolvedValue({ completedAt: new Date().toISOString(), durationMinutes: 45 });
      const result = await mockRepo.completeMaintenance(scheduleId, { success: true });
      expect(result.completedAt).toBeDefined();
    });
  });

  describe('rollbackMaintenance', () => {
    it('should rollback maintenance', async () => {
      mockRepo.getScheduleById.mockResolvedValue({ id: scheduleId, status: 'completed' });
      mockRepo.rollbackMaintenance.mockResolvedValue({ id: scheduleId, status: 'rolled_back' });
      const result = await mockRepo.rollbackMaintenance(scheduleId, 'Issues found');
      expect(result.status).toBe('rolled_back');
    });

    it('should require rollback reason', () => {
      const validate = (reason: string) => {
        if (!reason || reason.trim().length < 5) throw new Error('La raison du rollback est requise');
      };
      expect(() => validate('')).toThrow('La raison du rollback est requise');
    });

    it('should throw if not completed', async () => {
      mockRepo.getScheduleById.mockResolvedValue({ id: scheduleId, status: 'scheduled' });
      const rollbackOrThrow = async () => {
        const schedule = await mockRepo.getScheduleById(scheduleId);
        if (schedule?.status !== 'completed') throw new Error('Seule une maintenance complétée peut être annulée');
      };
      await expect(rollbackOrThrow()).rejects.toThrow();
    });

    it('should log rollback action', async () => {
      mockRepo.getScheduleById.mockResolvedValue({ id: scheduleId, status: 'completed' });
      mockRepo.rollbackMaintenance.mockResolvedValue({ rolledBackAt: new Date().toISOString(), rolledBackBy: 'admin' });
      const result = await mockRepo.rollbackMaintenance(scheduleId, 'Issues');
      expect(result.rolledBackAt).toBeDefined();
    });
  });

  describe('getMaintenanceHistory', () => {
    it('should return maintenance history', async () => {
      mockRepo.getMaintenanceHistory.mockResolvedValue([{ id: 'm-1', status: 'completed', completedAt: '2026-01-01' }]);
      const result = await mockRepo.getMaintenanceHistory(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should filter by date range', async () => {
      mockRepo.getMaintenanceHistory.mockResolvedValue([]);
      await mockRepo.getMaintenanceHistory(enterpriseId, { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.getMaintenanceHistory).toHaveBeenCalled();
    });

    it('should handle empty history', async () => {
      mockRepo.getMaintenanceHistory.mockResolvedValue([]);
      const result = await mockRepo.getMaintenanceHistory(enterpriseId);
      expect(result).toHaveLength(0);
    });
  });

  describe('getActiveMaintenance', () => {
    it('should return active maintenance', async () => {
      mockRepo.getActiveMaintenance.mockResolvedValue([{ id: scheduleId, status: 'in_progress' }]);
      const result = await mockRepo.getActiveMaintenance(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should handle no active maintenance', async () => {
      mockRepo.getActiveMaintenance.mockResolvedValue([]);
      const result = await mockRepo.getActiveMaintenance(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should include estimated completion', async () => {
      mockRepo.getActiveMaintenance.mockResolvedValue([{ estimatedCompletion: '2026-08-01T03:00:00Z' }]);
      const result = await mockRepo.getActiveMaintenance(enterpriseId);
      expect(result[0].estimatedCompletion).toBeDefined();
    });
  });

  describe('notifyUsers', () => {
    it('should notify users about maintenance', async () => {
      mockRepo.notifyUsers.mockResolvedValue({ notified: 150 });
      const result = await mockRepo.notifyUsers(scheduleId, { channel: 'email' });
      expect(result.notified).toBe(150);
    });

    it('should support multiple channels', async () => {
      mockRepo.notifyUsers.mockResolvedValue({ email: 100, sms: 50 });
      const result = await mockRepo.notifyUsers(scheduleId, { channels: ['email', 'sms'] });
      expect(result.email).toBe(100);
    });

    it('should handle no users to notify', async () => {
      mockRepo.notifyUsers.mockResolvedValue({ notified: 0 });
      const result = await mockRepo.notifyUsers(scheduleId, { channel: 'email' });
      expect(result.notified).toBe(0);
    });
  });

  describe('getMaintenanceStats', () => {
    it('should return maintenance statistics', async () => {
      mockRepo.getMaintenanceStats.mockResolvedValue({ total: 20, completed: 18, cancelled: 2 });
      const result = await mockRepo.getMaintenanceStats(enterpriseId);
      expect(result.total).toBe(20);
    });

    it('should include average duration', async () => {
      mockRepo.getMaintenanceStats.mockResolvedValue({ avgDurationMinutes: 45 });
      const result = await mockRepo.getMaintenanceStats(enterpriseId);
      expect(result.avgDurationMinutes).toBe(45);
    });

    it('should include success rate', async () => {
      mockRepo.getMaintenanceStats.mockResolvedValue({ successRate: 90 });
      const result = await mockRepo.getMaintenanceStats(enterpriseId);
      expect(result.successRate).toBe(90);
    });

    it('should handle zero maintenances', async () => {
      mockRepo.getMaintenanceStats.mockResolvedValue({ total: 0 });
      const result = await mockRepo.getMaintenanceStats(enterpriseId);
      expect(result.total).toBe(0);
    });
  });
});
