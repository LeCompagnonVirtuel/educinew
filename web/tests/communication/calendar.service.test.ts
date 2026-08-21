import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createCalendarService } from '../../src/features/communication/services/calendar.service';

const mockRepository = {
  getCalendarEvents: vi.fn(),
  getCalendarEvent: vi.fn(),
  createCalendarEvent: vi.fn(),
  updateCalendarEvent: vi.fn(),
  deleteCalendarEvent: vi.fn(),
  getCalendarSubscriptions: vi.fn(),
  getCalendarStats: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('CalendarService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create CalendarService with all methods', () => {
    const service = createCalendarService(mockRepository as any);
    expect(typeof service.getCalendarEvents).toBe('function');
    expect(typeof service.getCalendarEvent).toBe('function');
    expect(typeof service.createCalendarEvent).toBe('function');
    expect(typeof service.updateCalendarEvent).toBe('function');
    expect(typeof service.deleteCalendarEvent).toBe('function');
    expect(typeof service.respondToEvent).toBe('function');
    expect(typeof service.getCalendarSubscriptions).toBe('function');
    expect(typeof service.getCalendarStats).toBe('function');
    expect(typeof service.getUpcomingEvents).toBe('function');
    expect(typeof service.getRecurringEvents).toBe('function');
  });

  it('should fetch calendar events', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarEvents.mockResolvedValue([{ id: 'ev1' }]);
    const result = await service.getCalendarEvents('school1', 'user1');
    expect(result).toEqual([{ id: 'ev1' }]);
  });

  it('should throw if schoolId missing for getCalendarEvents', async () => {
    const service = createCalendarService(mockRepository as any);
    await expect(service.getCalendarEvents('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should fetch a single calendar event', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarEvent.mockResolvedValue({ id: 'ev1', title: 'Meeting' });
    const result = await service.getCalendarEvent('ev1', 'user1');
    expect(result).toEqual({ id: 'ev1', title: 'Meeting' });
  });

  it('should throw if event not found', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarEvent.mockResolvedValue(null);
    await expect(service.getCalendarEvent('ev1', 'user1')).rejects.toThrow();
  });

  it('should create a calendar event', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.createCalendarEvent.mockResolvedValue({ id: 'ev1', title: 'Meeting' });
    const result = await service.createCalendarEvent('school1', 'user1', { title: 'Meeting', startTime: '2024-01-01T10:00:00Z', endTime: '2024-01-01T11:00:00Z' });
    expect(result.title).toBe('Meeting');
  });

  it('should throw if title missing for createCalendarEvent', async () => {
    const service = createCalendarService(mockRepository as any);
    await expect(service.createCalendarEvent('school1', 'user1', {})).rejects.toThrow('event title is required');
  });

  it('should throw if startTime missing for createCalendarEvent', async () => {
    const service = createCalendarService(mockRepository as any);
    await expect(service.createCalendarEvent('school1', 'user1', { title: 'T', endTime: '2024-01-01T11:00:00Z' })).rejects.toThrow('event startTime is required');
  });

  it('should throw if endTime missing for createCalendarEvent', async () => {
    const service = createCalendarService(mockRepository as any);
    await expect(service.createCalendarEvent('school1', 'user1', { title: 'T', startTime: '2024-01-01T10:00:00Z' })).rejects.toThrow('event endTime is required');
  });

  it('should update a calendar event', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarEvent.mockResolvedValue({ id: 'ev1', schoolId: 'school1' });
    mockRepository.updateCalendarEvent.mockResolvedValue({ id: 'ev1', title: 'Updated' });
    const result = await service.updateCalendarEvent('ev1', 'user1', { title: 'Updated' });
    expect(result.title).toBe('Updated');
  });

  it('should throw if event not found for update', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarEvent.mockResolvedValue(null);
    await expect(service.updateCalendarEvent('ev1', 'user1', { title: 'X' })).rejects.toThrow();
  });

  it('should throw if data missing for updateCalendarEvent', async () => {
    const service = createCalendarService(mockRepository as any);
    await expect(service.updateCalendarEvent('ev1', 'user1', undefined)).rejects.toThrow('update data is required');
  });

  it('should delete a calendar event', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarEvent.mockResolvedValue({ id: 'ev1', schoolId: 'school1' });
    await service.deleteCalendarEvent('ev1', 'user1');
    expect(mockRepository.deleteCalendarEvent).toHaveBeenCalledWith('ev1');
  });

  it('should throw if event not found for delete', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarEvent.mockResolvedValue(null);
    await expect(service.deleteCalendarEvent('ev1', 'user1')).rejects.toThrow();
  });

  it('should respond to event with accepted', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarEvent.mockResolvedValue({ id: 'ev1', schoolId: 'school1', attendees: [] });
    mockRepository.updateCalendarEvent.mockResolvedValue({ id: 'ev1', attendees: [{ userId: 'user1', response: 'accepted' }] });
    const result = await service.respondToEvent('ev1', 'user1', 'accepted');
    expect(result.attendees[0].response).toBe('accepted');
  });

  it('should respond to event with declined', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarEvent.mockResolvedValue({ id: 'ev1', schoolId: 'school1', attendees: [] });
    mockRepository.updateCalendarEvent.mockResolvedValue({ id: 'ev1' });
    const result = await service.respondToEvent('ev1', 'user1', 'declined');
    expect(result).toBeDefined();
  });

  it('should throw if invalid response for respondToEvent', async () => {
    const service = createCalendarService(mockRepository as any);
    await expect(service.respondToEvent('ev1', 'user1', 'maybe')).rejects.toThrow();
  });

  it('should throw if event not found for respondToEvent', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarEvent.mockResolvedValue(null);
    await expect(service.respondToEvent('ev1', 'user1', 'accepted')).rejects.toThrow();
  });

  it('should get calendar subscriptions', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarSubscriptions.mockResolvedValue([{ id: 'sub1' }]);
    const result = await service.getCalendarSubscriptions('school1', 'user1');
    expect(result).toEqual([{ id: 'sub1' }]);
  });

  it('should get calendar stats', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarStats.mockResolvedValue({ events: 50 });
    const result = await service.getCalendarStats('school1');
    expect(result).toEqual({ events: 50 });
  });

  it('should get upcoming events', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarEvents.mockResolvedValue([{ id: 'ev1' }]);
    const result = await service.getUpcomingEvents('school1', 'user1', 7);
    expect(result).toEqual([{ id: 'ev1' }]);
  });

  it('should get recurring events', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarEvents.mockResolvedValue([{ id: 'ev1' }]);
    const result = await service.getRecurringEvents('school1', 'user1');
    expect(result).toEqual([{ id: 'ev1' }]);
  });

  it('should handle getCalendarEvents with filters', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarEvents.mockResolvedValue([]);
    await service.getCalendarEvents('school1', 'user1', { type: 'meeting' });
    expect(mockRepository.getCalendarEvents).toHaveBeenCalledWith('school1', 'user1', { type: 'meeting' });
  });

  it('should handle getCalendarStats with date range', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarStats.mockResolvedValue({ events: 10 });
    await service.getCalendarStats('school1', '2024-01-01', '2024-12-31');
    expect(mockRepository.getCalendarStats).toHaveBeenCalledWith('school1', '2024-01-01', '2024-12-31');
  });

  it('should log event on createCalendarEvent', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.createCalendarEvent.mockResolvedValue({ id: 'ev1' });
    await service.createCalendarEvent('school1', 'user1', { title: 'T', startTime: '2024-01-01T10:00:00Z', endTime: '2024-01-01T11:00:00Z' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'calendar_event.created', expect.any(Object));
  });

  it('should log event on deleteCalendarEvent', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarEvent.mockResolvedValue({ id: 'ev1', schoolId: 'school1' });
    await service.deleteCalendarEvent('ev1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'calendar_event.deleted', expect.any(Object));
  });

  it('should throw if eventId missing for getCalendarEvent', async () => {
    const service = createCalendarService(mockRepository as any);
    await expect(service.getCalendarEvent('', 'user1')).rejects.toThrow('eventId is required');
  });

  it('should throw if eventId missing for updateCalendarEvent', async () => {
    const service = createCalendarService(mockRepository as any);
    await expect(service.updateCalendarEvent('', 'user1', { title: 'X' })).rejects.toThrow('eventId is required');
  });

  it('should throw if eventId missing for deleteCalendarEvent', async () => {
    const service = createCalendarService(mockRepository as any);
    await expect(service.deleteCalendarEvent('', 'user1')).rejects.toThrow('eventId is required');
  });

  it('should throw if eventId missing for respondToEvent', async () => {
    const service = createCalendarService(mockRepository as any);
    await expect(service.respondToEvent('', 'user1', 'accepted')).rejects.toThrow('eventId is required');
  });

  it('should throw if response missing for respondToEvent', async () => {
    const service = createCalendarService(mockRepository as any);
    await expect(service.respondToEvent('ev1', 'user1', '')).rejects.toThrow('response is required');
  });

  it('should respond with tentative', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarEvent.mockResolvedValue({ id: 'ev1', schoolId: 'school1', attendees: [] });
    mockRepository.updateCalendarEvent.mockResolvedValue({ id: 'ev1' });
    const result = await service.respondToEvent('ev1', 'user1', 'tentative');
    expect(result).toBeDefined();
  });

  it('should handle getUpcomingEvents without days param', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarEvents.mockResolvedValue([]);
    await service.getUpcomingEvents('school1', 'user1');
    expect(mockRepository.getCalendarEvents).toHaveBeenCalled();
  });

  it('should handle getRecurringEvents with default filter', async () => {
    const service = createCalendarService(mockRepository as any);
    mockRepository.getCalendarEvents.mockResolvedValue([]);
    await service.getRecurringEvents('school1', 'user1');
    expect(mockRepository.getCalendarEvents).toHaveBeenCalledWith('school1', 'user1', { recurring: true });
  });
});
