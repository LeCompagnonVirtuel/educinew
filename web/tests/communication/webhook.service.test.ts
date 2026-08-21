import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createWebhookService } from '../../src/features/communication/services/webhook.service';

const mockRepository = {
  getWebhooks: vi.fn(),
  createWebhook: vi.fn(),
  updateWebhook: vi.fn(),
  deleteWebhook: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('WebhookService', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should create WebhookService with all methods', () => {
    const service = createWebhookService(mockRepository as any);
    expect(typeof service.getWebhooks).toBe('function');
    expect(typeof service.createWebhook).toBe('function');
    expect(typeof service.updateWebhook).toBe('function');
    expect(typeof service.deleteWebhook).toBe('function');
  });

  it('should fetch webhooks', async () => {
    const service = createWebhookService(mockRepository as any);
    mockRepository.getWebhooks.mockResolvedValue([{ id: 'w1' }]);
    const result = await service.getWebhooks('school1', 'user1');
    expect(result).toEqual([{ id: 'w1' }]);
  });

  it('should throw if schoolId missing', async () => {
    const service = createWebhookService(mockRepository as any);
    await expect(service.getWebhooks('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should create a webhook', async () => {
    const service = createWebhookService(mockRepository as any);
    mockRepository.createWebhook.mockResolvedValue({ id: 'w1', url: 'https://hook.example' });
    const result = await service.createWebhook('school1', 'user1', { url: 'https://hook.example', events: ['message.sent'] });
    expect(result.url).toBe('https://hook.example');
  });

  it('should throw if url missing', async () => {
    const service = createWebhookService(mockRepository as any);
    await expect(service.createWebhook('school1', 'user1', { events: ['message.sent'] })).rejects.toThrow('webhook URL is required');
  });

  it('should throw if events missing', async () => {
    const service = createWebhookService(mockRepository as any);
    await expect(service.createWebhook('school1', 'user1', { url: 'https://hook.example' })).rejects.toThrow('at least one event is required');
  });

  it('should throw if events empty', async () => {
    const service = createWebhookService(mockRepository as any);
    await expect(service.createWebhook('school1', 'user1', { url: 'https://hook.example', events: [] })).rejects.toThrow('at least one event is required');
  });

  it('should update a webhook', async () => {
    const service = createWebhookService(mockRepository as any);
    mockRepository.updateWebhook.mockResolvedValue({ id: 'w1', url: 'https://updated.example' });
    const result = await service.updateWebhook('w1', 'user1', { url: 'https://updated.example', schoolId: 'school1' });
    expect(result.url).toBe('https://updated.example');
  });

  it('should throw if data missing for update', async () => {
    const service = createWebhookService(mockRepository as any);
    await expect(service.updateWebhook('w1', 'user1', undefined)).rejects.toThrow('update data is required');
  });

  it('should delete a webhook', async () => {
    const service = createWebhookService(mockRepository as any);
    await service.deleteWebhook('w1', 'user1');
    expect(mockRepository.deleteWebhook).toHaveBeenCalledWith('w1');
  });

  it('should throw if webhookId missing for update', async () => {
    const service = createWebhookService(mockRepository as any);
    await expect(service.updateWebhook('', 'user1', { url: 'x' })).rejects.toThrow('webhookId is required');
  });

  it('should throw if webhookId missing for delete', async () => {
    const service = createWebhookService(mockRepository as any);
    await expect(service.deleteWebhook('', 'user1')).rejects.toThrow('webhookId is required');
  });

  it('should handle getWebhooks with filters', async () => {
    const service = createWebhookService(mockRepository as any);
    mockRepository.getWebhooks.mockResolvedValue([]);
    await service.getWebhooks('school1', 'user1', { status: 'active' });
    expect(mockRepository.getWebhooks).toHaveBeenCalledWith('school1', 'user1', { status: 'active' });
  });

  it('should log event on createWebhook', async () => {
    const service = createWebhookService(mockRepository as any);
    mockRepository.createWebhook.mockResolvedValue({ id: 'w1' });
    await service.createWebhook('school1', 'user1', { url: 'https://hook.example', events: ['e1'] });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'webhook.created', expect.any(Object));
  });

  it('should log event on deleteWebhook', async () => {
    const service = createWebhookService(mockRepository as any);
    await service.deleteWebhook('w1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('', 'webhook.deleted', expect.any(Object));
  });

  it('should log event on updateWebhook', async () => {
    const service = createWebhookService(mockRepository as any);
    mockRepository.updateWebhook.mockResolvedValue({ id: 'w1' });
    await service.updateWebhook('w1', 'user1', { url: 'x', schoolId: 'school1' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'webhook.updated', expect.any(Object));
  });
});
