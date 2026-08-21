import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createChannelService } from '../../src/features/communication/services/channel.service';

const mockRepository = {
  getChannels: vi.fn(),
  getChannel: vi.fn(),
  createChannel: vi.fn(),
  updateChannel: vi.fn(),
  deleteChannel: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('ChannelService', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should create ChannelService with all methods', () => {
    const service = createChannelService(mockRepository as any);
    expect(typeof service.getChannels).toBe('function');
    expect(typeof service.getChannel).toBe('function');
    expect(typeof service.createChannel).toBe('function');
    expect(typeof service.updateChannel).toBe('function');
    expect(typeof service.deleteChannel).toBe('function');
  });

  it('should fetch channels', async () => {
    const service = createChannelService(mockRepository as any);
    mockRepository.getChannels.mockResolvedValue([{ id: 'ch1' }]);
    const result = await service.getChannels('school1', 'user1');
    expect(result).toEqual([{ id: 'ch1' }]);
  });

  it('should throw if schoolId missing', async () => {
    const service = createChannelService(mockRepository as any);
    await expect(service.getChannels('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should fetch a channel', async () => {
    const service = createChannelService(mockRepository as any);
    mockRepository.getChannel.mockResolvedValue({ id: 'ch1', name: 'General' });
    const result = await service.getChannel('ch1', 'user1');
    expect(result).toEqual({ id: 'ch1', name: 'General' });
  });

  it('should throw if channel not found', async () => {
    const service = createChannelService(mockRepository as any);
    mockRepository.getChannel.mockResolvedValue(null);
    await expect(service.getChannel('ch1', 'user1')).rejects.toThrow('Channel not found');
  });

  it('should create a channel', async () => {
    const service = createChannelService(mockRepository as any);
    mockRepository.createChannel.mockResolvedValue({ id: 'ch1', name: 'Announcements' });
    const result = await service.createChannel('school1', 'user1', { name: 'Announcements' });
    expect(result.name).toBe('Announcements');
  });

  it('should throw if name missing', async () => {
    const service = createChannelService(mockRepository as any);
    await expect(service.createChannel('school1', 'user1', {})).rejects.toThrow('channel name is required');
  });

  it('should update a channel', async () => {
    const service = createChannelService(mockRepository as any);
    mockRepository.getChannel.mockResolvedValue({ id: 'ch1', schoolId: 'school1' });
    mockRepository.updateChannel.mockResolvedValue({ id: 'ch1', name: 'Updated' });
    const result = await service.updateChannel('ch1', 'user1', { name: 'Updated' });
    expect(result.name).toBe('Updated');
  });

  it('should throw if channel not found for update', async () => {
    const service = createChannelService(mockRepository as any);
    mockRepository.getChannel.mockResolvedValue(null);
    await expect(service.updateChannel('ch1', 'user1', { name: 'X' })).rejects.toThrow('Channel not found');
  });

  it('should throw if data missing for update', async () => {
    const service = createChannelService(mockRepository as any);
    await expect(service.updateChannel('ch1', 'user1', undefined)).rejects.toThrow('update data is required');
  });

  it('should delete a channel', async () => {
    const service = createChannelService(mockRepository as any);
    mockRepository.getChannel.mockResolvedValue({ id: 'ch1', schoolId: 'school1' });
    await service.deleteChannel('ch1', 'user1');
    expect(mockRepository.deleteChannel).toHaveBeenCalledWith('ch1');
  });

  it('should throw if channel not found for delete', async () => {
    const service = createChannelService(mockRepository as any);
    mockRepository.getChannel.mockResolvedValue(null);
    await expect(service.deleteChannel('ch1', 'user1')).rejects.toThrow('Channel not found');
  });

  it('should handle getChannels with filters', async () => {
    const service = createChannelService(mockRepository as any);
    mockRepository.getChannels.mockResolvedValue([]);
    await service.getChannels('school1', 'user1', { type: 'announcement' });
    expect(mockRepository.getChannels).toHaveBeenCalledWith('school1', 'user1', { type: 'announcement' });
  });

  it('should log event on createChannel', async () => {
    const service = createChannelService(mockRepository as any);
    mockRepository.createChannel.mockResolvedValue({ id: 'ch1' });
    await service.createChannel('school1', 'user1', { name: 'C' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'channel.created', expect.any(Object));
  });

  it('should log event on updateChannel', async () => {
    const service = createChannelService(mockRepository as any);
    mockRepository.getChannel.mockResolvedValue({ id: 'ch1', schoolId: 'school1' });
    mockRepository.updateChannel.mockResolvedValue({ id: 'ch1' });
    await service.updateChannel('ch1', 'user1', { name: 'X' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'channel.updated', expect.any(Object));
  });

  it('should log event on deleteChannel', async () => {
    const service = createChannelService(mockRepository as any);
    mockRepository.getChannel.mockResolvedValue({ id: 'ch1', schoolId: 'school1' });
    await service.deleteChannel('ch1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'channel.deleted', expect.any(Object));
  });

  it('should throw if channelId missing for getChannel', async () => {
    const service = createChannelService(mockRepository as any);
    await expect(service.getChannel('', 'user1')).rejects.toThrow('channelId is required');
  });

  it('should throw if channelId missing for updateChannel', async () => {
    const service = createChannelService(mockRepository as any);
    await expect(service.updateChannel('', 'user1', { name: 'X' })).rejects.toThrow('channelId is required');
  });

  it('should throw if channelId missing for deleteChannel', async () => {
    const service = createChannelService(mockRepository as any);
    await expect(service.deleteChannel('', 'user1')).rejects.toThrow('channelId is required');
  });
});
