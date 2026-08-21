import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPresenceService } from '../../src/features/communication/services/presence.service';

const mockRepository = {
  updatePresence: vi.fn(),
  getPresence: vi.fn(),
  getPresenceStats: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('PresenceService', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should create PresenceService with all methods', () => {
    const service = createPresenceService(mockRepository as any);
    expect(typeof service.updatePresence).toBe('function');
    expect(typeof service.getPresence).toBe('function');
    expect(typeof service.getPresenceStats).toBe('function');
  });

  it('should update presence to online', async () => {
    const service = createPresenceService(mockRepository as any);
    mockRepository.updatePresence.mockResolvedValue({ userId: 'user1', status: 'online' });
    const result = await service.updatePresence('school1', 'user1', 'online');
    expect(result.status).toBe('online');
  });

  it('should throw if status missing', async () => {
    const service = createPresenceService(mockRepository as any);
    await expect(service.updatePresence('school1', 'user1', '')).rejects.toThrow('presence status is required');
  });

  it('should throw if invalid status', async () => {
    const service = createPresenceService(mockRepository as any);
    await expect(service.updatePresence('school1', 'user1', 'invisible')).rejects.toThrow('Invalid presence status');
  });

  it('should update presence to away', async () => {
    const service = createPresenceService(mockRepository as any);
    mockRepository.updatePresence.mockResolvedValue({ userId: 'user1', status: 'away' });
    const result = await service.updatePresence('school1', 'user1', 'away');
    expect(result.status).toBe('away');
  });

  it('should update presence to busy', async () => {
    const service = createPresenceService(mockRepository as any);
    mockRepository.updatePresence.mockResolvedValue({ userId: 'user1', status: 'busy' });
    const result = await service.updatePresence('school1', 'user1', 'busy');
    expect(result.status).toBe('busy');
  });

  it('should update presence to offline', async () => {
    const service = createPresenceService(mockRepository as any);
    mockRepository.updatePresence.mockResolvedValue({ userId: 'user1', status: 'offline' });
    const result = await service.updatePresence('school1', 'user1', 'offline');
    expect(result.status).toBe('offline');
  });

  it('should get presence', async () => {
    const service = createPresenceService(mockRepository as any);
    mockRepository.getPresence.mockResolvedValue({ userId: 'user1', status: 'online' });
    const result = await service.getPresence('school1', 'user1');
    expect(result.status).toBe('online');
  });

  it('should get presence stats', async () => {
    const service = createPresenceService(mockRepository as any);
    mockRepository.getPresenceStats.mockResolvedValue({ online: 10, offline: 5 });
    const result = await service.getPresenceStats('school1');
    expect(result.online).toBe(10);
  });

  it('should throw if schoolId missing for getPresence', async () => {
    const service = createPresenceService(mockRepository as any);
    await expect(service.getPresence('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getPresence', async () => {
    const service = createPresenceService(mockRepository as any);
    await expect(service.getPresence('school1', '')).rejects.toThrow('userId is required');
  });

  it('should throw if schoolId missing for getPresenceStats', async () => {
    const service = createPresenceService(mockRepository as any);
    await expect(service.getPresenceStats('')).rejects.toThrow('schoolId is required');
  });

  it('should throw if schoolId missing for updatePresence', async () => {
    const service = createPresenceService(mockRepository as any);
    await expect(service.updatePresence('', 'user1', 'online')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for updatePresence', async () => {
    const service = createPresenceService(mockRepository as any);
    await expect(service.updatePresence('school1', '', 'online')).rejects.toThrow('userId is required');
  });

  it('should log event on updatePresence', async () => {
    const service = createPresenceService(mockRepository as any);
    mockRepository.updatePresence.mockResolvedValue({ userId: 'user1' });
    await service.updatePresence('school1', 'user1', 'online');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'presence.updated', expect.objectContaining({ status: 'online' }));
  });

  it('should update presence with extra data', async () => {
    const service = createPresenceService(mockRepository as any);
    mockRepository.updatePresence.mockResolvedValue({ userId: 'user1', status: 'online', customField: 'value' });
    const result = await service.updatePresence('school1', 'user1', 'online', { customField: 'value' });
    expect(result.customField).toBe('value');
  });

  it('should handle getPresenceStats with multiple statuses', async () => {
    const service = createPresenceService(mockRepository as any);
    mockRepository.getPresenceStats.mockResolvedValue({ online: 5, away: 3, busy: 2, offline: 10 });
    const result = await service.getPresenceStats('school1');
    expect(result.online).toBe(5);
    expect(result.offline).toBe(10);
  });

  it('should handle updatePresence error', async () => {
    const service = createPresenceService(mockRepository as any);
    mockRepository.updatePresence.mockRejectedValue(new Error('fail'));
    await expect(service.updatePresence('school1', 'user1', 'online')).rejects.toThrow('fail');
  });

  it('should handle getPresence error', async () => {
    const service = createPresenceService(mockRepository as any);
    mockRepository.getPresence.mockRejectedValue(new Error('fail'));
    await expect(service.getPresence('school1', 'user1')).rejects.toThrow('fail');
  });

  it('should handle getPresenceStats error', async () => {
    const service = createPresenceService(mockRepository as any);
    mockRepository.getPresenceStats.mockRejectedValue(new Error('fail'));
    await expect(service.getPresenceStats('school1')).rejects.toThrow('fail');
  });
});
