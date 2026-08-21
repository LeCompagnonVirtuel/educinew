import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createScheduledMessageService } from '../../src/features/communication/services/scheduled-message.service';

const mockRepository = {
  scheduleMessage: vi.fn(),
  getScheduledMessage: vi.fn(),
  updateScheduledMessage: vi.fn(),
  getScheduledMessages: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('ScheduledMessageService', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should create ScheduledMessageService with all methods', () => {
    const service = createScheduledMessageService(mockRepository as any);
    expect(typeof service.scheduleMessage).toBe('function');
    expect(typeof service.cancelScheduledMessage).toBe('function');
    expect(typeof service.getScheduledMessages).toBe('function');
  });

  it('should schedule a message', async () => {
    const service = createScheduledMessageService(mockRepository as any);
    const futureDate = new Date(Date.now() + 86400000).toISOString();
    mockRepository.scheduleMessage.mockResolvedValue({ id: 'sm1', status: 'scheduled' });
    const result = await service.scheduleMessage('school1', 'user1', { content: 'Hello', scheduledFor: futureDate, conversationId: 'c1' });
    expect(result.status).toBe('scheduled');
  });

  it('should throw if content missing', async () => {
    const service = createScheduledMessageService(mockRepository as any);
    const futureDate = new Date(Date.now() + 86400000).toISOString();
    await expect(service.scheduleMessage('school1', 'user1', { scheduledFor: futureDate, conversationId: 'c1' })).rejects.toThrow('message content is required');
  });

  it('should throw if scheduledFor missing', async () => {
    const service = createScheduledMessageService(mockRepository as any);
    await expect(service.scheduleMessage('school1', 'user1', { content: 'Hi', conversationId: 'c1' })).rejects.toThrow('scheduledFor date is required');
  });

  it('should throw if scheduledFor in the past', async () => {
    const service = createScheduledMessageService(mockRepository as any);
    await expect(service.scheduleMessage('school1', 'user1', { content: 'Hi', scheduledFor: '2020-01-01', conversationId: 'c1' })).rejects.toThrow('scheduledFor must be in the future');
  });

  it('should throw if conversationId missing', async () => {
    const service = createScheduledMessageService(mockRepository as any);
    const futureDate = new Date(Date.now() + 86400000).toISOString();
    await expect(service.scheduleMessage('school1', 'user1', { content: 'Hi', scheduledFor: futureDate })).rejects.toThrow('conversationId is required');
  });

  it('should cancel a scheduled message', async () => {
    const service = createScheduledMessageService(mockRepository as any);
    mockRepository.getScheduledMessage.mockResolvedValue({ id: 'sm1', status: 'scheduled', schoolId: 'school1' });
    mockRepository.updateScheduledMessage.mockResolvedValue({ id: 'sm1', status: 'cancelled' });
    const result = await service.cancelScheduledMessage('sm1', 'user1');
    expect(result.status).toBe('cancelled');
  });

  it('should throw if scheduled message not found', async () => {
    const service = createScheduledMessageService(mockRepository as any);
    mockRepository.getScheduledMessage.mockResolvedValue(null);
    await expect(service.cancelScheduledMessage('sm1', 'user1')).rejects.toThrow('Scheduled message not found');
  });

  it('should throw if already sent', async () => {
    const service = createScheduledMessageService(mockRepository as any);
    mockRepository.getScheduledMessage.mockResolvedValue({ id: 'sm1', status: 'sent' });
    await expect(service.cancelScheduledMessage('sm1', 'user1')).rejects.toThrow('Cannot cancel a sent message');
  });

  it('should fetch scheduled messages', async () => {
    const service = createScheduledMessageService(mockRepository as any);
    mockRepository.getScheduledMessages.mockResolvedValue([{ id: 'sm1' }]);
    const result = await service.getScheduledMessages('school1', 'user1');
    expect(result).toEqual([{ id: 'sm1' }]);
  });

  it('should throw if schoolId missing for getScheduledMessages', async () => {
    const service = createScheduledMessageService(mockRepository as any);
    await expect(service.getScheduledMessages('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should handle getScheduledMessages with filters', async () => {
    const service = createScheduledMessageService(mockRepository as any);
    mockRepository.getScheduledMessages.mockResolvedValue([]);
    await service.getScheduledMessages('school1', 'user1', { status: 'pending' });
    expect(mockRepository.getScheduledMessages).toHaveBeenCalledWith('school1', 'user1', { status: 'pending' });
  });

  it('should log event on scheduleMessage', async () => {
    const service = createScheduledMessageService(mockRepository as any);
    const futureDate = new Date(Date.now() + 86400000).toISOString();
    mockRepository.scheduleMessage.mockResolvedValue({ id: 'sm1' });
    await service.scheduleMessage('school1', 'user1', { content: 'Hi', scheduledFor: futureDate, conversationId: 'c1' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'message.scheduled', expect.any(Object));
  });

  it('should log event on cancelScheduledMessage', async () => {
    const service = createScheduledMessageService(mockRepository as any);
    mockRepository.getScheduledMessage.mockResolvedValue({ id: 'sm1', status: 'scheduled', schoolId: 'school1' });
    mockRepository.updateScheduledMessage.mockResolvedValue({ id: 'sm1' });
    await service.cancelScheduledMessage('sm1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'message.schedule_cancelled', expect.any(Object));
  });

  it('should throw if scheduledMessageId missing', async () => {
    const service = createScheduledMessageService(mockRepository as any);
    await expect(service.cancelScheduledMessage('', 'user1')).rejects.toThrow('scheduledMessageId is required');
  });

  it('should handle scheduleMessage error', async () => {
    const service = createScheduledMessageService(mockRepository as any);
    const futureDate = new Date(Date.now() + 86400000).toISOString();
    mockRepository.scheduleMessage.mockRejectedValue(new Error('fail'));
    await expect(service.scheduleMessage('school1', 'user1', { content: 'Hi', scheduledFor: futureDate, conversationId: 'c1' })).rejects.toThrow('fail');
  });

  it('should handle cancelScheduledMessage error', async () => {
    const service = createScheduledMessageService(mockRepository as any);
    mockRepository.getScheduledMessage.mockRejectedValue(new Error('fail'));
    await expect(service.cancelScheduledMessage('sm1', 'user1')).rejects.toThrow('fail');
  });

  it('should handle getScheduledMessages error', async () => {
    const service = createScheduledMessageService(mockRepository as any);
    mockRepository.getScheduledMessages.mockRejectedValue(new Error('fail'));
    await expect(service.getScheduledMessages('school1', 'user1')).rejects.toThrow('fail');
  });

  it('should throw if data missing for scheduleMessage', async () => {
    const service = createScheduledMessageService(mockRepository as any);
    await expect(service.scheduleMessage('school1', 'user1', null)).rejects.toThrow('message content is required');
  });
});
