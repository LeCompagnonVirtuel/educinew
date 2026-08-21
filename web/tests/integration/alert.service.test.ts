import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAlertService } from '../../src/features/integration/services/alert.service';

describe('AlertService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getAlerts: vi.fn(),
      getAlertById: vi.fn(),
      createAlert: vi.fn(),
      updateAlert: vi.fn(),
      deleteAlert: vi.fn(),
      acknowledgeAlert: vi.fn(),
      resolveAlert: vi.fn(),
      getAlertHistory: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createAlertService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getAlerts).toBeInstanceOf(Function);
    expect(service.getAlertById).toBeInstanceOf(Function);
    expect(service.createAlert).toBeInstanceOf(Function);
    expect(service.updateAlert).toBeInstanceOf(Function);
    expect(service.deleteAlert).toBeInstanceOf(Function);
    expect(service.acknowledgeAlert).toBeInstanceOf(Function);
    expect(service.resolveAlert).toBeInstanceOf(Function);
    expect(service.getAlertHistory).toBeInstanceOf(Function);
  });

  describe('getAlerts', () => {
    it('should return alerts list', async () => {
      mockRepository.getAlerts.mockResolvedValue([{ id: 'al-1', title: 'High Error Rate', severity: 'critical', status: 'active' }]);
      const service = createAlertService(mockRepository);
      const result = await service.getAlerts('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return alerts with filters', async () => {
      mockRepository.getAlerts.mockResolvedValue([{ id: 'al-1' }]);
      const service = createAlertService(mockRepository);
      await service.getAlerts('school-1', { severity: 'critical' });
      expect(mockRepository.getAlerts).toHaveBeenCalledWith('school-1', { severity: 'critical' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAlertService(mockRepository);
      await expect(service.getAlerts('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getAlerts.mockResolvedValue([]);
      const service = createAlertService(mockRepository);
      const result = await service.getAlerts('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated alerts', async () => {
      mockRepository.getAlerts.mockResolvedValue({ data: [{ id: 'al-1' }], total: 10 });
      const service = createAlertService(mockRepository);
      const result = await service.getAlerts('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by status', async () => {
      mockRepository.getAlerts.mockResolvedValue([{ id: 'al-1', status: 'active' }]);
      const service = createAlertService(mockRepository);
      const result = await service.getAlerts('school-1', { status: 'active' });
      expect(result).toHaveLength(1);
    });

    it('should filter by type', async () => {
      mockRepository.getAlerts.mockResolvedValue([{ id: 'al-1', type: 'error_rate' }]);
      const service = createAlertService(mockRepository);
      const result = await service.getAlerts('school-1', { type: 'error_rate' });
      expect(result).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getAlerts.mockRejectedValue(new Error('DB error'));
      const service = createAlertService(mockRepository);
      await expect(service.getAlerts('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getAlertById', () => {
    it('should return a single alert', async () => {
      mockRepository.getAlertById.mockResolvedValue({ id: 'al-1', title: 'High Error Rate', severity: 'critical' });
      const service = createAlertService(mockRepository);
      const result = await service.getAlertById('al-1');
      expect(result.id).toBe('al-1');
    });

    it('should throw if alert not found', async () => {
      mockRepository.getAlertById.mockResolvedValue(null);
      const service = createAlertService(mockRepository);
      await expect(service.getAlertById('nonexistent')).rejects.toThrow('Alert not found');
    });

    it('should throw if id is missing', async () => {
      const service = createAlertService(mockRepository);
      await expect(service.getAlertById('')).rejects.toThrow('Alert ID is required');
    });

    it('should return alert with details', async () => {
      mockRepository.getAlertById.mockResolvedValue({ id: 'al-1', conditions: [{ metric: 'error_rate', operator: '>', threshold: 0.05 }], notifications: [{ type: 'email', recipients: ['admin@school.edu'] }] });
      const service = createAlertService(mockRepository);
      const result = await service.getAlertById('al-1');
      expect(result.conditions).toHaveLength(1);
      expect(result.notifications).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getAlertById.mockRejectedValue(new Error('Query timeout'));
      const service = createAlertService(mockRepository);
      await expect(service.getAlertById('al-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createAlert', () => {
    it('should create an alert', async () => {
      mockRepository.createAlert.mockResolvedValue({ id: 'al-1', title: 'High Error Rate', status: 'active' });
      const service = createAlertService(mockRepository);
      const result = await service.createAlert('school-1', 'user-1', { title: 'High Error Rate', type: 'error_rate', severity: 'critical', conditions: [{ metric: 'error_rate', operator: '>', threshold: 0.05 }] });
      expect(result.id).toBe('al-1');
      expect(mockRepository.createAlert).toHaveBeenCalled();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createAlertService(mockRepository);
      await expect(service.createAlert('', 'user-1', { title: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAlertService(mockRepository);
      await expect(service.createAlert('school-1', '', { title: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if title is missing', async () => {
      const service = createAlertService(mockRepository);
      await expect(service.createAlert('school-1', 'user-1', { title: '' })).rejects.toThrow('Alert title is required');
    });

    it('should create alert with notifications', async () => {
      mockRepository.createAlert.mockResolvedValue({ id: 'al-1', notifications: [{ type: 'email', recipients: ['admin@school.edu'] }] });
      const service = createAlertService(mockRepository);
      const result = await service.createAlert('school-1', 'user-1', { title: 'T', type: 'error_rate', severity: 'critical', notifications: [{ type: 'email', recipients: ['admin@school.edu'] }] });
      expect(result.notifications).toHaveLength(1);
    });

    it('should handle creation failure', async () => {
      mockRepository.createAlert.mockRejectedValue(new Error('Invalid conditions'));
      const service = createAlertService(mockRepository);
      await expect(service.createAlert('school-1', 'user-1', { title: 'T', type: 'error_rate', severity: 'critical' })).rejects.toThrow('Invalid conditions');
    });
  });

  describe('updateAlert', () => {
    it('should update an alert', async () => {
      mockRepository.getAlertById.mockResolvedValue({ id: 'al-1', title: 'Old' });
      mockRepository.updateAlert.mockResolvedValue({ id: 'al-1', title: 'Updated' });
      const service = createAlertService(mockRepository);
      const result = await service.updateAlert('al-1', 'user-1', { title: 'Updated' });
      expect(result.title).toBe('Updated');
    });

    it('should throw if alert not found', async () => {
      mockRepository.getAlertById.mockResolvedValue(null);
      const service = createAlertService(mockRepository);
      await expect(service.updateAlert('nonexistent', 'user-1', { title: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createAlertService(mockRepository);
      await expect(service.updateAlert('', 'user-1', { title: 'New' })).rejects.toThrow('Alert ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAlertService(mockRepository);
      await expect(service.updateAlert('al-1', '', { title: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update alert conditions', async () => {
      mockRepository.getAlertById.mockResolvedValue({ id: 'al-1' });
      mockRepository.updateAlert.mockResolvedValue({ id: 'al-1', conditions: [{ metric: 'latency', operator: '>', threshold: 1000 }] });
      const service = createAlertService(mockRepository);
      const result = await service.updateAlert('al-1', 'user-1', { conditions: [{ metric: 'latency', operator: '>', threshold: 1000 }] });
      expect(result.conditions).toHaveLength(1);
    });

    it('should handle update failure', async () => {
      mockRepository.getAlertById.mockResolvedValue({ id: 'al-1' });
      mockRepository.updateAlert.mockRejectedValue(new Error('Cannot update'));
      const service = createAlertService(mockRepository);
      await expect(service.updateAlert('al-1', 'user-1', { title: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteAlert', () => {
    it('should delete an alert', async () => {
      mockRepository.getAlertById.mockResolvedValue({ id: 'al-1' });
      mockRepository.deleteAlert.mockResolvedValue({ success: true });
      const service = createAlertService(mockRepository);
      await service.deleteAlert('al-1', 'user-1');
      expect(mockRepository.deleteAlert).toHaveBeenCalledWith('al-1');
    });

    it('should throw if alert not found', async () => {
      mockRepository.getAlertById.mockResolvedValue(null);
      const service = createAlertService(mockRepository);
      await expect(service.deleteAlert('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createAlertService(mockRepository);
      await expect(service.deleteAlert('', 'user-1')).rejects.toThrow('Alert ID is required');
    });

    it('should handle deletion failure', async () => {
      mockRepository.getAlertById.mockResolvedValue({ id: 'al-1' });
      mockRepository.deleteAlert.mockRejectedValue(new Error('Cannot delete'));
      const service = createAlertService(mockRepository);
      await expect(service.deleteAlert('al-1', 'user-1')).rejects.toThrow('Cannot delete');
    });
  });

  describe('acknowledgeAlert', () => {
    it('should acknowledge an alert', async () => {
      mockRepository.acknowledgeAlert.mockResolvedValue({ id: 'al-1', status: 'acknowledged', acknowledgedBy: 'user-1', acknowledgedAt: '2024-01-01' });
      const service = createAlertService(mockRepository);
      const result = await service.acknowledgeAlert('al-1', 'user-1');
      expect(result.status).toBe('acknowledged');
    });

    it('should throw if alertId is missing', async () => {
      const service = createAlertService(mockRepository);
      await expect(service.acknowledgeAlert('', 'user-1')).rejects.toThrow('Alert ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAlertService(mockRepository);
      await expect(service.acknowledgeAlert('al-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle already acknowledged', async () => {
      mockRepository.acknowledgeAlert.mockResolvedValue({ status: 'already_acknowledged' });
      const service = createAlertService(mockRepository);
      const result = await service.acknowledgeAlert('al-1', 'user-1');
      expect(result.status).toBe('already_acknowledged');
    });

    it('should handle acknowledge failure', async () => {
      mockRepository.acknowledgeAlert.mockRejectedValue(new Error('Alert already resolved'));
      const service = createAlertService(mockRepository);
      await expect(service.acknowledgeAlert('al-1', 'user-1')).rejects.toThrow('Alert already resolved');
    });
  });

  describe('resolveAlert', () => {
    it('should resolve an alert', async () => {
      mockRepository.resolveAlert.mockResolvedValue({ id: 'al-1', status: 'resolved', resolvedBy: 'user-1', resolvedAt: '2024-01-01' });
      const service = createAlertService(mockRepository);
      const result = await service.resolveAlert('al-1', 'user-1', { notes: 'Fixed the issue' });
      expect(result.status).toBe('resolved');
    });

    it('should throw if alertId is missing', async () => {
      const service = createAlertService(mockRepository);
      await expect(service.resolveAlert('', 'user-1', {})).rejects.toThrow('Alert ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createAlertService(mockRepository);
      await expect(service.resolveAlert('al-1', '', {})).rejects.toThrow('userId is required');
    });

    it('should resolve without notes', async () => {
      mockRepository.resolveAlert.mockResolvedValue({ id: 'al-1', status: 'resolved' });
      const service = createAlertService(mockRepository);
      const result = await service.resolveAlert('al-1', 'user-1', {});
      expect(result.status).toBe('resolved');
    });

    it('should handle resolve failure', async () => {
      mockRepository.resolveAlert.mockRejectedValue(new Error('Cannot resolve'));
      const service = createAlertService(mockRepository);
      await expect(service.resolveAlert('al-1', 'user-1', {})).rejects.toThrow('Cannot resolve');
    });
  });

  describe('getAlertHistory', () => {
    it('should return alert history', async () => {
      mockRepository.getAlertHistory.mockResolvedValue([{ action: 'created', userId: 'user-1', timestamp: '2024-01-01' }]);
      const service = createAlertService(mockRepository);
      const result = await service.getAlertHistory('al-1');
      expect(result).toHaveLength(1);
    });

    it('should return history with filters', async () => {
      mockRepository.getAlertHistory.mockResolvedValue([{ action: 'acknowledged' }]);
      const service = createAlertService(mockRepository);
      await service.getAlertHistory('al-1', { action: 'acknowledged' });
      expect(mockRepository.getAlertHistory).toHaveBeenCalledWith('al-1', { action: 'acknowledged' });
    });

    it('should throw if alertId is missing', async () => {
      const service = createAlertService(mockRepository);
      await expect(service.getAlertHistory('')).rejects.toThrow('Alert ID is required');
    });

    it('should return paginated history', async () => {
      mockRepository.getAlertHistory.mockResolvedValue({ data: [{ action: 'created' }], total: 20 });
      const service = createAlertService(mockRepository);
      const result = await service.getAlertHistory('al-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should return empty history', async () => {
      mockRepository.getAlertHistory.mockResolvedValue([]);
      const service = createAlertService(mockRepository);
      const result = await service.getAlertHistory('al-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getAlertHistory.mockRejectedValue(new Error('DB error'));
      const service = createAlertService(mockRepository);
      await expect(service.getAlertHistory('al-1')).rejects.toThrow('DB error');
    });
  });
});
