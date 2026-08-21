import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createWebhookService } from '../../src/features/integration/services/webhook.service';

describe('WebhookService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getWebhooks: vi.fn(),
      getWebhookById: vi.fn(),
      createWebhook: vi.fn(),
      updateWebhook: vi.fn(),
      deleteWebhook: vi.fn(),
      enableWebhook: vi.fn(),
      disableWebhook: vi.fn(),
      testWebhook: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createWebhookService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getWebhooks).toBeInstanceOf(Function);
    expect(service.getWebhookById).toBeInstanceOf(Function);
    expect(service.createWebhook).toBeInstanceOf(Function);
    expect(service.updateWebhook).toBeInstanceOf(Function);
    expect(service.deleteWebhook).toBeInstanceOf(Function);
    expect(service.enableWebhook).toBeInstanceOf(Function);
    expect(service.disableWebhook).toBeInstanceOf(Function);
    expect(service.testWebhook).toBeInstanceOf(Function);
  });

  describe('getWebhooks', () => {
    it('should return webhooks list', async () => {
      mockRepository.getWebhooks.mockResolvedValue([{ id: 'wh-1', name: 'Document Notification', url: 'https://example.com/webhook', status: 'active' }]);
      const service = createWebhookService(mockRepository);
      const result = await service.getWebhooks('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return webhooks with filters', async () => {
      mockRepository.getWebhooks.mockResolvedValue([{ id: 'wh-1' }]);
      const service = createWebhookService(mockRepository);
      await service.getWebhooks('school-1', { status: 'active' });
      expect(mockRepository.getWebhooks).toHaveBeenCalledWith('school-1', { status: 'active' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createWebhookService(mockRepository);
      await expect(service.getWebhooks('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getWebhooks.mockResolvedValue([]);
      const service = createWebhookService(mockRepository);
      const result = await service.getWebhooks('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated webhooks', async () => {
      mockRepository.getWebhooks.mockResolvedValue({ data: [{ id: 'wh-1' }], total: 20 });
      const service = createWebhookService(mockRepository);
      const result = await service.getWebhooks('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by event type', async () => {
      mockRepository.getWebhooks.mockResolvedValue([{ id: 'wh-1', events: ['document.created'] }]);
      const service = createWebhookService(mockRepository);
      const result = await service.getWebhooks('school-1', { eventType: 'document.created' });
      expect(result).toHaveLength(1);
    });

    it('should return webhooks with delivery count', async () => {
      mockRepository.getWebhooks.mockResolvedValue([{ id: 'wh-1', deliveryCount: 150, lastDeliveryAt: '2024-01-01' }]);
      const service = createWebhookService(mockRepository);
      const result = await service.getWebhooks('school-1');
      expect(result[0].deliveryCount).toBe(150);
    });

    it('should handle repository errors', async () => {
      mockRepository.getWebhooks.mockRejectedValue(new Error('DB error'));
      const service = createWebhookService(mockRepository);
      await expect(service.getWebhooks('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getWebhookById', () => {
    it('should return a single webhook', async () => {
      mockRepository.getWebhookById.mockResolvedValue({ id: 'wh-1', name: 'Document Notification', url: 'https://example.com/webhook' });
      const service = createWebhookService(mockRepository);
      const result = await service.getWebhookById('wh-1');
      expect(result.id).toBe('wh-1');
    });

    it('should throw if webhook not found', async () => {
      mockRepository.getWebhookById.mockResolvedValue(null);
      const service = createWebhookService(mockRepository);
      await expect(service.getWebhookById('nonexistent')).rejects.toThrow('Webhook not found');
    });

    it('should throw if id is missing', async () => {
      const service = createWebhookService(mockRepository);
      await expect(service.getWebhookById('')).rejects.toThrow('Webhook ID is required');
    });

    it('should return webhook with events', async () => {
      mockRepository.getWebhookById.mockResolvedValue({ id: 'wh-1', events: ['document.created', 'document.updated'] });
      const service = createWebhookService(mockRepository);
      const result = await service.getWebhookById('wh-1');
      expect(result.events).toHaveLength(2);
    });

    it('should return webhook with config', async () => {
      mockRepository.getWebhookById.mockResolvedValue({ id: 'wh-1', config: { secret: '***', retryPolicy: 'exponential' } });
      const service = createWebhookService(mockRepository);
      const result = await service.getWebhookById('wh-1');
      expect(result.config.retryPolicy).toBe('exponential');
    });

    it('should return webhook with stats', async () => {
      mockRepository.getWebhookById.mockResolvedValue({ id: 'wh-1', stats: { totalDeliveries: 100, successRate: 98 } });
      const service = createWebhookService(mockRepository);
      const result = await service.getWebhookById('wh-1');
      expect(result.stats.totalDeliveries).toBe(100);
    });

    it('should handle repository errors', async () => {
      mockRepository.getWebhookById.mockRejectedValue(new Error('Query timeout'));
      const service = createWebhookService(mockRepository);
      await expect(service.getWebhookById('wh-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createWebhook', () => {
    it('should create a webhook', async () => {
      mockRepository.createWebhook.mockResolvedValue({ id: 'wh-1', name: 'Document Notification', url: 'https://example.com/webhook', status: 'active' });
      const service = createWebhookService(mockRepository);
      const result = await service.createWebhook('school-1', 'user-1', { name: 'Document Notification', url: 'https://example.com/webhook', events: ['document.created'] });
      expect(result.id).toBe('wh-1');
    });

    it('should throw if schoolId is missing', async () => {
      const service = createWebhookService(mockRepository);
      await expect(service.createWebhook('', 'user-1', { name: 'T', url: 'https://example.com' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createWebhookService(mockRepository);
      await expect(service.createWebhook('school-1', '', { name: 'T', url: 'https://example.com' })).rejects.toThrow('userId is required');
    });

    it('should throw if name is missing', async () => {
      const service = createWebhookService(mockRepository);
      await expect(service.createWebhook('school-1', 'user-1', { name: '', url: 'https://example.com' })).rejects.toThrow('Webhook name is required');
    });

    it('should throw if url is missing', async () => {
      const service = createWebhookService(mockRepository);
      await expect(service.createWebhook('school-1', 'user-1', { name: 'T', url: '' })).rejects.toThrow('Webhook URL is required');
    });

    it('should create webhook with events', async () => {
      mockRepository.createWebhook.mockResolvedValue({ id: 'wh-1', events: ['document.created', 'document.updated'] });
      const service = createWebhookService(mockRepository);
      const result = await service.createWebhook('school-1', 'user-1', { name: 'T', url: 'https://example.com', events: ['document.created', 'document.updated'] });
      expect(result.events).toHaveLength(2);
    });

    it('should create webhook with secret', async () => {
      mockRepository.createWebhook.mockResolvedValue({ id: 'wh-1', config: { secret: 'whsec_***' } });
      const service = createWebhookService(mockRepository);
      const result = await service.createWebhook('school-1', 'user-1', { name: 'T', url: 'https://example.com', config: { secret: 'whsec_***' } });
      expect(result.config.secret).toBeDefined();
    });

    it('should handle creation failure', async () => {
      mockRepository.createWebhook.mockRejectedValue(new Error('Invalid URL'));
      const service = createWebhookService(mockRepository);
      await expect(service.createWebhook('school-1', 'user-1', { name: 'T', url: 'invalid' })).rejects.toThrow('Invalid URL');
    });
  });

  describe('updateWebhook', () => {
    it('should update a webhook', async () => {
      mockRepository.getWebhookById.mockResolvedValue({ id: 'wh-1', name: 'Old' });
      mockRepository.updateWebhook.mockResolvedValue({ id: 'wh-1', name: 'Updated' });
      const service = createWebhookService(mockRepository);
      const result = await service.updateWebhook('wh-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if webhook not found', async () => {
      mockRepository.getWebhookById.mockResolvedValue(null);
      const service = createWebhookService(mockRepository);
      await expect(service.updateWebhook('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createWebhookService(mockRepository);
      await expect(service.updateWebhook('', 'user-1', { name: 'New' })).rejects.toThrow('Webhook ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createWebhookService(mockRepository);
      await expect(service.updateWebhook('wh-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update webhook events', async () => {
      mockRepository.getWebhookById.mockResolvedValue({ id: 'wh-1' });
      mockRepository.updateWebhook.mockResolvedValue({ id: 'wh-1', events: ['document.created', 'document.deleted'] });
      const service = createWebhookService(mockRepository);
      const result = await service.updateWebhook('wh-1', 'user-1', { events: ['document.created', 'document.deleted'] });
      expect(result.events).toHaveLength(2);
    });

    it('should update webhook URL', async () => {
      mockRepository.getWebhookById.mockResolvedValue({ id: 'wh-1' });
      mockRepository.updateWebhook.mockResolvedValue({ id: 'wh-1', url: 'https://new-url.com/webhook' });
      const service = createWebhookService(mockRepository);
      const result = await service.updateWebhook('wh-1', 'user-1', { url: 'https://new-url.com/webhook' });
      expect(result.url).toBe('https://new-url.com/webhook');
    });

    it('should handle update failure', async () => {
      mockRepository.getWebhookById.mockResolvedValue({ id: 'wh-1' });
      mockRepository.updateWebhook.mockRejectedValue(new Error('Cannot update'));
      const service = createWebhookService(mockRepository);
      await expect(service.updateWebhook('wh-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteWebhook', () => {
    it('should delete a webhook', async () => {
      mockRepository.getWebhookById.mockResolvedValue({ id: 'wh-1' });
      mockRepository.deleteWebhook.mockResolvedValue({ success: true });
      const service = createWebhookService(mockRepository);
      await service.deleteWebhook('wh-1', 'user-1');
      expect(mockRepository.deleteWebhook).toHaveBeenCalledWith('wh-1');
    });

    it('should throw if webhook not found', async () => {
      mockRepository.getWebhookById.mockResolvedValue(null);
      const service = createWebhookService(mockRepository);
      await expect(service.deleteWebhook('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createWebhookService(mockRepository);
      await expect(service.deleteWebhook('', 'user-1')).rejects.toThrow('Webhook ID is required');
    });

    it('should handle deletion with pending deliveries', async () => {
      mockRepository.getWebhookById.mockResolvedValue({ id: 'wh-1' });
      mockRepository.deleteWebhook.mockRejectedValue(new Error('Webhook has pending deliveries'));
      const service = createWebhookService(mockRepository);
      await expect(service.deleteWebhook('wh-1', 'user-1')).rejects.toThrow('Webhook has pending deliveries');
    });

    it('should force delete webhook', async () => {
      mockRepository.getWebhookById.mockResolvedValue({ id: 'wh-1' });
      mockRepository.deleteWebhook.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createWebhookService(mockRepository);
      const result = await service.deleteWebhook('wh-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('enableWebhook', () => {
    it('should enable a webhook', async () => {
      mockRepository.enableWebhook.mockResolvedValue({ webhookId: 'wh-1', status: 'active', enabledAt: '2024-01-01' });
      const service = createWebhookService(mockRepository);
      const result = await service.enableWebhook('wh-1', 'user-1');
      expect(result.status).toBe('active');
    });

    it('should throw if webhookId is missing', async () => {
      const service = createWebhookService(mockRepository);
      await expect(service.enableWebhook('', 'user-1')).rejects.toThrow('Webhook ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createWebhookService(mockRepository);
      await expect(service.enableWebhook('wh-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle already enabled', async () => {
      mockRepository.enableWebhook.mockResolvedValue({ status: 'already_enabled' });
      const service = createWebhookService(mockRepository);
      const result = await service.enableWebhook('wh-1', 'user-1');
      expect(result.status).toBe('already_enabled');
    });

    it('should handle enable failure', async () => {
      mockRepository.enableWebhook.mockRejectedValue(new Error('Cannot enable'));
      const service = createWebhookService(mockRepository);
      await expect(service.enableWebhook('wh-1', 'user-1')).rejects.toThrow('Cannot enable');
    });
  });

  describe('disableWebhook', () => {
    it('should disable a webhook', async () => {
      mockRepository.disableWebhook.mockResolvedValue({ webhookId: 'wh-1', status: 'inactive', disabledAt: '2024-01-01' });
      const service = createWebhookService(mockRepository);
      const result = await service.disableWebhook('wh-1', 'user-1');
      expect(result.status).toBe('inactive');
    });

    it('should throw if webhookId is missing', async () => {
      const service = createWebhookService(mockRepository);
      await expect(service.disableWebhook('', 'user-1')).rejects.toThrow('Webhook ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createWebhookService(mockRepository);
      await expect(service.disableWebhook('wh-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle already disabled', async () => {
      mockRepository.disableWebhook.mockResolvedValue({ status: 'already_disabled' });
      const service = createWebhookService(mockRepository);
      const result = await service.disableWebhook('wh-1', 'user-1');
      expect(result.status).toBe('already_disabled');
    });

    it('should handle disable failure', async () => {
      mockRepository.disableWebhook.mockRejectedValue(new Error('Cannot disable'));
      const service = createWebhookService(mockRepository);
      await expect(service.disableWebhook('wh-1', 'user-1')).rejects.toThrow('Cannot disable');
    });
  });

  describe('testWebhook', () => {
    it('should test a webhook', async () => {
      mockRepository.testWebhook.mockResolvedValue({ webhookId: 'wh-1', status: 'success', responseCode: 200, latency: 150 });
      const service = createWebhookService(mockRepository);
      const result = await service.testWebhook('wh-1', 'user-1');
      expect(result.status).toBe('success');
      expect(result.responseCode).toBe(200);
    });

    it('should throw if webhookId is missing', async () => {
      const service = createWebhookService(mockRepository);
      await expect(service.testWebhook('', 'user-1')).rejects.toThrow('Webhook ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createWebhookService(mockRepository);
      await expect(service.testWebhook('wh-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle test failure', async () => {
      mockRepository.testWebhook.mockResolvedValue({ webhookId: 'wh-1', status: 'failed', error: 'Connection refused' });
      const service = createWebhookService(mockRepository);
      const result = await service.testWebhook('wh-1', 'user-1');
      expect(result.status).toBe('failed');
      expect(result.error).toBe('Connection refused');
    });

    it('should return test details', async () => {
      mockRepository.testWebhook.mockResolvedValue({ webhookId: 'wh-1', status: 'success', responseCode: 200, latency: 150, responseBody: 'OK' });
      const service = createWebhookService(mockRepository);
      const result = await service.testWebhook('wh-1', 'user-1');
      expect(result.responseBody).toBe('OK');
    });

    it('should handle timeout', async () => {
      mockRepository.testWebhook.mockResolvedValue({ webhookId: 'wh-1', status: 'timeout', error: 'Request timed out after 30s' });
      const service = createWebhookService(mockRepository);
      const result = await service.testWebhook('wh-1', 'user-1');
      expect(result.status).toBe('timeout');
    });
  });
});
