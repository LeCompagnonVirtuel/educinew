import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMessageService } from '../../src/features/communication/services/message.service';

const mockRepository = {
  getMessages: vi.fn(),
  getMessage: vi.fn(),
  sendMessage: vi.fn(),
  updateMessage: vi.fn(),
  deleteMessage: vi.fn(),
  addReaction: vi.fn(),
  removeReaction: vi.fn(),
  markAsRead: vi.fn(),
  bulkMarkAsRead: vi.fn(),
  bulkDeleteMessages: vi.fn(),
  getUnreadCounts: vi.fn(),
  getRecentConversations: vi.fn(),
  getMessageStats: vi.fn(),
  searchMessages: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('MessageService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create MessageService with all methods', () => {
    const service = createMessageService(mockRepository as any);
    expect(typeof service.getMessages).toBe('function');
    expect(typeof service.getMessage).toBe('function');
    expect(typeof service.sendMessage).toBe('function');
    expect(typeof service.editMessage).toBe('function');
    expect(typeof service.deleteMessage).toBe('function');
    expect(typeof service.pinMessage).toBe('function');
    expect(typeof service.reactToMessage).toBe('function');
    expect(typeof service.removeReaction).toBe('function');
    expect(typeof service.replyToMessage).toBe('function');
    expect(typeof service.forwardMessage).toBe('function');
    expect(typeof service.searchMessages).toBe('function');
    expect(typeof service.markAsRead).toBe('function');
    expect(typeof service.markAsDelivered).toBe('function');
    expect(typeof service.getUnreadCount).toBe('function');
    expect(typeof service.bulkMarkAsRead).toBe('function');
    expect(typeof service.bulkDeleteMessages).toBe('function');
    expect(typeof service.getRecentConversations).toBe('function');
    expect(typeof service.getMessageStats).toBe('function');
  });

  it('should fetch messages', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessages.mockResolvedValue([{ id: 'm1' }]);
    const result = await service.getMessages('c1', 'user1');
    expect(result).toEqual([{ id: 'm1' }]);
  });

  it('should throw if conversationId missing for getMessages', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.getMessages('', 'user1')).rejects.toThrow('conversationId is required');
  });

  it('should throw if userId missing for getMessages', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.getMessages('c1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch a single message', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', content: 'hello' });
    const result = await service.getMessage('m1', 'user1');
    expect(result).toEqual({ id: 'm1', content: 'hello' });
  });

  it('should throw if message not found', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue(null);
    await expect(service.getMessage('m1', 'user1')).rejects.toThrow();
  });

  it('should throw if messageId missing for getMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.getMessage('', 'user1')).rejects.toThrow('messageId is required');
  });

  it('should send a message', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.sendMessage.mockResolvedValue({ id: 'm1', content: 'hi' });
    const result = await service.sendMessage('school1', 'c1', 'user1', { content: 'hi' });
    expect(result).toEqual({ id: 'm1', content: 'hi' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalled();
  });

  it('should throw if schoolId missing for sendMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.sendMessage('', 'c1', 'user1', { content: 'hi' })).rejects.toThrow('schoolId is required');
  });

  it('should throw if conversationId missing for sendMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.sendMessage('school1', '', 'user1', { content: 'hi' })).rejects.toThrow('conversationId is required');
  });

  it('should throw if userId missing for sendMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.sendMessage('school1', 'c1', '', { content: 'hi' })).rejects.toThrow('userId is required');
  });

  it('should throw if content is missing for sendMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.sendMessage('school1', 'c1', 'user1', {})).rejects.toThrow('message content is required');
  });

  it('should throw if content exceeds 10000 characters', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.sendMessage('school1', 'c1', 'user1', { content: 'x'.repeat(10001) })).rejects.toThrow();
  });

  it('should edit a message', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', senderId: 'user1' });
    mockRepository.updateMessage.mockResolvedValue({ id: 'm1', content: 'edited' });
    const result = await service.editMessage('m1', 'user1', 'edited');
    expect(result.content).toBe('edited');
  });

  it('should throw if messageId missing for editMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.editMessage('', 'user1', 'content')).rejects.toThrow('messageId is required');
  });

  it('should throw if userId missing for editMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.editMessage('m1', '', 'content')).rejects.toThrow('userId is required');
  });

  it('should throw if content missing for editMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.editMessage('m1', 'user1', '')).rejects.toThrow('content is required');
  });

  it('should throw if content exceeds 10000 for editMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.editMessage('m1', 'user1', 'x'.repeat(10001))).rejects.toThrow();
  });

  it('should throw if message not found for editMessage', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue(null);
    await expect(service.editMessage('m1', 'user1', 'content')).rejects.toThrow();
  });

  it('should throw if sender is not the owner for editMessage', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', senderId: 'user2' });
    await expect(service.editMessage('m1', 'user1', 'content')).rejects.toThrow();
  });

  it('should delete a message', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', senderId: 'user1', schoolId: 'school1' });
    await service.deleteMessage('m1', 'user1');
    expect(mockRepository.deleteMessage).toHaveBeenCalledWith('m1');
  });

  it('should throw if sender is not the owner for deleteMessage', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', senderId: 'user2' });
    await expect(service.deleteMessage('m1', 'user1')).rejects.toThrow();
  });

  it('should throw if message not found for deleteMessage', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue(null);
    await expect(service.deleteMessage('m1', 'user1')).rejects.toThrow();
  });

  it('should pin a message', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', schoolId: 'school1' });
    mockRepository.updateMessage.mockResolvedValue({ id: 'm1', pinned: true });
    const result = await service.pinMessage('m1', 'user1', true);
    expect(result.pinned).toBe(true);
  });

  it('should throw if messageId missing for pinMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.pinMessage('', 'user1', true)).rejects.toThrow('messageId is required');
  });

  it('should throw if message not found for pinMessage', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue(null);
    await expect(service.pinMessage('m1', 'user1', true)).rejects.toThrow();
  });

  it('should react to a message', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', schoolId: 'school1' });
    mockRepository.addReaction.mockResolvedValue({ id: 'r1', type: 'like' });
    const result = await service.reactToMessage('m1', 'user1', 'like');
    expect(result).toEqual({ id: 'r1', type: 'like' });
  });

  it('should throw if reactionType missing for reactToMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.reactToMessage('m1', 'user1', '')).rejects.toThrow('reactionType is required');
  });

  it('should throw if message not found for reactToMessage', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue(null);
    await expect(service.reactToMessage('m1', 'user1', 'like')).rejects.toThrow();
  });

  it('should remove a reaction', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', schoolId: 'school1' });
    await service.removeReaction('m1', 'user1', 'like');
    expect(mockRepository.removeReaction).toHaveBeenCalledWith('m1', 'user1', 'like');
  });

  it('should throw if message not found for removeReaction', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue(null);
    await expect(service.removeReaction('m1', 'user1', 'like')).rejects.toThrow();
  });

  it('should reply to a message', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', conversationId: 'c1', schoolId: 'school1' });
    mockRepository.sendMessage.mockResolvedValue({ id: 'm2', replyToId: 'm1' });
    const result = await service.replyToMessage('m1', 'user1', 'reply content');
    expect(result.replyToId).toBe('m1');
  });

  it('should throw if content missing for replyToMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.replyToMessage('m1', 'user1', '')).rejects.toThrow('reply content is required');
  });

  it('should throw if content exceeds 10000 for replyToMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.replyToMessage('m1', 'user1', 'x'.repeat(10001))).rejects.toThrow();
  });

  it('should throw if message not found for replyToMessage', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue(null);
    await expect(service.replyToMessage('m1', 'user1', 'content')).rejects.toThrow();
  });

  it('should forward a message', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', content: 'hello', conversationId: 'c1', schoolId: 'school1' });
    mockRepository.sendMessage.mockResolvedValue({ id: 'm2', forwardFromId: 'm1' });
    const result = await service.forwardMessage('m1', 'user1', 'c2');
    expect(result.forwardFromId).toBe('m1');
  });

  it('should throw if targetConversationId missing for forwardMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.forwardMessage('m1', 'user1', '')).rejects.toThrow('targetConversationId is required');
  });

  it('should throw if message not found for forwardMessage', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue(null);
    await expect(service.forwardMessage('m1', 'user1', 'c2')).rejects.toThrow();
  });

  it('should search messages', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.searchMessages.mockResolvedValue([{ id: 'm1' }]);
    const result = await service.searchMessages('school1', 'user1', 'test');
    expect(result).toEqual([{ id: 'm1' }]);
  });

  it('should throw if search query is empty', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.searchMessages('school1', 'user1', '')).rejects.toThrow('search query is required');
  });

  it('should mark messages as read', async () => {
    const service = createMessageService(mockRepository as any);
    await service.markAsRead('c1', 'user1', ['m1', 'm2']);
    expect(mockRepository.markAsRead).toHaveBeenCalledWith('c1', 'user1', ['m1', 'm2']);
  });

  it('should throw if messageIds is empty for markAsRead', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.markAsRead('c1', 'user1', [])).rejects.toThrow('messageIds are required');
  });

  it('should mark message as delivered', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1' });
    await service.markAsDelivered('m1', 'user1');
    expect(mockRepository.updateMessage).toHaveBeenCalled();
  });

  it('should throw if message not found for markAsDelivered', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue(null);
    await expect(service.markAsDelivered('m1', 'user1')).rejects.toThrow();
  });

  it('should get unread count', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getUnreadCounts.mockResolvedValue(5);
    const result = await service.getUnreadCount('school1', 'user1');
    expect(result).toBe(5);
  });

  it('should bulk mark messages as read', async () => {
    const service = createMessageService(mockRepository as any);
    await service.bulkMarkAsRead('c1', 'user1', ['m1']);
    expect(mockRepository.bulkMarkAsRead).toHaveBeenCalledWith('c1', 'user1', ['m1']);
  });

  it('should throw if messageIds empty for bulkMarkAsRead', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.bulkMarkAsRead('c1', 'user1', [])).rejects.toThrow('messageIds are required');
  });

  it('should bulk delete messages', async () => {
    const service = createMessageService(mockRepository as any);
    await service.bulkDeleteMessages(['m1', 'm2']);
    expect(mockRepository.bulkDeleteMessages).toHaveBeenCalledWith(['m1', 'm2']);
  });

  it('should throw if messageIds empty for bulkDeleteMessages', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.bulkDeleteMessages([])).rejects.toThrow('messageIds are required');
  });

  it('should get recent conversations', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getRecentConversations.mockResolvedValue([]);
    const result = await service.getRecentConversations('school1', 'user1');
    expect(result).toEqual([]);
  });

  it('should get message stats', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessageStats.mockResolvedValue({ total: 100 });
    const result = await service.getMessageStats('school1');
    expect(result).toEqual({ total: 100 });
  });

  it('should throw if schoolId missing for getMessageStats', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.getMessageStats('')).rejects.toThrow('schoolId is required');
  });

  it('should throw if messageId missing for editMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.editMessage('', 'user1', 'content')).rejects.toThrow('messageId is required');
  });

  it('should throw if userId missing for editMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.editMessage('m1', '', 'content')).rejects.toThrow('userId is required');
  });

  it('should throw if messageId missing for deleteMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.deleteMessage('', 'user1')).rejects.toThrow('messageId is required');
  });

  it('should throw if userId missing for deleteMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.deleteMessage('m1', '')).rejects.toThrow('userId is required');
  });

  it('should throw if messageId missing for pinMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.pinMessage('', 'user1', true)).rejects.toThrow('messageId is required');
  });

  it('should throw if userId missing for pinMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.pinMessage('m1', '', true)).rejects.toThrow('userId is required');
  });

  it('should throw if messageId missing for reactToMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.reactToMessage('', 'user1', 'like')).rejects.toThrow('messageId is required');
  });

  it('should throw if userId missing for reactToMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.reactToMessage('m1', '', 'like')).rejects.toThrow('userId is required');
  });

  it('should throw if messageId missing for removeReaction', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.removeReaction('', 'user1', 'like')).rejects.toThrow('messageId is required');
  });

  it('should throw if userId missing for removeReaction', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.removeReaction('m1', '', 'like')).rejects.toThrow('userId is required');
  });

  it('should throw if reactionType missing for removeReaction', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.removeReaction('m1', 'user1', '')).rejects.toThrow('reactionType is required');
  });

  it('should throw if messageId missing for replyToMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.replyToMessage('', 'user1', 'content')).rejects.toThrow('messageId is required');
  });

  it('should throw if userId missing for replyToMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.replyToMessage('m1', '', 'content')).rejects.toThrow('userId is required');
  });

  it('should throw if messageId missing for forwardMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.forwardMessage('', 'user1', 'c2')).rejects.toThrow('messageId is required');
  });

  it('should throw if userId missing for forwardMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.forwardMessage('m1', '', 'c2')).rejects.toThrow('userId is required');
  });

  it('should throw if schoolId missing for searchMessages', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.searchMessages('', 'user1', 'q')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for searchMessages', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.searchMessages('school1', '', 'q')).rejects.toThrow('userId is required');
  });

  it('should throw if conversationId missing for markAsRead', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.markAsRead('', 'user1', ['m1'])).rejects.toThrow('conversationId is required');
  });

  it('should throw if userId missing for markAsRead', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.markAsRead('c1', '', ['m1'])).rejects.toThrow('userId is required');
  });

  it('should throw if messageId missing for markAsDelivered', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.markAsDelivered('', 'user1')).rejects.toThrow('messageId is required');
  });

  it('should throw if userId missing for markAsDelivered', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.markAsDelivered('m1', '')).rejects.toThrow('userId is required');
  });

  it('should throw if schoolId missing for getUnreadCount', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.getUnreadCount('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getUnreadCount', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.getUnreadCount('school1', '')).rejects.toThrow('userId is required');
  });

  it('should throw if conversationId missing for bulkMarkAsRead', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.bulkMarkAsRead('', 'user1', ['m1'])).rejects.toThrow('conversationId is required');
  });

  it('should throw if userId missing for bulkMarkAsRead', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.bulkMarkAsRead('c1', '', ['m1'])).rejects.toThrow('userId is required');
  });

  it('should throw if schoolId missing for getRecentConversations', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.getRecentConversations('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getRecentConversations', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.getRecentConversations('school1', '')).rejects.toThrow('userId is required');
  });

  it('should handle getMessages with filters', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessages.mockResolvedValue([]);
    await service.getMessages('c1', 'user1', { limit: 10 });
    expect(mockRepository.getMessages).toHaveBeenCalledWith('c1', { limit: 10 });
  });

  it('should handle searchMessages with filters', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.searchMessages.mockResolvedValue([]);
    await service.searchMessages('school1', 'user1', 'q', { limit: 5 });
    expect(mockRepository.searchMessages).toHaveBeenCalledWith('school1', 'q', { limit: 5 });
  });

  it('should handle getMessageStats with date range', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessageStats.mockResolvedValue({ total: 50 });
    await service.getMessageStats('school1', '2024-01-01', '2024-12-31');
    expect(mockRepository.getMessageStats).toHaveBeenCalledWith('school1', '2024-01-01', '2024-12-31');
  });

  it('should handle getRecentConversations with limit', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getRecentConversations.mockResolvedValue([]);
    await service.getRecentConversations('school1', 'user1', 5);
    expect(mockRepository.getRecentConversations).toHaveBeenCalledWith('school1', 'user1', 5);
  });

  it('should log event on sendMessage', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.sendMessage.mockResolvedValue({ id: 'm1' });
    await service.sendMessage('school1', 'c1', 'user1', { content: 'hi' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'message.sent', expect.objectContaining({ messageId: 'm1', conversationId: 'c1' }));
  });

  it('should log event on deleteMessage', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', senderId: 'user1', schoolId: 'school1' });
    await service.deleteMessage('m1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'message.deleted', expect.any(Object));
  });

  it('should log event on pinMessage', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', schoolId: 'school1' });
    mockRepository.updateMessage.mockResolvedValue({ id: 'm1' });
    await service.pinMessage('m1', 'user1', true);
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'message.pinned', expect.any(Object));
  });

  it('should log event on reactToMessage', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', schoolId: 'school1' });
    mockRepository.addReaction.mockResolvedValue({ id: 'r1' });
    await service.reactToMessage('m1', 'user1', 'like');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'message.reacted', expect.any(Object));
  });

  it('should log event on replyToMessage', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', conversationId: 'c1', schoolId: 'school1' });
    mockRepository.sendMessage.mockResolvedValue({ id: 'm2' });
    await service.replyToMessage('m1', 'user1', 'reply');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'message.replied', expect.any(Object));
  });

  it('should log event on forwardMessage', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', content: 'hi', conversationId: 'c1', schoolId: 'school1' });
    mockRepository.sendMessage.mockResolvedValue({ id: 'm2' });
    await service.forwardMessage('m1', 'user1', 'c2');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'message.forwarded', expect.any(Object));
  });

  it('should handle send message data fields', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.sendMessage.mockResolvedValue({ id: 'm1' });
    await service.sendMessage('school1', 'c1', 'user1', { content: 'hi', attachments: [{ url: 'file.pdf' }] });
    expect(mockRepository.sendMessage).toHaveBeenCalledWith(expect.objectContaining({ content: 'hi', attachments: [{ url: 'file.pdf' }] }));
  });

  it('should handle edit message updating edited field', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', senderId: 'user1' });
    mockRepository.updateMessage.mockResolvedValue({ id: 'm1' });
    await service.editMessage('m1', 'user1', 'new content');
    expect(mockRepository.updateMessage).toHaveBeenCalledWith('m1', expect.objectContaining({ content: 'new content', edited: true }));
  });

  it('should handle pin unpinned message', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', schoolId: 'school1' });
    mockRepository.updateMessage.mockResolvedValue({ pinned: false });
    const result = await service.pinMessage('m1', 'user1', false);
    expect(result.pinned).toBe(false);
  });

  it('should throw if content is only whitespace for editMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.editMessage('m1', 'user1', '   ')).rejects.toThrow('content is required');
  });

  it('should throw if content is only whitespace for replyToMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.replyToMessage('m1', 'user1', '   ')).rejects.toThrow('reply content is required');
  });

  it('should throw if data is missing for sendMessage', async () => {
    const service = createMessageService(mockRepository as any);
    await expect(service.sendMessage('school1', 'c1', 'user1', null)).rejects.toThrow('message content is required');
  });

  it('should handle markAsDelivered updating status', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1' });
    await service.markAsDelivered('m1', 'user1');
    expect(mockRepository.updateMessage).toHaveBeenCalledWith('m1', expect.objectContaining({ status: 'delivered' }));
  });

  it('should handle getUnreadCount with schoolId and userId', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getUnreadCounts.mockResolvedValue(10);
    const count = await service.getUnreadCount('school1', 'user1');
    expect(count).toBe(10);
    expect(mockRepository.getUnreadCounts).toHaveBeenCalledWith('school1', 'user1');
  });

  it('should handle bulkDeleteMessages with multiple ids', async () => {
    const service = createMessageService(mockRepository as any);
    await service.bulkDeleteMessages(['m1', 'm2', 'm3']);
    expect(mockRepository.bulkDeleteMessages).toHaveBeenCalledWith(['m1', 'm2', 'm3']);
  });

  it('should handle getRecentConversations returning conversations', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getRecentConversations.mockResolvedValue([{ id: 'c1' }]);
    const result = await service.getRecentConversations('school1', 'user1');
    expect(result).toHaveLength(1);
  });

  it('should handle getMessageStats returning stats', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessageStats.mockResolvedValue({ sent: 50, received: 100 });
    const result = await service.getMessageStats('school1');
    expect(result.sent).toBe(50);
  });

  it('should handle message edit when content is exactly 10000 chars', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', senderId: 'user1' });
    mockRepository.updateMessage.mockResolvedValue({ id: 'm1' });
    const result = await service.editMessage('m1', 'user1', 'a'.repeat(10000));
    expect(result).toBeDefined();
  });

  it('should handle message send when content is exactly 10000 chars', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.sendMessage.mockResolvedValue({ id: 'm1' });
    const result = await service.sendMessage('school1', 'c1', 'user1', { content: 'a'.repeat(10000) });
    expect(result).toBeDefined();
  });

  it('should handle reaction type "love"', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', schoolId: 'school1' });
    mockRepository.addReaction.mockResolvedValue({ id: 'r1', type: 'love' });
    const result = await service.reactToMessage('m1', 'user1', 'love');
    expect(result.type).toBe('love');
  });

  it('should handle remove reaction with different type', async () => {
    const service = createMessageService(mockRepository as any);
    mockRepository.getMessage.mockResolvedValue({ id: 'm1', schoolId: 'school1' });
    await service.removeReaction('m1', 'user1', 'love');
    expect(mockRepository.removeReaction).toHaveBeenCalledWith('m1', 'user1', 'love');
  });
});
