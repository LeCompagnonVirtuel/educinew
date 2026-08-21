import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAnnouncementService } from '../../src/features/communication/services/announcement.service';

const mockRepository = {
  getAnnouncements: vi.fn(),
  getAnnouncement: vi.fn(),
  createAnnouncement: vi.fn(),
  updateAnnouncement: vi.fn(),
  deleteAnnouncement: vi.fn(),
  acknowledgeAnnouncement: vi.fn(),
  getAnnouncementStats: vi.fn(),
  getUnacknowledgedAnnouncements: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('AnnouncementService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create AnnouncementService with all methods', () => {
    const service = createAnnouncementService(mockRepository as any);
    expect(typeof service.getAnnouncements).toBe('function');
    expect(typeof service.getAnnouncement).toBe('function');
    expect(typeof service.createAnnouncement).toBe('function');
    expect(typeof service.updateAnnouncement).toBe('function');
    expect(typeof service.deleteAnnouncement).toBe('function');
    expect(typeof service.publishAnnouncement).toBe('function');
    expect(typeof service.acknowledgeAnnouncement).toBe('function');
    expect(typeof service.getAnnouncementStats).toBe('function');
    expect(typeof service.getUnacknowledgedAnnouncements).toBe('function');
    expect(typeof service.bulkPublishAnnouncements).toBe('function');
  });

  it('should fetch announcements', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.getAnnouncements.mockResolvedValue([{ id: 'a1' }]);
    const result = await service.getAnnouncements('school1', 'user1');
    expect(result).toEqual([{ id: 'a1' }]);
  });

  it('should throw if schoolId missing for getAnnouncements', async () => {
    const service = createAnnouncementService(mockRepository as any);
    await expect(service.getAnnouncements('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should fetch a single announcement', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.getAnnouncement.mockResolvedValue({ id: 'a1', title: 'Test' });
    const result = await service.getAnnouncement('a1', 'user1');
    expect(result).toEqual({ id: 'a1', title: 'Test' });
  });

  it('should throw if announcement not found', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.getAnnouncement.mockResolvedValue(null);
    await expect(service.getAnnouncement('a1', 'user1')).rejects.toThrow();
  });

  it('should create an announcement', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.createAnnouncement.mockResolvedValue({ id: 'a1', title: 'New' });
    const result = await service.createAnnouncement('school1', 'user1', { title: 'New', content: 'Body' });
    expect(result.title).toBe('New');
  });

  it('should throw if title missing for createAnnouncement', async () => {
    const service = createAnnouncementService(mockRepository as any);
    await expect(service.createAnnouncement('school1', 'user1', { content: 'Body' })).rejects.toThrow('announcement title is required');
  });

  it('should throw if content missing for createAnnouncement', async () => {
    const service = createAnnouncementService(mockRepository as any);
    await expect(service.createAnnouncement('school1', 'user1', { title: 'T' })).rejects.toThrow('announcement content is required');
  });

  it('should throw if invalid priority for createAnnouncement', async () => {
    const service = createAnnouncementService(mockRepository as any);
    await expect(service.createAnnouncement('school1', 'user1', { title: 'T', content: 'C', priority: 'invalid' })).rejects.toThrow();
  });

  it('should update an announcement', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.getAnnouncement.mockResolvedValue({ id: 'a1', schoolId: 'school1' });
    mockRepository.updateAnnouncement.mockResolvedValue({ id: 'a1', title: 'Updated' });
    const result = await service.updateAnnouncement('a1', 'user1', { title: 'Updated' });
    expect(result.title).toBe('Updated');
  });

  it('should throw if announcement not found for update', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.getAnnouncement.mockResolvedValue(null);
    await expect(service.updateAnnouncement('a1', 'user1', { title: 'X' })).rejects.toThrow();
  });

  it('should delete an announcement', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.getAnnouncement.mockResolvedValue({ id: 'a1', schoolId: 'school1' });
    await service.deleteAnnouncement('a1', 'user1');
    expect(mockRepository.deleteAnnouncement).toHaveBeenCalledWith('a1');
  });

  it('should throw if announcement not found for delete', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.getAnnouncement.mockResolvedValue(null);
    await expect(service.deleteAnnouncement('a1', 'user1')).rejects.toThrow();
  });

  it('should publish an announcement', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.getAnnouncement.mockResolvedValue({ id: 'a1', schoolId: 'school1', status: 'draft' });
    mockRepository.updateAnnouncement.mockResolvedValue({ id: 'a1', status: 'published' });
    const result = await service.publishAnnouncement('a1', 'user1');
    expect(result.status).toBe('published');
  });

  it('should throw if already published', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.getAnnouncement.mockResolvedValue({ id: 'a1', status: 'published' });
    await expect(service.publishAnnouncement('a1', 'user1')).rejects.toThrow();
  });

  it('should acknowledge an announcement', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.getAnnouncement.mockResolvedValue({ id: 'a1', schoolId: 'school1' });
    mockRepository.acknowledgeAnnouncement.mockResolvedValue({ id: 'ack1' });
    const result = await service.acknowledgeAnnouncement('a1', 'user1');
    expect(result).toEqual({ id: 'ack1' });
  });

  it('should get announcement stats', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.getAnnouncementStats.mockResolvedValue({ total: 20 });
    const result = await service.getAnnouncementStats('school1');
    expect(result).toEqual({ total: 20 });
  });

  it('should get unacknowledged announcements', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.getUnacknowledgedAnnouncements.mockResolvedValue([{ id: 'a1' }]);
    const result = await service.getUnacknowledgedAnnouncements('school1', 'user1');
    expect(result).toEqual([{ id: 'a1' }]);
  });

  it('should bulk publish announcements', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.getAnnouncement.mockResolvedValue({ id: 'a1', status: 'draft', schoolId: 'school1' });
    mockRepository.updateAnnouncement.mockResolvedValue({ id: 'a1', status: 'published' });
    const result = await service.bulkPublishAnnouncements(['a1'], 'user1');
    expect(result).toHaveLength(1);
  });

  it('should throw if announcementIds empty for bulkPublish', async () => {
    const service = createAnnouncementService(mockRepository as any);
    await expect(service.bulkPublishAnnouncements([], 'user1')).rejects.toThrow('announcementIds are required');
  });

  it('should throw if announcementId missing for getAnnouncement', async () => {
    const service = createAnnouncementService(mockRepository as any);
    await expect(service.getAnnouncement('', 'user1')).rejects.toThrow('announcementId is required');
  });

  it('should throw if announcementId missing for updateAnnouncement', async () => {
    const service = createAnnouncementService(mockRepository as any);
    await expect(service.updateAnnouncement('', 'user1', { title: 'X' })).rejects.toThrow('announcementId is required');
  });

  it('should throw if data missing for updateAnnouncement', async () => {
    const service = createAnnouncementService(mockRepository as any);
    await expect(service.updateAnnouncement('a1', 'user1', undefined)).rejects.toThrow('update data is required');
  });

  it('should throw if announcementId missing for deleteAnnouncement', async () => {
    const service = createAnnouncementService(mockRepository as any);
    await expect(service.deleteAnnouncement('', 'user1')).rejects.toThrow('announcementId is required');
  });

  it('should throw if announcementId missing for publishAnnouncement', async () => {
    const service = createAnnouncementService(mockRepository as any);
    await expect(service.publishAnnouncement('', 'user1')).rejects.toThrow('announcementId is required');
  });

  it('should throw if announcementId missing for acknowledgeAnnouncement', async () => {
    const service = createAnnouncementService(mockRepository as any);
    await expect(service.acknowledgeAnnouncement('', 'user1')).rejects.toThrow('announcementId is required');
  });

  it('should handle getAnnouncements with filters', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.getAnnouncements.mockResolvedValue([]);
    await service.getAnnouncements('school1', 'user1', { status: 'published' });
    expect(mockRepository.getAnnouncements).toHaveBeenCalledWith('school1', 'user1', { status: 'published' });
  });

  it('should handle getAnnouncementStats with date range', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.getAnnouncementStats.mockResolvedValue({ total: 10 });
    await service.getAnnouncementStats('school1', '2024-01-01', '2024-12-31');
    expect(mockRepository.getAnnouncementStats).toHaveBeenCalledWith('school1', '2024-01-01', '2024-12-31');
  });

  it('should log event on createAnnouncement', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.createAnnouncement.mockResolvedValue({ id: 'a1' });
    await service.createAnnouncement('school1', 'user1', { title: 'T', content: 'C' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'announcement.created', expect.any(Object));
  });

  it('should log event on publishAnnouncement', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.getAnnouncement.mockResolvedValue({ id: 'a1', schoolId: 'school1', status: 'draft' });
    mockRepository.updateAnnouncement.mockResolvedValue({ id: 'a1' });
    await service.publishAnnouncement('a1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'announcement.published', expect.any(Object));
  });

  it('should log event on acknowledgeAnnouncement', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.getAnnouncement.mockResolvedValue({ id: 'a1', schoolId: 'school1' });
    mockRepository.acknowledgeAnnouncement.mockResolvedValue({ id: 'ack1' });
    await service.acknowledgeAnnouncement('a1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'announcement.acknowledged', expect.any(Object));
  });

  it('should create with valid priority levels', async () => {
    const service = createAnnouncementService(mockRepository as any);
    mockRepository.createAnnouncement.mockResolvedValue({ id: 'a1' });
    for (const priority of ['low', 'normal', 'high', 'urgent']) {
      await service.createAnnouncement('school1', 'user1', { title: 'T', content: 'C', priority });
      expect(mockRepository.createAnnouncement).toHaveBeenCalled();
    }
  });
});
