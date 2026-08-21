import { describe, it, expect, vi, beforeEach } from 'vitest';

function createMockSupabase() {
  const supabase = {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    neq: vi.fn().mockReturnThis(),
    ilike: vi.fn().mockReturnThis(),
    or: vi.fn().mockReturnThis(),
    gte: vi.fn().mockReturnThis(),
    lte: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    not: vi.fn().mockReturnThis(),
    is: vi.fn().mockReturnThis(),
    single: vi.fn(),
    order: vi.fn().mockReturnThis(),
    range: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    rpc: vi.fn().mockResolvedValue({ data: null, error: null }),
    _result: { data: null, error: null, count: 0 },
    then(resolve: Function) {
      const { data, error, count } = supabase._result;
      return resolve({ data, error, count });
    },
  };
  const setResponse = (data: unknown, error: unknown = null, count = 0) => {
    supabase._result = { data, error, count };
    supabase.single.mockResolvedValue({ data, error });
  };
  supabase.select.mockReturnValue(supabase);
  supabase.insert.mockReturnValue(supabase);
  supabase.update.mockReturnValue(supabase);
  supabase.delete.mockReturnValue(supabase);
  supabase.eq.mockReturnValue(supabase);
  supabase.neq.mockReturnValue(supabase);
  supabase.ilike.mockReturnValue(supabase);
  supabase.or.mockReturnValue(supabase);
  supabase.gte.mockReturnValue(supabase);
  supabase.lte.mockReturnValue(supabase);
  supabase.in.mockReturnValue(supabase);
  supabase.not.mockReturnValue(supabase);
  supabase.is.mockReturnValue(supabase);
  supabase.order.mockReturnValue(supabase);
  supabase.range.mockReturnValue(supabase);
  supabase.limit.mockReturnValue(supabase);
  supabase.from.mockReturnValue(supabase);
  return { supabase, setResponse };
}

describe('SupabaseMessageRepository', () => {
  let repo: InstanceType<typeof import('../../src/features/messages/repositories/message.repository').SupabaseMessageRepository>;

  beforeEach(async () => {
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const { supabase } = createMockSupabase();
    repo = new SupabaseMessageRepository(supabase);
  });

  it('should instantiate the repository', () => {
    expect(repo).toBeDefined();
  });

  it('should return null when findConversation finds no data', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'not found' });
    const result = await r.findConversation('1');
    expect(result).toBeNull();
  });

  it('should return mapped conversation on success', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse({ id: '1', type: 'GROUP', title: 'Test', school_id: 's1' });
    const result = await r.findConversation('1');
    expect(result).toBeDefined();
  });

  it('should return empty list when findAllConversations errors', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'db error' }, 0);
    const result = await r.findAllConversations('school1');
    expect(result.data).toEqual([]);
    expect(result.total).toBe(0);
  });

  it('should return conversations list on success', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse([{ id: '1', type: 'GROUP', title: 'Test' }], null, 1);
    const result = await r.findAllConversations('school1');
    expect(result.total).toBe(1);
  });

  it('should throw on createConversation error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'insert failed' });
    await expect(r.createConversation({ type: 'GROUP', title: 'T' }, 's1')).rejects.toThrow();
  });

  it('should return conversation on createConversation success', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse({ id: '1', type: 'GROUP', title: 'New' });
    const result = await r.createConversation({ type: 'GROUP', title: 'New', memberIds: [] }, 's1');
    expect(result).toBeDefined();
  });

  it('should throw on updateConversation error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'update failed' });
    await expect(r.updateConversation('1', { title: 'Updated' })).rejects.toThrow();
  });

  it('should throw on deleteConversation error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'delete failed' });
    await expect(r.deleteConversation('1')).rejects.toThrow();
  });

  it('should delete conversation on success', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null);
    await expect(r.deleteConversation('1')).resolves.toBeUndefined();
  });

  it('should throw on archiveConversation error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'archive failed' });
    await expect(r.archiveConversation('1')).rejects.toThrow();
  });

  it('should throw on restoreConversation error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'restore failed' });
    await expect(r.restoreConversation('1')).rejects.toThrow();
  });

  it('should throw on pinConversation error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    supabase.single.mockResolvedValueOnce({ data: { is_pinned: false }, error: null });
    setResponse(null, { message: 'pin failed' });
    await expect(r.pinConversation('1')).rejects.toThrow();
  });

  it('should throw on muteConversation error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'mute failed' });
    await expect(r.muteConversation('1', true)).rejects.toThrow();
  });

  it('should return empty members on error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'error' });
    const result = await r.findConversationMembers('conv1');
    expect(result).toEqual([]);
  });

  it('should throw on addConversationMember error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'add failed' });
    await expect(r.addConversationMember('conv1', 'user1')).rejects.toThrow();
  });

  it('should throw on removeConversationMember error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'remove failed' });
    await expect(r.removeConversationMember('conv1', 'user1')).rejects.toThrow();
  });

  it('should throw on updateMemberRole error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'role failed' });
    await expect(r.updateMemberRole('conv1', 'user1', 'ADMIN')).rejects.toThrow();
  });

  it('should throw on muteMember error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'mute member failed' });
    await expect(r.muteMember('conv1', 'user1', true)).rejects.toThrow();
  });

  it('should return null when findMessage finds no data', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'not found' });
    const result = await r.findMessage('1');
    expect(result).toBeNull();
  });

  it('should return empty messages on findMessages error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'error' }, 0);
    const result = await r.findMessages('conv1');
    expect(result.data).toEqual([]);
  });

  it('should throw on createMessage error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'create msg failed' });
    await expect(r.createMessage({ conversationId: 'c1', content: 'Hi' }, 'u1', 's1')).rejects.toThrow();
  });

  it('should throw on updateMessage error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'update msg failed' });
    await expect(r.updateMessage('1', { content: 'Updated' })).rejects.toThrow();
  });

  it('should throw on deleteMessage error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'delete msg failed' });
    await expect(r.deleteMessage('1')).rejects.toThrow();
  });

  it('should throw on softDeleteMessage error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'soft del failed' });
    await expect(r.softDeleteMessage('1')).rejects.toThrow();
  });

  it('should throw on pinMessage error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    supabase.single.mockResolvedValueOnce({ data: { is_pinned: false }, error: null });
    setResponse(null, { message: 'pin msg failed' });
    await expect(r.pinMessage('1')).rejects.toThrow();
  });

  it('should throw when forwardMessage message not found', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'not found' });
    await expect(r.forwardMessage('1', ['c1'], 'u1')).rejects.toThrow('Message not found');
  });

  it('should return empty on searchMessages error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'search error' }, 0);
    const result = await r.searchMessages('s1', { query: 'test' });
    expect(result.data).toEqual([]);
  });

  it('should return empty reactions on error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'error' });
    const result = await r.findMessageReactions('msg1');
    expect(result).toEqual([]);
  });

  it('should throw on addReaction error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'reaction add failed' });
    await expect(r.addReaction('msg1', 'u1', 'LIKE')).rejects.toThrow();
  });

  it('should throw on removeReaction error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'reaction remove failed' });
    await expect(r.removeReaction('msg1', 'u1')).rejects.toThrow();
  });

  it('should throw on markAsRead error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'mark read failed' });
    await expect(r.markAsRead('msg1', 'u1')).rejects.toThrow();
  });

  it('should return 0 on getUnreadCount error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'count error' });
    const result = await r.getUnreadCount('conv1', 'u1');
    expect(result).toBe(0);
  });

  it('should return 0 on getTotalUnreadCount when no member conversations', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse([], null);
    const result = await r.getTotalUnreadCount('u1', 's1');
    expect(result).toBe(0);
  });

  it('should return null when findAttachment finds nothing', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'not found' });
    const result = await r.findAttachment('1');
    expect(result).toBeNull();
  });

  it('should throw on createAttachment error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'attach failed' });
    await expect(r.createAttachment({ messageId: 'm1', fileName: 'f', fileType: 'pdf', fileSize: 1, fileUrl: 'url', mimeType: 'pdf', type: 'FILE', uploadedBy: 'u1' })).rejects.toThrow();
  });

  it('should throw on deleteAttachment error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'delete attach failed' });
    await expect(r.deleteAttachment('1')).rejects.toThrow();
  });

  it('should return empty on getAttachments error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'error' });
    const result = await r.getAttachments('msg1');
    expect(result).toEqual([]);
  });

  it('should return null when findNotification finds nothing', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'not found' });
    const result = await r.findNotification('1');
    expect(result).toBeNull();
  });

  it('should return empty notifications on findNotifications error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'error' }, 0);
    const result = await r.findNotifications('u1', 's1');
    expect(result.data).toEqual([]);
  });

  it('should throw on createNotification error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'notif create failed' });
    await expect(r.createNotification({ userId: 'u1', schoolId: 's1', type: 'MESSAGE', title: 'T', body: 'B' })).rejects.toThrow();
  });

  it('should throw on markNotificationAsRead error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'mark read failed' });
    await expect(r.markNotificationAsRead('1')).rejects.toThrow();
  });

  it('should return empty on findNotificationPreferences error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'error' });
    const result = await r.findNotificationPreferences('u1', 's1');
    expect(result).toEqual([]);
  });

  it('should return null when findNotificationSettings finds nothing', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'not found' });
    const result = await r.findNotificationSettings('u1', 's1');
    expect(result).toBeNull();
  });

  it('should return null when findGroup finds nothing', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'not found' });
    const result = await r.findGroup('1');
    expect(result).toBeNull();
  });

  it('should return empty on findAllGroups error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'error' }, 0);
    const result = await r.findAllGroups('s1');
    expect(result.data).toEqual([]);
  });

  it('should throw on createGroup error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'group create failed' });
    await expect(r.createGroup({ name: 'G', type: 'CLASS', memberIds: [] }, 's1', 'u1')).rejects.toThrow();
  });

  it('should throw on updateGroup error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'group update failed' });
    await expect(r.updateGroup('1', { name: 'Updated' })).rejects.toThrow();
  });

  it('should throw on deleteGroup error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'group delete failed' });
    await expect(r.deleteGroup('1')).rejects.toThrow();
  });

  it('should throw on archiveGroup error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'group archive failed' });
    await expect(r.archiveGroup('1')).rejects.toThrow();
  });

  it('should return empty group members on error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'error' });
    const result = await r.findGroupMembers('g1');
    expect(result).toEqual([]);
  });

  it('should throw on addGroupMember error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'add member failed' });
    await expect(r.addGroupMember('g1', 'u1')).rejects.toThrow();
  });

  it('should throw on removeGroupMember error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'remove member failed' });
    await expect(r.removeGroupMember('g1', 'u1')).rejects.toThrow();
  });

  it('should return null when findAnnouncement finds nothing', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'not found' });
    const result = await r.findAnnouncement('1');
    expect(result).toBeNull();
  });

  it('should return empty announcements on error', async () => {
    const { supabase, setResponse } = createMockSupabase();
    const { SupabaseMessageRepository } = await import('../../src/features/messages/repositories/message.repository');
    const r = new SupabaseMessageRepository(supabase);
    setResponse(null, { message: 'error' }, 0);
    const result = await r.findAnnouncements('s1');
    expect(result.data).toEqual([]);
  });
});
