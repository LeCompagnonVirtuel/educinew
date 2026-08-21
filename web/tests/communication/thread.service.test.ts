import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createThreadService } from '../../src/features/communication/services/thread.service';

const mockRepository = {
  getThread: vi.fn(),
  getThreadMessages: vi.fn(),
  updateThread: vi.fn(),
  getThreadStats: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('ThreadService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create ThreadService with all methods', () => {
    const service = createThreadService(mockRepository as any);
    expect(typeof service.getThread).toBe('function');
    expect(typeof service.getThreadMessages).toBe('function');
    expect(typeof service.lockThread).toBe('function');
    expect(typeof service.getThreadStats).toBe('function');
  });

  it('should fetch a thread', async () => {
    const service = createThreadService(mockRepository as any);
    mockRepository.getThread.mockResolvedValue({ id: 't1', schoolId: 's1' });
    const result = await service.getThread('t1', 'user1');
    expect(result).toEqual({ id: 't1', schoolId: 's1' });
  });

  it('should throw if thread not found', async () => {
    const service = createThreadService(mockRepository as any);
    mockRepository.getThread.mockResolvedValue(null);
    await expect(service.getThread('t1', 'user1')).rejects.toThrow();
  });

  it('should throw if threadId missing for getThread', async () => {
    const service = createThreadService(mockRepository as any);
    await expect(service.getThread('', 'user1')).rejects.toThrow('threadId is required');
  });

  it('should throw if userId missing for getThread', async () => {
    const service = createThreadService(mockRepository as any);
    await expect(service.getThread('t1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch thread messages', async () => {
    const service = createThreadService(mockRepository as any);
    mockRepository.getThread.mockResolvedValue({ id: 't1' });
    mockRepository.getThreadMessages.mockResolvedValue([{ id: 'm1' }]);
    const result = await service.getThreadMessages('t1', 'user1');
    expect(result).toEqual([{ id: 'm1' }]);
  });

  it('should throw if thread not found for getThreadMessages', async () => {
    const service = createThreadService(mockRepository as any);
    mockRepository.getThread.mockResolvedValue(null);
    await expect(service.getThreadMessages('t1', 'user1')).rejects.toThrow();
  });

  it('should lock a thread', async () => {
    const service = createThreadService(mockRepository as any);
    mockRepository.getThread.mockResolvedValue({ id: 't1', schoolId: 's1' });
    mockRepository.updateThread.mockResolvedValue({ id: 't1', locked: true });
    const result = await service.lockThread('t1', 'user1', true);
    expect(result.locked).toBe(true);
  });

  it('should unlock a thread', async () => {
    const service = createThreadService(mockRepository as any);
    mockRepository.getThread.mockResolvedValue({ id: 't1', schoolId: 's1' });
    mockRepository.updateThread.mockResolvedValue({ id: 't1', locked: false });
    const result = await service.lockThread('t1', 'user1', false);
    expect(result.locked).toBe(false);
  });

  it('should throw if thread not found for lockThread', async () => {
    const service = createThreadService(mockRepository as any);
    mockRepository.getThread.mockResolvedValue(null);
    await expect(service.lockThread('t1', 'user1', true)).rejects.toThrow();
  });

  it('should get thread stats', async () => {
    const service = createThreadService(mockRepository as any);
    mockRepository.getThreadStats.mockResolvedValue({ replies: 10 });
    const result = await service.getThreadStats('t1');
    expect(result).toEqual({ replies: 10 });
  });

  it('should throw if threadId missing for getThreadStats', async () => {
    const service = createThreadService(mockRepository as any);
    await expect(service.getThreadStats('')).rejects.toThrow('threadId is required');
  });

  it('should throw if threadId missing for getThreadMessages', async () => {
    const service = createThreadService(mockRepository as any);
    await expect(service.getThreadMessages('', 'user1')).rejects.toThrow('threadId is required');
  });

  it('should throw if userId missing for getThreadMessages', async () => {
    const service = createThreadService(mockRepository as any);
    await expect(service.getThreadMessages('t1', '')).rejects.toThrow('userId is required');
  });

  it('should throw if threadId missing for lockThread', async () => {
    const service = createThreadService(mockRepository as any);
    await expect(service.lockThread('', 'user1', true)).rejects.toThrow('threadId is required');
  });

  it('should throw if userId missing for lockThread', async () => {
    const service = createThreadService(mockRepository as any);
    await expect(service.lockThread('t1', '', true)).rejects.toThrow('userId is required');
  });

  it('should handle getThreadMessages with filters', async () => {
    const service = createThreadService(mockRepository as any);
    mockRepository.getThread.mockResolvedValue({ id: 't1' });
    mockRepository.getThreadMessages.mockResolvedValue([]);
    await service.getThreadMessages('t1', 'user1', { limit: 5 });
    expect(mockRepository.getThreadMessages).toHaveBeenCalledWith('t1', { limit: 5 });
  });

  it('should handle getThread error', async () => {
    const service = createThreadService(mockRepository as any);
    mockRepository.getThread.mockRejectedValue(new Error('db fail'));
    await expect(service.getThread('t1', 'user1')).rejects.toThrow('db fail');
  });

  it('should handle getThreadMessages error', async () => {
    const service = createThreadService(mockRepository as any);
    mockRepository.getThread.mockResolvedValue({ id: 't1' });
    mockRepository.getThreadMessages.mockRejectedValue(new Error('fail'));
    await expect(service.getThreadMessages('t1', 'user1')).rejects.toThrow('fail');
  });

  it('should handle lockThread error', async () => {
    const service = createThreadService(mockRepository as any);
    mockRepository.getThread.mockResolvedValue({ id: 't1', schoolId: 's1' });
    mockRepository.updateThread.mockRejectedValue(new Error('fail'));
    await expect(service.lockThread('t1', 'user1', true)).rejects.toThrow('fail');
  });

  it('should handle getThreadStats error', async () => {
    const service = createThreadService(mockRepository as any);
    mockRepository.getThreadStats.mockRejectedValue(new Error('fail'));
    await expect(service.getThreadStats('t1')).rejects.toThrow('fail');
  });

  it('should log event when locking thread', async () => {
    const service = createThreadService(mockRepository as any);
    mockRepository.getThread.mockResolvedValue({ id: 't1', schoolId: 's1' });
    mockRepository.updateThread.mockResolvedValue({ id: 't1' });
    await service.lockThread('t1', 'user1', true);
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('s1', 'thread.locked', expect.objectContaining({ locked: true }));
  });

  it('should log event when unlocking thread', async () => {
    const service = createThreadService(mockRepository as any);
    mockRepository.getThread.mockResolvedValue({ id: 't1', schoolId: 's1' });
    mockRepository.updateThread.mockResolvedValue({ id: 't1' });
    await service.lockThread('t1', 'user1', false);
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('s1', 'thread.locked', expect.objectContaining({ locked: false }));
  });
});
