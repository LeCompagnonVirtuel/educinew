import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createWebhookDeliveryService } from '../../src/features/integration/services/webhook-delivery.service';

describe('WebhookDeliveryService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getDeliveries: vi.fn(),
      getDeliveryById: vi.fn(),
      retryDelivery: vi.fn(),
      getDeliveryStats: vi.fn(),
      getDeliveryLogs: vi.fn(),
      cancelDelivery: vi.fn(),
      getDeliveryByWebhookId: vi.fn(),
      bulkRetryDeliveries: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createWebhookDeliveryService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getDeliveries).toBeInstanceOf(Function);
    expect(service.getDeliveryById).toBeInstanceOf(Function);
    expect(service.retryDelivery).toBeInstanceOf(Function);
    expect(service.getDeliveryStats).toBeInstanceOf(Function);
    expect(service.getDeliveryLogs).toBeInstanceOf(Function);
    expect(service.cancelDelivery).toBeInstanceOf(Function);
    expect(service.getDeliveryByWebhookId).toBeInstanceOf(Function);
    expect(service.bulkRetryDeliveries).toBeInstanceOf(Function);
  });

  describe('getDeliveries', () => {
    it('should return deliveries list', async () => {
      mockRepository.getDeliveries.mockResolvedValue([{ id: 'del-1', webhookId: 'wh-1', status: 'delivered' }]);
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.getDeliveries('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return deliveries with filters', async () => {
      mockRepository.getDeliveries.mockResolvedValue([{ id: 'del-1' }]);
      const service = createWebhookDeliveryService(mockRepository);
      await service.getDeliveries('school-1', { status: 'failed' });
      expect(mockRepository.getDeliveries).toHaveBeenCalledWith('school-1', { status: 'failed' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.getDeliveries('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getDeliveries.mockResolvedValue([]);
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.getDeliveries('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated deliveries', async () => {
      mockRepository.getDeliveries.mockResolvedValue({ data: [{ id: 'del-1' }], total: 100 });
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.getDeliveries('school-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by date range', async () => {
      mockRepository.getDeliveries.mockResolvedValue([{ id: 'del-1' }]);
      const service = createWebhookDeliveryService(mockRepository);
      await service.getDeliveries('school-1', { since: '2024-01-01', until: '2024-01-31' });
      expect(mockRepository.getDeliveries).toHaveBeenCalledWith('school-1', { since: '2024-01-01', until: '2024-01-31' });
    });

    it('should filter by webhook', async () => {
      mockRepository.getDeliveries.mockResolvedValue([{ id: 'del-1', webhookId: 'wh-1' }]);
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.getDeliveries('school-1', { webhookId: 'wh-1' });
      expect(result).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getDeliveries.mockRejectedValue(new Error('DB error'));
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.getDeliveries('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getDeliveryById', () => {
    it('should return a single delivery', async () => {
      mockRepository.getDeliveryById.mockResolvedValue({ id: 'del-1', webhookId: 'wh-1', status: 'delivered' });
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.getDeliveryById('del-1');
      expect(result.id).toBe('del-1');
    });

    it('should throw if delivery not found', async () => {
      mockRepository.getDeliveryById.mockResolvedValue(null);
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.getDeliveryById('nonexistent')).rejects.toThrow('Delivery not found');
    });

    it('should throw if id is missing', async () => {
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.getDeliveryById('')).rejects.toThrow('Delivery ID is required');
    });

    it('should return delivery with request details', async () => {
      mockRepository.getDeliveryById.mockResolvedValue({ id: 'del-1', request: { method: 'POST', url: 'https://example.com/webhook', headers: {}, body: {} } });
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.getDeliveryById('del-1');
      expect(result.request.method).toBe('POST');
    });

    it('should return delivery with response details', async () => {
      mockRepository.getDeliveryById.mockResolvedValue({ id: 'del-1', response: { statusCode: 200, body: 'OK', headers: {} } });
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.getDeliveryById('del-1');
      expect(result.response.statusCode).toBe(200);
    });

    it('should return delivery with retry info', async () => {
      mockRepository.getDeliveryById.mockResolvedValue({ id: 'del-1', retryCount: 3, maxRetries: 5, nextRetryAt: '2024-01-01T01:00:00Z' });
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.getDeliveryById('del-1');
      expect(result.retryCount).toBe(3);
    });

    it('should handle repository errors', async () => {
      mockRepository.getDeliveryById.mockRejectedValue(new Error('Query timeout'));
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.getDeliveryById('del-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('retryDelivery', () => {
    it('should retry a delivery', async () => {
      mockRepository.retryDelivery.mockResolvedValue({ deliveryId: 'del-1', status: 'retrying', retryCount: 1 });
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.retryDelivery('del-1', 'user-1');
      expect(result.status).toBe('retrying');
    });

    it('should throw if deliveryId is missing', async () => {
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.retryDelivery('', 'user-1')).rejects.toThrow('Delivery ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.retryDelivery('del-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle retry failure', async () => {
      mockRepository.retryDelivery.mockRejectedValue(new Error('Max retries exceeded'));
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.retryDelivery('del-1', 'user-1')).rejects.toThrow('Max retries exceeded');
    });

    it('should return retry details', async () => {
      mockRepository.retryDelivery.mockResolvedValue({ deliveryId: 'del-1', status: 'retrying', retryCount: 2, maxRetries: 5, nextRetryAt: '2024-01-01T02:00:00Z' });
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.retryDelivery('del-1', 'user-1');
      expect(result.retryCount).toBe(2);
    });

    it('should handle already delivered', async () => {
      mockRepository.retryDelivery.mockResolvedValue({ status: 'already_delivered' });
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.retryDelivery('del-1', 'user-1');
      expect(result.status).toBe('already_delivered');
    });
  });

  describe('getDeliveryStats', () => {
    it('should return delivery stats', async () => {
      mockRepository.getDeliveryStats.mockResolvedValue({ totalDeliveries: 1000, successfulDeliveries: 950, failedDeliveries: 50 });
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.getDeliveryStats('school-1');
      expect(result.totalDeliveries).toBe(1000);
    });

    it('should return stats with filters', async () => {
      mockRepository.getDeliveryStats.mockResolvedValue({ stats: {} });
      const service = createWebhookDeliveryService(mockRepository);
      await service.getDeliveryStats('school-1', { since: '2024-01-01' });
      expect(mockRepository.getDeliveryStats).toHaveBeenCalledWith('school-1', { since: '2024-01-01' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.getDeliveryStats('')).rejects.toThrow('schoolId is required');
    });

    it('should return zero stats', async () => {
      mockRepository.getDeliveryStats.mockResolvedValue({ totalDeliveries: 0 });
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.getDeliveryStats('school-1');
      expect(result.totalDeliveries).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getDeliveryStats.mockRejectedValue(new Error('DB error'));
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.getDeliveryStats('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getDeliveryLogs', () => {
    it('should return delivery logs', async () => {
      mockRepository.getDeliveryLogs.mockResolvedValue([{ id: 'log-1', deliveryId: 'del-1', timestamp: '2024-01-01', event: 'sent' }]);
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.getDeliveryLogs('del-1');
      expect(result).toHaveLength(1);
    });

    it('should throw if deliveryId is missing', async () => {
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.getDeliveryLogs('')).rejects.toThrow('Delivery ID is required');
    });

    it('should return paginated logs', async () => {
      mockRepository.getDeliveryLogs.mockResolvedValue({ data: [{ id: 'log-1' }], total: 10 });
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.getDeliveryLogs('del-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should return empty logs', async () => {
      mockRepository.getDeliveryLogs.mockResolvedValue([]);
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.getDeliveryLogs('del-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getDeliveryLogs.mockRejectedValue(new Error('DB error'));
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.getDeliveryLogs('del-1')).rejects.toThrow('DB error');
    });
  });

  describe('cancelDelivery', () => {
    it('should cancel a delivery', async () => {
      mockRepository.cancelDelivery.mockResolvedValue({ deliveryId: 'del-1', status: 'cancelled' });
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.cancelDelivery('del-1', 'user-1');
      expect(result.status).toBe('cancelled');
    });

    it('should throw if deliveryId is missing', async () => {
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.cancelDelivery('', 'user-1')).rejects.toThrow('Delivery ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.cancelDelivery('del-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle cancel failure', async () => {
      mockRepository.cancelDelivery.mockRejectedValue(new Error('Cannot cancel completed delivery'));
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.cancelDelivery('del-1', 'user-1')).rejects.toThrow('Cannot cancel completed delivery');
    });

    it('should handle already cancelled', async () => {
      mockRepository.cancelDelivery.mockResolvedValue({ status: 'already_cancelled' });
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.cancelDelivery('del-1', 'user-1');
      expect(result.status).toBe('already_cancelled');
    });
  });

  describe('getDeliveryByWebhookId', () => {
    it('should return deliveries by webhook ID', async () => {
      mockRepository.getDeliveryByWebhookId.mockResolvedValue([{ id: 'del-1', webhookId: 'wh-1' }]);
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.getDeliveryByWebhookId('wh-1');
      expect(result).toHaveLength(1);
    });

    it('should throw if webhookId is missing', async () => {
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.getDeliveryByWebhookId('')).rejects.toThrow('Webhook ID is required');
    });

    it('should return paginated deliveries', async () => {
      mockRepository.getDeliveryByWebhookId.mockResolvedValue({ data: [{ id: 'del-1' }], total: 50 });
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.getDeliveryByWebhookId('wh-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should return empty deliveries', async () => {
      mockRepository.getDeliveryByWebhookId.mockResolvedValue([]);
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.getDeliveryByWebhookId('wh-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getDeliveryByWebhookId.mockRejectedValue(new Error('DB error'));
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.getDeliveryByWebhookId('wh-1')).rejects.toThrow('DB error');
    });
  });

  describe('bulkRetryDeliveries', () => {
    it('should bulk retry deliveries', async () => {
      mockRepository.bulkRetryDeliveries.mockResolvedValue({ retriedCount: 10, failedCount: 2 });
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.bulkRetryDeliveries('school-1', 'user-1', { status: 'failed' });
      expect(result.retriedCount).toBe(10);
    });

    it('should throw if schoolId is missing', async () => {
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.bulkRetryDeliveries('', 'user-1', {})).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.bulkRetryDeliveries('school-1', '', {})).rejects.toThrow('userId is required');
    });

    it('should handle bulk retry failure', async () => {
      mockRepository.bulkRetryDeliveries.mockRejectedValue(new Error('Bulk retry failed'));
      const service = createWebhookDeliveryService(mockRepository);
      await expect(service.bulkRetryDeliveries('school-1', 'user-1', {})).rejects.toThrow('Bulk retry failed');
    });

    it('should return bulk retry details', async () => {
      mockRepository.bulkRetryDeliveries.mockResolvedValue({ retriedCount: 5, failedCount: 1, totalProcessed: 6 });
      const service = createWebhookDeliveryService(mockRepository);
      const result = await service.bulkRetryDeliveries('school-1', 'user-1', { status: 'failed' });
      expect(result.totalProcessed).toBe(6);
    });
  });
});
