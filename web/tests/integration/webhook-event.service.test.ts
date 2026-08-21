import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createWebhookEventService } from '../../src/features/integration/services/webhook-event.service';

describe('WebhookEventService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getEvents: vi.fn(),
      getEventById: vi.fn(),
      createEvent: vi.fn(),
      getEventsByWebhookId: vi.fn(),
      getEventStats: vi.fn(),
      replayEvent: vi.fn(),
      getEventPayload: vi.fn(),
      deleteOldEvents: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createWebhookEventService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getEvents).toBeInstanceOf(Function);
    expect(service.getEventById).toBeInstanceOf(Function);
    expect(service.createEvent).toBeInstanceOf(Function);
    expect(service.getEventsByWebhookId).toBeInstanceOf(Function);
    expect(service.getEventStats).toBeInstanceOf(Function);
    expect(service.replayEvent).toBeInstanceOf(Function);
    expect(service.getEventPayload).toBeInstanceOf(Function);
    expect(service.deleteOldEvents).toBeInstanceOf(Function);
  });

  describe('getEvents', () => {
    it('should return events list', async () => {
      mockRepository.getEvents.mockResolvedValue([{ id: 'ev-1', type: 'document.created', webhookId: 'wh-1' }]);
      const service = createWebhookEventService(mockRepository);
      const result = await service.getEvents('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return events with filters', async () => {
      mockRepository.getEvents.mockResolvedValue([{ id: 'ev-1' }]);
      const service = createWebhookEventService(mockRepository);
      await service.getEvents('school-1', { type: 'document.created' });
      expect(mockRepository.getEvents).toHaveBeenCalledWith('school-1', { type: 'document.created' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createWebhookEventService(mockRepository);
      await expect(service.getEvents('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getEvents.mockResolvedValue([]);
      const service = createWebhookEventService(mockRepository);
      const result = await service.getEvents('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated events', async () => {
      mockRepository.getEvents.mockResolvedValue({ data: [{ id: 'ev-1' }], total: 100 });
      const service = createWebhookEventService(mockRepository);
      const result = await service.getEvents('school-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by date range', async () => {
      mockRepository.getEvents.mockResolvedValue([{ id: 'ev-1' }]);
      const service = createWebhookEventService(mockRepository);
      await service.getEvents('school-1', { since: '2024-01-01', until: '2024-01-31' });
      expect(mockRepository.getEvents).toHaveBeenCalledWith('school-1', { since: '2024-01-01', until: '2024-01-31' });
    });

    it('should handle repository errors', async () => {
      mockRepository.getEvents.mockRejectedValue(new Error('DB error'));
      const service = createWebhookEventService(mockRepository);
      await expect(service.getEvents('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getEventById', () => {
    it('should return a single event', async () => {
      mockRepository.getEventById.mockResolvedValue({ id: 'ev-1', type: 'document.created', payload: {} });
      const service = createWebhookEventService(mockRepository);
      const result = await service.getEventById('ev-1');
      expect(result.id).toBe('ev-1');
    });

    it('should throw if event not found', async () => {
      mockRepository.getEventById.mockResolvedValue(null);
      const service = createWebhookEventService(mockRepository);
      await expect(service.getEventById('nonexistent')).rejects.toThrow('Event not found');
    });

    it('should throw if id is missing', async () => {
      const service = createWebhookEventService(mockRepository);
      await expect(service.getEventById('')).rejects.toThrow('Event ID is required');
    });

    it('should return event with payload', async () => {
      mockRepository.getEventById.mockResolvedValue({ id: 'ev-1', payload: { documentId: 'doc-1', title: 'Test' } });
      const service = createWebhookEventService(mockRepository);
      const result = await service.getEventById('ev-1');
      expect(result.payload.documentId).toBe('doc-1');
    });

    it('should return event with delivery status', async () => {
      mockRepository.getEventById.mockResolvedValue({ id: 'ev-1', deliveryStatus: 'delivered', deliveredAt: '2024-01-01' });
      const service = createWebhookEventService(mockRepository);
      const result = await service.getEventById('ev-1');
      expect(result.deliveryStatus).toBe('delivered');
    });

    it('should handle repository errors', async () => {
      mockRepository.getEventById.mockRejectedValue(new Error('Query timeout'));
      const service = createWebhookEventService(mockRepository);
      await expect(service.getEventById('ev-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createEvent', () => {
    it('should create an event', async () => {
      mockRepository.createEvent.mockResolvedValue({ id: 'ev-1', type: 'document.created', payload: {} });
      const service = createWebhookEventService(mockRepository);
      const result = await service.createEvent({ schoolId: 'school-1', type: 'document.created', webhookId: 'wh-1', payload: { documentId: 'doc-1' } });
      expect(result.id).toBe('ev-1');
    });

    it('should throw if schoolId is missing', async () => {
      const service = createWebhookEventService(mockRepository);
      await expect(service.createEvent({ type: 'test', payload: {} })).rejects.toThrow('schoolId is required');
    });

    it('should throw if type is missing', async () => {
      const service = createWebhookEventService(mockRepository);
      await expect(service.createEvent({ schoolId: 'school-1', payload: {} })).rejects.toThrow('Event type is required');
    });

    it('should throw if payload is missing', async () => {
      const service = createWebhookEventService(mockRepository);
      await expect(service.createEvent({ schoolId: 'school-1', type: 'test' })).rejects.toThrow('Event payload is required');
    });

    it('should create event with metadata', async () => {
      mockRepository.createEvent.mockResolvedValue({ id: 'ev-1', metadata: { source: 'api', userId: 'user-1' } });
      const service = createWebhookEventService(mockRepository);
      const result = await service.createEvent({ schoolId: 'school-1', type: 'test', payload: {}, metadata: { source: 'api', userId: 'user-1' } });
      expect(result.metadata.source).toBe('api');
    });

    it('should handle creation failure', async () => {
      mockRepository.createEvent.mockRejectedValue(new Error('Invalid event'));
      const service = createWebhookEventService(mockRepository);
      await expect(service.createEvent({ schoolId: 'school-1', type: 'test', payload: {} })).rejects.toThrow('Invalid event');
    });
  });

  describe('getEventsByWebhookId', () => {
    it('should return events by webhook ID', async () => {
      mockRepository.getEventsByWebhookId.mockResolvedValue([{ id: 'ev-1', webhookId: 'wh-1' }]);
      const service = createWebhookEventService(mockRepository);
      const result = await service.getEventsByWebhookId('wh-1');
      expect(result).toHaveLength(1);
    });

    it('should throw if webhookId is missing', async () => {
      const service = createWebhookEventService(mockRepository);
      await expect(service.getEventsByWebhookId('')).rejects.toThrow('Webhook ID is required');
    });

    it('should return paginated events', async () => {
      mockRepository.getEventsByWebhookId.mockResolvedValue({ data: [{ id: 'ev-1' }], total: 50 });
      const service = createWebhookEventService(mockRepository);
      const result = await service.getEventsByWebhookId('wh-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should return empty events', async () => {
      mockRepository.getEventsByWebhookId.mockResolvedValue([]);
      const service = createWebhookEventService(mockRepository);
      const result = await service.getEventsByWebhookId('wh-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getEventsByWebhookId.mockRejectedValue(new Error('DB error'));
      const service = createWebhookEventService(mockRepository);
      await expect(service.getEventsByWebhookId('wh-1')).rejects.toThrow('DB error');
    });
  });

  describe('getEventStats', () => {
    it('should return event stats', async () => {
      mockRepository.getEventStats.mockResolvedValue({ totalEvents: 1000, deliveredEvents: 950, failedEvents: 50 });
      const service = createWebhookEventService(mockRepository);
      const result = await service.getEventStats('school-1');
      expect(result.totalEvents).toBe(1000);
    });

    it('should return stats with filters', async () => {
      mockRepository.getEventStats.mockResolvedValue({ stats: {} });
      const service = createWebhookEventService(mockRepository);
      await service.getEventStats('school-1', { since: '2024-01-01' });
      expect(mockRepository.getEventStats).toHaveBeenCalledWith('school-1', { since: '2024-01-01' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createWebhookEventService(mockRepository);
      await expect(service.getEventStats('')).rejects.toThrow('schoolId is required');
    });

    it('should return zero stats', async () => {
      mockRepository.getEventStats.mockResolvedValue({ totalEvents: 0 });
      const service = createWebhookEventService(mockRepository);
      const result = await service.getEventStats('school-1');
      expect(result.totalEvents).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getEventStats.mockRejectedValue(new Error('DB error'));
      const service = createWebhookEventService(mockRepository);
      await expect(service.getEventStats('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('replayEvent', () => {
    it('should replay an event', async () => {
      mockRepository.replayEvent.mockResolvedValue({ eventId: 'ev-1', status: 'replayed', replayedAt: '2024-01-01' });
      const service = createWebhookEventService(mockRepository);
      const result = await service.replayEvent('ev-1', 'user-1');
      expect(result.status).toBe('replayed');
    });

    it('should throw if eventId is missing', async () => {
      const service = createWebhookEventService(mockRepository);
      await expect(service.replayEvent('', 'user-1')).rejects.toThrow('Event ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createWebhookEventService(mockRepository);
      await expect(service.replayEvent('ev-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle replay failure', async () => {
      mockRepository.replayEvent.mockRejectedValue(new Error('Event not found'));
      const service = createWebhookEventService(mockRepository);
      await expect(service.replayEvent('nonexistent', 'user-1')).rejects.toThrow('Event not found');
    });

    it('should return replay details', async () => {
      mockRepository.replayEvent.mockResolvedValue({ eventId: 'ev-1', status: 'replayed', deliveryId: 'del-2', replayedAt: '2024-01-01' });
      const service = createWebhookEventService(mockRepository);
      const result = await service.replayEvent('ev-1', 'user-1');
      expect(result.deliveryId).toBe('del-2');
    });
  });

  describe('getEventPayload', () => {
    it('should return event payload', async () => {
      mockRepository.getEventPayload.mockResolvedValue({ eventId: 'ev-1', payload: { documentId: 'doc-1', title: 'Test' } });
      const service = createWebhookEventService(mockRepository);
      const result = await service.getEventPayload('ev-1');
      expect(result.payload.documentId).toBe('doc-1');
    });

    it('should throw if eventId is missing', async () => {
      const service = createWebhookEventService(mockRepository);
      await expect(service.getEventPayload('')).rejects.toThrow('Event ID is required');
    });

    it('should throw if event not found', async () => {
      mockRepository.getEventPayload.mockResolvedValue(null);
      const service = createWebhookEventService(mockRepository);
      await expect(service.getEventPayload('nonexistent')).rejects.toThrow('Event not found');
    });

    it('should handle repository errors', async () => {
      mockRepository.getEventPayload.mockRejectedValue(new Error('DB error'));
      const service = createWebhookEventService(mockRepository);
      await expect(service.getEventPayload('ev-1')).rejects.toThrow('DB error');
    });
  });

  describe('deleteOldEvents', () => {
    it('should delete old events', async () => {
      mockRepository.deleteOldEvents.mockResolvedValue({ deletedCount: 100 });
      const service = createWebhookEventService(mockRepository);
      const result = await service.deleteOldEvents('school-1', 'user-1', { olderThanDays: 90 });
      expect(result.deletedCount).toBe(100);
    });

    it('should throw if schoolId is missing', async () => {
      const service = createWebhookEventService(mockRepository);
      await expect(service.deleteOldEvents('', 'user-1', {})).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createWebhookEventService(mockRepository);
      await expect(service.deleteOldEvents('school-1', '', {})).rejects.toThrow('userId is required');
    });

    it('should throw if olderThanDays is missing', async () => {
      const service = createWebhookEventService(mockRepository);
      await expect(service.deleteOldEvents('school-1', 'user-1', {})).rejects.toThrow('olderThanDays is required');
    });

    it('should handle deletion failure', async () => {
      mockRepository.deleteOldEvents.mockRejectedValue(new Error('Cannot delete'));
      const service = createWebhookEventService(mockRepository);
      await expect(service.deleteOldEvents('school-1', 'user-1', { olderThanDays: 90 })).rejects.toThrow('Cannot delete');
    });
  });
});
