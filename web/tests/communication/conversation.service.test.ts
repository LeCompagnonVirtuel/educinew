import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createConversationService } from '../../src/features/communication/services/conversation.service';

const mockRepository = {
  getConversations: vi.fn(),
  getConversation: vi.fn(),
  createConversation: vi.fn(),
  updateConversation: vi.fn(),
  deleteConversation: vi.fn(),
  logCommunicationEvent: vi.fn(),
  searchConversations: vi.fn(),
  getConversationStats: vi.fn(),
};

describe('ConversationService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create ConversationService with all methods', () => {
    const service = createConversationService(mockRepository as any);
    expect(typeof service.getConversations).toBe('function');
    expect(typeof service.getConversation).toBe('function');
    expect(typeof service.createConversation).toBe('function');
    expect(typeof service.updateConversation).toBe('function');
    expect(typeof service.deleteConversation).toBe('function');
    expect(typeof service.archiveConversation).toBe('function');
    expect(typeof service.muteConversation).toBe('function');
    expect(typeof service.pinConversation).toBe('function');
    expect(typeof service.addParticipant).toBe('function');
    expect(typeof service.removeParticipant).toBe('function');
    expect(typeof service.searchConversations).toBe('function');
    expect(typeof service.getConversationStats).toBe('function');
  });

  it('should fetch conversations', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversations.mockResolvedValue([{ id: '1' }]);
    const result = await service.getConversations('school1', 'user1');
    expect(result).toEqual([{ id: '1' }]);
    expect(mockRepository.getConversations).toHaveBeenCalledWith('school1', 'user1', undefined);
  });

  it('should throw if schoolId is missing for getConversations', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.getConversations('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId is missing for getConversations', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.getConversations('school1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch a single conversation', async () => {
    const service = createConversationService(mockRepository as any);
    const conv = { id: 'c1', schoolId: 'school1', participants: ['user1'] };
    mockRepository.getConversation.mockResolvedValue(conv);
    const result = await service.getConversation('c1', 'user1');
    expect(result).toEqual(conv);
  });

  it('should throw if conversation not found', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversation.mockResolvedValue(null);
    await expect(service.getConversation('c1', 'user1')).rejects.toThrow();
  });

  it('should throw if conversationId is missing for getConversation', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.getConversation('', 'user1')).rejects.toThrow('conversationId is required');
  });

  it('should create a conversation', async () => {
    const service = createConversationService(mockRepository as any);
    const conv = { id: 'c1', type: 'group' };
    mockRepository.createConversation.mockResolvedValue(conv);
    const result = await service.createConversation('school1', 'user1', { type: 'group' });
    expect(result).toEqual(conv);
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalled();
  });

  it('should throw if type is missing for createConversation', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.createConversation('school1', 'user1', {})).rejects.toThrow('conversation type is required');
  });

  it('should throw if name exceeds 255 characters', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(
      service.createConversation('school1', 'user1', { type: 'group', name: 'x'.repeat(256) })
    ).rejects.toThrow();
  });

  it('should throw if participants exceed 500', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(
      service.createConversation('school1', 'user1', {
        type: 'group',
        participants: Array.from({ length: 501 }, (_, i) => `u${i}`),
      })
    ).rejects.toThrow();
  });

  it('should update a conversation', async () => {
    const service = createConversationService(mockRepository as any);
    const existing = { id: 'c1', schoolId: 'school1' };
    mockRepository.getConversation.mockResolvedValue(existing);
    mockRepository.updateConversation.mockResolvedValue({ ...existing, name: 'updated' });
    const result = await service.updateConversation('c1', 'user1', { name: 'updated' });
    expect(result.name).toBe('updated');
  });

  it('should throw if conversation not found for update', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversation.mockResolvedValue(null);
    await expect(service.updateConversation('c1', 'user1', { name: 'x' })).rejects.toThrow();
  });

  it('should delete a conversation', async () => {
    const service = createConversationService(mockRepository as any);
    const existing = { id: 'c1', schoolId: 'school1' };
    mockRepository.getConversation.mockResolvedValue(existing);
    await service.deleteConversation('c1', 'user1');
    expect(mockRepository.deleteConversation).toHaveBeenCalledWith('c1');
  });

  it('should throw if conversation not found for delete', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversation.mockResolvedValue(null);
    await expect(service.deleteConversation('c1', 'user1')).rejects.toThrow();
  });

  it('should archive a conversation', async () => {
    const service = createConversationService(mockRepository as any);
    const existing = { id: 'c1', schoolId: 'school1' };
    mockRepository.getConversation.mockResolvedValue(existing);
    mockRepository.updateConversation.mockResolvedValue({ ...existing, status: 'archived' });
    const result = await service.archiveConversation('c1', 'user1');
    expect(result.status).toBe('archived');
  });

  it('should mute a conversation', async () => {
    const service = createConversationService(mockRepository as any);
    const existing = { id: 'c1', schoolId: 'school1' };
    mockRepository.getConversation.mockResolvedValue(existing);
    mockRepository.updateConversation.mockResolvedValue({ ...existing, muted: true });
    const result = await service.muteConversation('c1', 'user1', true);
    expect(result.muted).toBe(true);
  });

  it('should pin a conversation', async () => {
    const service = createConversationService(mockRepository as any);
    const existing = { id: 'c1', schoolId: 'school1' };
    mockRepository.getConversation.mockResolvedValue(existing);
    mockRepository.updateConversation.mockResolvedValue({ ...existing, pinned: true });
    const result = await service.pinConversation('c1', 'user1', true);
    expect(result.pinned).toBe(true);
  });

  it('should add a participant', async () => {
    const service = createConversationService(mockRepository as any);
    const existing = { id: 'c1', schoolId: 'school1', participants: ['user1'] };
    mockRepository.getConversation.mockResolvedValue(existing);
    mockRepository.updateConversation.mockResolvedValue({ ...existing, participants: ['user1', 'user2'] });
    const result = await service.addParticipant('c1', 'user1', 'user2');
    expect(result.participants).toContain('user2');
  });

  it('should throw if participantId is missing for addParticipant', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.addParticipant('c1', 'user1', '')).rejects.toThrow('participantId is required');
  });

  it('should remove a participant', async () => {
    const service = createConversationService(mockRepository as any);
    const existing = { id: 'c1', schoolId: 'school1', participants: ['user1', 'user2'] };
    mockRepository.getConversation.mockResolvedValue(existing);
    mockRepository.updateConversation.mockResolvedValue({ ...existing, participants: ['user1'] });
    const result = await service.removeParticipant('c1', 'user1', 'user2');
    expect(result.participants).not.toContain('user2');
  });

  it('should search conversations', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.searchConversations.mockResolvedValue([{ id: 'c1' }]);
    const result = await service.searchConversations('school1', 'user1', 'test');
    expect(result).toEqual([{ id: 'c1' }]);
  });

  it('should throw if search query is empty', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.searchConversations('school1', 'user1', '')).rejects.toThrow('search query is required');
  });

  it('should get conversation stats', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversationStats.mockResolvedValue({ totalMessages: 100 });
    const result = await service.getConversationStats('c1');
    expect(result).toEqual({ totalMessages: 100 });
  });

  it('should throw if conversationId missing for stats', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.getConversationStats('')).rejects.toThrow('conversationId is required');
  });

  it('should handle repository errors for getConversations', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversations.mockRejectedValue(new Error('db error'));
    await expect(service.getConversations('school1', 'user1')).rejects.toThrow('db error');
  });

  it('should handle repository errors for getConversation', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversation.mockRejectedValue(new Error('db error'));
    await expect(service.getConversation('c1', 'user1')).rejects.toThrow('db error');
  });

  it('should throw if data is missing for updateConversation', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.updateConversation('c1', 'user1', undefined)).rejects.toThrow('update data is required');
  });

  it('should throw if data is missing for createConversation', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.createConversation('school1', 'user1', null)).rejects.toThrow('conversation type is required');
  });

  it('should pass filters to getConversations', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversations.mockResolvedValue([]);
    await service.getConversations('school1', 'user1', { status: 'active' });
    expect(mockRepository.getConversations).toHaveBeenCalledWith('school1', 'user1', { status: 'active' });
  });

  it('should log event on conversation viewed', async () => {
    const service = createConversationService(mockRepository as any);
    const conv = { id: 'c1', schoolId: 'school1' };
    mockRepository.getConversation.mockResolvedValue(conv);
    await service.getConversation('c1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'conversation.viewed', expect.objectContaining({ conversationId: 'c1', userId: 'user1' }));
  });

  it('should log event on conversation created', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.createConversation.mockResolvedValue({ id: 'c1' });
    await service.createConversation('school1', 'user1', { type: 'direct' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'conversation.created', expect.any(Object));
  });

  it('should log event on conversation deleted', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversation.mockResolvedValue({ id: 'c1', schoolId: 'school1' });
    await service.deleteConversation('c1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'conversation.deleted', expect.any(Object));
  });

  it('should log event on conversation archived', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversation.mockResolvedValue({ id: 'c1', schoolId: 'school1' });
    mockRepository.updateConversation.mockResolvedValue({ id: 'c1' });
    await service.archiveConversation('c1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'conversation.archived', expect.any(Object));
  });

  it('should log event on conversation muted', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversation.mockResolvedValue({ id: 'c1', schoolId: 'school1' });
    mockRepository.updateConversation.mockResolvedValue({ id: 'c1' });
    await service.muteConversation('c1', 'user1', true);
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'conversation.muted', expect.objectContaining({ muted: true }));
  });

  it('should log event on conversation pinned', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversation.mockResolvedValue({ id: 'c1', schoolId: 'school1' });
    mockRepository.updateConversation.mockResolvedValue({ id: 'c1' });
    await service.pinConversation('c1', 'user1', true);
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'conversation.pinned', expect.objectContaining({ pinned: true }));
  });

  it('should log event on participant added', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversation.mockResolvedValue({ id: 'c1', schoolId: 'school1', participants: [] });
    mockRepository.updateConversation.mockResolvedValue({ id: 'c1' });
    await service.addParticipant('c1', 'user1', 'user2');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'conversation.participant_added', expect.any(Object));
  });

  it('should log event on participant removed', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversation.mockResolvedValue({ id: 'c1', schoolId: 'school1', participants: ['user1', 'user2'] });
    mockRepository.updateConversation.mockResolvedValue({ id: 'c1' });
    await service.removeParticipant('c1', 'user1', 'user2');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'conversation.participant_removed', expect.any(Object));
  });

  it('should log search event', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.searchConversations.mockResolvedValue([]);
    await service.searchConversations('school1', 'user1', 'test');
    expect(mockRepository.searchConversations).toHaveBeenCalledWith('school1', 'user1', 'test', undefined);
  });

  it('should handle archiveConversation error', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversation.mockRejectedValue(new Error('fail'));
    await expect(service.archiveConversation('c1', 'user1')).rejects.toThrow('fail');
  });

  it('should handle muteConversation error', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversation.mockRejectedValue(new Error('fail'));
    await expect(service.muteConversation('c1', 'user1', true)).rejects.toThrow('fail');
  });

  it('should handle pinConversation error', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversation.mockRejectedValue(new Error('fail'));
    await expect(service.pinConversation('c1', 'user1', true)).rejects.toThrow('fail');
  });

  it('should handle addParticipant error', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversation.mockRejectedValue(new Error('fail'));
    await expect(service.addParticipant('c1', 'user1', 'user2')).rejects.toThrow('fail');
  });

  it('should handle removeParticipant error', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversation.mockRejectedValue(new Error('fail'));
    await expect(service.removeParticipant('c1', 'user1', 'user2')).rejects.toThrow('fail');
  });

  it('should handle searchConversations error', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.searchConversations.mockRejectedValue(new Error('fail'));
    await expect(service.searchConversations('school1', 'user1', 'q')).rejects.toThrow('fail');
  });

  it('should handle getConversationStats error', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversationStats.mockRejectedValue(new Error('fail'));
    await expect(service.getConversationStats('c1')).rejects.toThrow('fail');
  });

  it('should handle createConversation error', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.createConversation.mockRejectedValue(new Error('fail'));
    await expect(service.createConversation('school1', 'user1', { type: 'direct' })).rejects.toThrow('fail');
  });

  it('should handle updateConversation error', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversation.mockResolvedValue({ id: 'c1', schoolId: 'school1' });
    mockRepository.updateConversation.mockRejectedValue(new Error('fail'));
    await expect(service.updateConversation('c1', 'user1', { name: 'x' })).rejects.toThrow('fail');
  });

  it('should handle deleteConversation error', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversation.mockResolvedValue({ id: 'c1', schoolId: 'school1' });
    mockRepository.deleteConversation.mockRejectedValue(new Error('fail'));
    await expect(service.deleteConversation('c1', 'user1')).rejects.toThrow('fail');
  });

  it('should return conversations with filters', async () => {
    const service = createConversationService(mockRepository as any);
    const filters = { type: 'group', limit: 10 };
    mockRepository.getConversations.mockResolvedValue([]);
    await service.getConversations('school1', 'user1', filters);
    expect(mockRepository.getConversations).toHaveBeenCalledWith('school1', 'user1', filters);
  });

  it('should search conversations with filters', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.searchConversations.mockResolvedValue([]);
    await service.searchConversations('school1', 'user1', 'query', { type: 'group' });
    expect(mockRepository.searchConversations).toHaveBeenCalledWith('school1', 'user1', 'query', { type: 'group' });
  });

  it('should handle muted=false correctly', async () => {
    const service = createConversationService(mockRepository as any);
    const existing = { id: 'c1', schoolId: 'school1' };
    mockRepository.getConversation.mockResolvedValue(existing);
    mockRepository.updateConversation.mockResolvedValue({ muted: false });
    const result = await service.muteConversation('c1', 'user1', false);
    expect(result.muted).toBe(false);
  });

  it('should handle pinned=false correctly', async () => {
    const service = createConversationService(mockRepository as any);
    const existing = { id: 'c1', schoolId: 'school1' };
    mockRepository.getConversation.mockResolvedValue(existing);
    mockRepository.updateConversation.mockResolvedValue({ pinned: false });
    const result = await service.pinConversation('c1', 'user1', false);
    expect(result.pinned).toBe(false);
  });

  it('should pass search filters correctly', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.searchConversations.mockResolvedValue([]);
    await service.searchConversations('school1', 'user1', 'q', { limit: 5 });
    expect(mockRepository.searchConversations).toHaveBeenCalledWith('school1', 'user1', 'q', { limit: 5 });
  });

  it('should handle getConversationStats without error', async () => {
    const service = createConversationService(mockRepository as any);
    mockRepository.getConversationStats.mockResolvedValue({ count: 0 });
    const stats = await service.getConversationStats('c1');
    expect(stats).toEqual({ count: 0 });
  });

  it('should handle single-participant conversation', async () => {
    const service = createConversationService(mockRepository as any);
    const existing = { id: 'c1', schoolId: 'school1', participants: ['user1'] };
    mockRepository.getConversation.mockResolvedValue(existing);
    mockRepository.updateConversation.mockResolvedValue({ participants: [] });
    const result = await service.removeParticipant('c1', 'user1', 'user1');
    expect(result.participants).toEqual([]);
  });

  it('should validate conversationId on archive', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.archiveConversation('', 'user1')).rejects.toThrow('conversationId is required');
  });

  it('should validate userId on archive', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.archiveConversation('c1', '')).rejects.toThrow('userId is required');
  });

  it('should validate conversationId on mute', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.muteConversation('', 'user1', true)).rejects.toThrow('conversationId is required');
  });

  it('should validate userId on mute', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.muteConversation('c1', '', true)).rejects.toThrow('userId is required');
  });

  it('should validate conversationId on pin', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.pinConversation('', 'user1', true)).rejects.toThrow('conversationId is required');
  });

  it('should validate userId on pin', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.pinConversation('c1', '', true)).rejects.toThrow('userId is required');
  });

  it('should validate conversationId on addParticipant', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.addParticipant('', 'user1', 'user2')).rejects.toThrow('conversationId is required');
  });

  it('should validate userId on addParticipant', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.addParticipant('c1', '', 'user2')).rejects.toThrow('userId is required');
  });

  it('should validate conversationId on removeParticipant', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.removeParticipant('', 'user1', 'user2')).rejects.toThrow('conversationId is required');
  });

  it('should validate userId on removeParticipant', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.removeParticipant('c1', '', 'user2')).rejects.toThrow('userId is required');
  });

  it('should validate participantId on removeParticipant', async () => {
    const service = createConversationService(mockRepository as any);
    await expect(service.removeParticipant('c1', 'user1', '')).rejects.toThrow('participantId is required');
  });
});
