import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createEventService } from '../../src/features/integration/services/event.service';

describe('EventService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getEvents: vi.fn(),
      getEventById: vi.fn(),
      createEvent: vi.fn(),
      updateEvent: vi.fn(),
      deleteEvent: vi.fn(),
      publishEvent: vi.fn(),
      getEventSubscribers: vi.fn(),
      getEventStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createEventService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getEvents).toBeInstanceOf(Function);
    expect(service.getEventById).toBeInstanceOf(Function);
    expect(service.createEvent).toBeInstanceOf(Function);
    expect(service.updateEvent).toBeInstanceOf(Function);
    expect(service.deleteEvent).toBeInstanceOf(Function);
    expect(service.publishEvent).toBeInstanceOf(Function);
    expect(service.getEventSubscribers).toBeInstanceOf(Function);
    expect(service.getEventStats).toBeInstanceOf(Function);
  });

  describe('getEvents', () => {
    it('should return events list', async () => {
      mockRepository.getEvents.mockResolvedValue([{ id: 'ev-1', type: 'document.created', status: 'active' }]);
      const service = createEventService(mockRepository);
      const result = await service.getEvents('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return events with filters', async () => {
      mockRepository.getEvents.mockResolvedValue([{ id: 'ev-1' }]);
      const service = createEventService(mockRepository);
      await service.getEvents('school-1', { type: 'document.created' });
      expect(mockRepository.getEvents).toHaveBeenCalledWith('school-1', { type: 'document.created' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createEventService(mockRepository);
      await expect(service.getEvents('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getEvents.mockResolvedValue([]);
      const service = createEventService(mockRepository);
      const result = await service.getEvents('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated events', async () => {
      mockRepository.getEvents.mockResolvedValue({ data: [{ id: 'ev-1' }], total: 100 });
      const service = createEventService(mockRepository);
      const result = await service.getEvents('school-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by category', async () => {
      mockRepository.getEvents.mockResolvedValue([{ id: 'ev-1', category: 'document' }]);
      const service = createEventService(mockRepository);
      const result = await service.getEvents('school-1', { category: 'document' });
      expect(result).toHaveLength(1);
    });

    it('should return events with subscriber count', async () => {
      mockRepository.getEvents.mockResolvedValue([{ id: 'ev-1', subscriberCount: 5 }]);
      const service = createEventService(mockRepository);
      const result = await service.getEvents('school-1');
      expect(result[0].subscriberCount).toBe(5);
    });

    it('should handle repository errors', async () => {
      mockRepository.getEvents.mockRejectedValue(new Error('DB error'));
      const service = createEventService(mockRepository);
      await expect(service.getEvents('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getEventById', () => {
    it('should return a single event', async () => {
      mockRepository.getEventById.mockResolvedValue({ id: 'ev-1', type: 'document.created', status: 'active' });
      const service = createEventService(mockRepository);
      const result = await service.getEventById('ev-1');
      expect(result.id).toBe('ev-1');
    });

    it('should throw if event not found', async () => {
      mockRepository.getEventById.mockResolvedValue(null);
      const service = createEventService(mockRepository);
      await expect(service.getEventById('nonexistent')).rejects.toThrow('Event not found');
    });

    it('should throw if id is missing', async () => {
      const service = createEventService(mockRepository);
      await expect(service.getEventById('')).rejects.toThrow('Event ID is required');
    });

    it('should return event with schema', async () => {
      mockRepository.getEventById.mockResolvedValue({ id: 'ev-1', schema: { properties: { documentId: { type: 'string' } } } });
      const service = createEventService(mockRepository);
      const result = await service.getEventById('ev-1');
      expect(result.schema.properties.documentId).toBeDefined();
    });

    it('should return event with subscribers', async () => {
      mockRepository.getEventById.mockResolvedValue({ id: 'ev-1', subscribers: ['user-1', 'user-2'] });
      const service = createEventService(mockRepository);
      const result = await service.getEventById('ev-1');
      expect(result.subscribers).toHaveLength(2);
    });

    it('should return event with history', async () => {
      mockRepository.getEventById.mockResolvedValue({ id: 'ev-1', history: [{ action: 'created', timestamp: '2024-01-01' }] });
      const service = createEventService(mockRepository);
      const result = await service.getEventById('ev-1');
      expect(result.history).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getEventById.mockRejectedValue(new Error('Query timeout'));
      const service = createEventService(mockRepository);
      await expect(service.getEventById('ev-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createEvent', () => {
    it('should create an event', async () => {
      mockRepository.createEvent.mockResolvedValue({ id: 'ev-1', type: 'document.created', status: 'active' });
      const service = createEventService(mockRepository);
      const result = await service.createEvent('school-1', 'user-1', { type: 'document.created', category: 'document', schema: { properties: {} } });
      expect(result.id).toBe('ev-1');
    });

    it('should throw if schoolId is missing', async () => {
      const service = createEventService(mockRepository);
      await expect(service.createEvent('', 'user-1', { type: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createEventService(mockRepository);
      await expect(service.createEvent('school-1', '', { type: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if type is missing', async () => {
      const service = createEventService(mockRepository);
      await expect(service.createEvent('school-1', 'user-1', { type: '' })).rejects.toThrow('Event type is required');
    });

    it('should create event with description', async () => {
      mockRepository.createEvent.mockResolvedValue({ id: 'ev-1', description: 'Triggered when a document is created' });
      const service = createEventService(mockRepository);
      const result = await service.createEvent('school-1', 'user-1', { type: 'T', category: 'document', description: 'Triggered when a document is created' });
      expect(result.description).toBe('Triggered when a document is created');
    });

    it('should create event with schema', async () => {
      mockRepository.createEvent.mockResolvedValue({ id: 'ev-1', schema: { properties: { documentId: { type: 'string' } } } });
      const service = createEventService(mockRepository);
      const result = await service.createEvent('school-1', 'user-1', { type: 'T', category: 'document', schema: { properties: { documentId: { type: 'string' } } } });
      expect(result.schema.properties.documentId).toBeDefined();
    });

    it('should handle creation failure', async () => {
      mockRepository.createEvent.mockRejectedValue(new Error('Invalid event'));
      const service = createEventService(mockRepository);
      await expect(service.createEvent('school-1', 'user-1', { type: 'T', category: 'document' })).rejects.toThrow('Invalid event');
    });
  });

  describe('updateEvent', () => {
    it('should update an event', async () => {
      mockRepository.getEventById.mockResolvedValue({ id: 'ev-1', type: 'Old' });
      mockRepository.updateEvent.mockResolvedValue({ id: 'ev-1', type: 'Updated' });
      const service = createEventService(mockRepository);
      const result = await service.updateEvent('ev-1', 'user-1', { type: 'Updated' });
      expect(result.type).toBe('Updated');
    });

    it('should throw if event not found', async () => {
      mockRepository.getEventById.mockResolvedValue(null);
      const service = createEventService(mockRepository);
      await expect(service.updateEvent('nonexistent', 'user-1', { type: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createEventService(mockRepository);
      await expect(service.updateEvent('', 'user-1', { type: 'New' })).rejects.toThrow('Event ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createEventService(mockRepository);
      await expect(service.updateEvent('ev-1', '', { type: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update event schema', async () => {
      mockRepository.getEventById.mockResolvedValue({ id: 'ev-1' });
      mockRepository.updateEvent.mockResolvedValue({ id: 'ev-1', schema: { properties: { newField: { type: 'string' } } } });
      const service = createEventService(mockRepository);
      const result = await service.updateEvent('ev-1', 'user-1', { schema: { properties: { newField: { type: 'string' } } } });
      expect(result.schema.properties.newField).toBeDefined();
    });

    it('should handle update failure', async () => {
      mockRepository.getEventById.mockResolvedValue({ id: 'ev-1' });
      mockRepository.updateEvent.mockRejectedValue(new Error('Cannot update'));
      const service = createEventService(mockRepository);
      await expect(service.updateEvent('ev-1', 'user-1', { type: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteEvent', () => {
    it('should delete an event', async () => {
      mockRepository.getEventById.mockResolvedValue({ id: 'ev-1' });
      mockRepository.deleteEvent.mockResolvedValue({ success: true });
      const service = createEventService(mockRepository);
      await service.deleteEvent('ev-1', 'user-1');
      expect(mockRepository.deleteEvent).toHaveBeenCalledWith('ev-1');
    });

    it('should throw if event not found', async () => {
      mockRepository.getEventById.mockResolvedValue(null);
      const service = createEventService(mockRepository);
      await expect(service.deleteEvent('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createEventService(mockRepository);
      await expect(service.deleteEvent('', 'user-1')).rejects.toThrow('Event ID is required');
    });

    it('should handle deletion with active subscribers', async () => {
      mockRepository.getEventById.mockResolvedValue({ id: 'ev-1' });
      mockRepository.deleteEvent.mockRejectedValue(new Error('Event has active subscribers'));
      const service = createEventService(mockRepository);
      await expect(service.deleteEvent('ev-1', 'user-1')).rejects.toThrow('Event has active subscribers');
    });

    it('should force delete event', async () => {
      mockRepository.getEventById.mockResolvedValue({ id: 'ev-1' });
      mockRepository.deleteEvent.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createEventService(mockRepository);
      const result = await service.deleteEvent('ev-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('publishEvent', () => {
    it('should publish an event', async () => {
      mockRepository.publishEvent.mockResolvedValue({ eventId: 'ev-1', status: 'published', publishedAt: '2024-01-01', subscriberCount: 5 });
      const service = createEventService(mockRepository);
      const result = await service.publishEvent('ev-1', 'user-1', { payload: { documentId: 'doc-1' } });
      expect(result.status).toBe('published');
      expect(result.subscriberCount).toBe(5);
    });

    it('should throw if eventId is missing', async () => {
      const service = createEventService(mockRepository);
      await expect(service.publishEvent('', 'user-1', { payload: {} })).rejects.toThrow('Event ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createEventService(mockRepository);
      await expect(service.publishEvent('ev-1', '', { payload: {} })).rejects.toThrow('userId is required');
    });

    it('should throw if payload is missing', async () => {
      const service = createEventService(mockRepository);
      await expect(service.publishEvent('ev-1', 'user-1', {})).rejects.toThrow('Event payload is required');
    });

    it('should handle publish failure', async () => {
      mockRepository.publishEvent.mockRejectedValue(new Error('Event not active'));
      const service = createEventService(mockRepository);
      await expect(service.publishEvent('ev-1', 'user-1', { payload: {} })).rejects.toThrow('Event not active');
    });

    it('should return publish details', async () => {
      mockRepository.publishEvent.mockResolvedValue({ eventId: 'ev-1', status: 'published', deliveryId: 'del-1', publishedAt: '2024-01-01' });
      const service = createEventService(mockRepository);
      const result = await service.publishEvent('ev-1', 'user-1', { payload: {} });
      expect(result.deliveryId).toBe('del-1');
    });
  });

  describe('getEventSubscribers', () => {
    it('should return event subscribers', async () => {
      mockRepository.getEventSubscribers.mockResolvedValue([{ id: 'sub-1', type: 'webhook', target: 'https://example.com' }]);
      const service = createEventService(mockRepository);
      const result = await service.getEventSubscribers('ev-1');
      expect(result).toHaveLength(1);
    });

    it('should throw if eventId is missing', async () => {
      const service = createEventService(mockRepository);
      await expect(service.getEventSubscribers('')).rejects.toThrow('Event ID is required');
    });

    it('should return empty subscribers', async () => {
      mockRepository.getEventSubscribers.mockResolvedValue([]);
      const service = createEventService(mockRepository);
      const result = await service.getEventSubscribers('ev-1');
      expect(result).toEqual([]);
    });

    it('should return paginated subscribers', async () => {
      mockRepository.getEventSubscribers.mockResolvedValue({ data: [{ id: 'sub-1' }], total: 20 });
      const service = createEventService(mockRepository);
      const result = await service.getEventSubscribers('ev-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getEventSubscribers.mockRejectedValue(new Error('DB error'));
      const service = createEventService(mockRepository);
      await expect(service.getEventSubscribers('ev-1')).rejects.toThrow('DB error');
    });
  });

  describe('getEventStats', () => {
    it('should return event stats', async () => {
      mockRepository.getEventStats.mockResolvedValue({ totalEvents: 100, totalPublishes: 500, averageSubscribers: 5 });
      const service = createEventService(mockRepository);
      const result = await service.getEventStats('school-1');
      expect(result.totalEvents).toBe(100);
    });

    it('should return stats with filters', async () => {
      mockRepository.getEventStats.mockResolvedValue({ stats: {} });
      const service = createEventService(mockRepository);
      await service.getEventStats('school-1', { since: '2024-01-01' });
      expect(mockRepository.getEventStats).toHaveBeenCalledWith('school-1', { since: '2024-01-01' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createEventService(mockRepository);
      await expect(service.getEventStats('')).rejects.toThrow('schoolId is required');
    });

    it('should return zero stats', async () => {
      mockRepository.getEventStats.mockResolvedValue({ totalEvents: 0 });
      const service = createEventService(mockRepository);
      const result = await service.getEventStats('school-1');
      expect(result.totalEvents).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getEventStats.mockRejectedValue(new Error('DB error'));
      const service = createEventService(mockRepository);
      await expect(service.getEventStats('school-1')).rejects.toThrow('DB error');
    });
  });
});
