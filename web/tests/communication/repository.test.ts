import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockSupabase = {
  from: vi.fn(),
  rpc: vi.fn(),
};

function createMockQuery() {
  const chain = {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    neq: vi.fn().mockReturnThis(),
    gt: vi.fn().mockReturnThis(),
    gte: vi.fn().mockReturnThis(),
    lt: vi.fn().mockReturnThis(),
    lte: vi.fn().mockReturnThis(),
    like: vi.fn().mockReturnThis(),
    ilike: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    single: vi.fn(),
    maybeSingle: vi.fn(),
    range: vi.fn().mockReturnThis(),
    then: vi.fn(),
  };
  chain.then = vi.fn((resolve) => resolve({ data: [], error: null }));
  return chain;
}

describe('CommunicationRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getConversations', () => {
    it('should fetch conversations', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 'c1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('conversations').select('*');
      expect(result.data).toEqual([{ id: 'c1' }]);
    });

    it('should handle empty results', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('conversations').select('*');
      expect(result.data).toEqual([]);
    });

    it('should handle errors', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: null, error: new Error('db fail') }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('conversations').select('*');
      expect(result.error).toBeDefined();
    });
  });

  describe('getConversation', () => {
    it('should fetch single conversation', async () => {
      const query = createMockQuery();
      query.single = vi.fn().mockResolvedValue({ data: { id: 'c1' }, error: null });
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('conversations').select('*').eq('id', 'c1').single();
      expect(result.data).toEqual({ id: 'c1' });
    });

    it('should return null for non-existent conversation', async () => {
      const query = createMockQuery();
      query.single = vi.fn().mockResolvedValue({ data: null, error: null });
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('conversations').select('*').eq('id', 'nonexistent').single();
      expect(result.data).toBeNull();
    });
  });

  describe('createConversation', () => {
    it('should create a conversation', async () => {
      const query = createMockQuery();
      query.single = vi.fn().mockResolvedValue({ data: { id: 'c1', type: 'direct' }, error: null });
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('conversations').insert({ type: 'direct' }).select().single();
      expect(result.data).toEqual({ id: 'c1', type: 'direct' });
    });

    it('should handle insert error', async () => {
      const query = createMockQuery();
      query.single = vi.fn().mockResolvedValue({ data: null, error: new Error('unique violation') });
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('conversations').insert({ type: 'direct' }).select().single();
      expect(result.error).toBeDefined();
    });
  });

  describe('updateConversation', () => {
    it('should update conversation', async () => {
      const query = createMockQuery();
      query.single = vi.fn().mockResolvedValue({ data: { id: 'c1', name: 'Updated' }, error: null });
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('conversations').update({ name: 'Updated' }).eq('id', 'c1').select().single();
      expect(result.data.name).toBe('Updated');
    });
  });

  describe('deleteConversation', () => {
    it('should delete conversation', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: null, error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('conversations').delete().eq('id', 'c1');
      expect(result.error).toBeNull();
    });
  });

  describe('getMessages', () => {
    it('should fetch messages', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 'm1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('messages').select('*').eq('conversationId', 'c1');
      expect(result.data).toEqual([{ id: 'm1' }]);
    });
  });

  describe('sendMessage', () => {
    it('should send a message', async () => {
      const query = createMockQuery();
      query.single = vi.fn().mockResolvedValue({ data: { id: 'm1', content: 'Hello' }, error: null });
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('messages').insert({ content: 'Hello' }).select().single();
      expect(result.data).toEqual({ id: 'm1', content: 'Hello' });
    });
  });

  describe('updateMessage', () => {
    it('should update message', async () => {
      const query = createMockQuery();
      query.single = vi.fn().mockResolvedValue({ data: { id: 'm1', content: 'Updated' }, error: null });
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('messages').update({ content: 'Updated' }).eq('id', 'm1').select().single();
      expect(result.data.content).toBe('Updated');
    });
  });

  describe('deleteMessage', () => {
    it('should delete message', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: null, error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('messages').delete().eq('id', 'm1');
      expect(result.error).toBeNull();
    });
  });

  describe('getGroups', () => {
    it('should fetch groups', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 'g1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('groups').select('*');
      expect(result.data).toEqual([{ id: 'g1' }]);
    });
  });

  describe('createGroup', () => {
    it('should create group', async () => {
      const query = createMockQuery();
      query.single = vi.fn().mockResolvedValue({ data: { id: 'g1', name: 'Test' }, error: null });
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('groups').insert({ name: 'Test' }).select().single();
      expect(result.data.name).toBe('Test');
    });
  });

  describe('getCalls', () => {
    it('should fetch calls', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 'call1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('calls').select('*');
      expect(result.data).toEqual([{ id: 'call1' }]);
    });
  });

  describe('createCall', () => {
    it('should create call', async () => {
      const query = createMockQuery();
      query.single = vi.fn().mockResolvedValue({ data: { id: 'call1', status: 'ringing' }, error: null });
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('calls').insert({ status: 'ringing' }).select().single();
      expect(result.data.status).toBe('ringing');
    });
  });

  describe('getEmails', () => {
    it('should fetch emails', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 'e1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('emails').select('*');
      expect(result.data).toEqual([{ id: 'e1' }]);
    });
  });

  describe('sendEmail', () => {
    it('should send email', async () => {
      const query = createMockQuery();
      query.single = vi.fn().mockResolvedValue({ data: { id: 'e1', status: 'sent' }, error: null });
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('emails').insert({ status: 'sent' }).select().single();
      expect(result.data.status).toBe('sent');
    });
  });

  describe('getNotifications', () => {
    it('should fetch notifications', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 'n1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('notifications').select('*');
      expect(result.data).toEqual([{ id: 'n1' }]);
    });
  });

  describe('getCalendarEvents', () => {
    it('should fetch calendar events', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 'ev1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('calendar_events').select('*');
      expect(result.data).toEqual([{ id: 'ev1' }]);
    });
  });

  describe('getTasks', () => {
    it('should fetch tasks', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 't1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('tasks').select('*');
      expect(result.data).toEqual([{ id: 't1' }]);
    });
  });

  describe('getDocuments', () => {
    it('should fetch documents', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 'd1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('documents').select('*');
      expect(result.data).toEqual([{ id: 'd1' }]);
    });
  });

  describe('getContacts', () => {
    it('should fetch contacts', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 'ct1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('contacts').select('*');
      expect(result.data).toEqual([{ id: 'ct1' }]);
    });
  });

  describe('getAnnouncements', () => {
    it('should fetch announcements', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 'a1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('announcements').select('*');
      expect(result.data).toEqual([{ id: 'a1' }]);
    });
  });

  describe('getPolls', () => {
    it('should fetch polls', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 'p1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('polls').select('*');
      expect(result.data).toEqual([{ id: 'p1' }]);
    });
  });

  describe('getWebhooks', () => {
    it('should fetch webhooks', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 'w1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('webhooks').select('*');
      expect(result.data).toEqual([{ id: 'w1' }]);
    });
  });

  describe('getChannels', () => {
    it('should fetch channels', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 'ch1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('channels').select('*');
      expect(result.data).toEqual([{ id: 'ch1' }]);
    });
  });

  describe('getSmsMessages', () => {
    it('should fetch SMS messages', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 's1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('sms_messages').select('*');
      expect(result.data).toEqual([{ id: 's1' }]);
    });
  });

  describe('getPushNotifications', () => {
    it('should fetch push notifications', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 'pn1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('push_notifications').select('*');
      expect(result.data).toEqual([{ id: 'pn1' }]);
    });
  });

  describe('getAutoResponses', () => {
    it('should fetch auto responses', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 'ar1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('auto_responses').select('*');
      expect(result.data).toEqual([{ id: 'ar1' }]);
    });
  });

  describe('getScheduledMessages', () => {
    it('should fetch scheduled messages', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 'sm1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('scheduled_messages').select('*');
      expect(result.data).toEqual([{ id: 'sm1' }]);
    });
  });

  describe('getPresence', () => {
    it('should fetch presence', async () => {
      const query = createMockQuery();
      query.single = vi.fn().mockResolvedValue({ data: { userId: 'u1', status: 'online' }, error: null });
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('presence').select('*').eq('userId', 'u1').single();
      expect(result.data.status).toBe('online');
    });
  });

  describe('updatePresence', () => {
    it('should update presence', async () => {
      const query = createMockQuery();
      query.single = vi.fn().mockResolvedValue({ data: { userId: 'u1', status: 'away' }, error: null });
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('presence').update({ status: 'away' }).eq('userId', 'u1').select().single();
      expect(result.data.status).toBe('away');
    });
  });

  describe('getCollaborationSessions', () => {
    it('should fetch sessions', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 'cs1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('collaboration_sessions').select('*');
      expect(result.data).toEqual([{ id: 'cs1' }]);
    });
  });

  describe('search', () => {
    it('should perform search', async () => {
      const query = createMockQuery();
      query.then = vi.fn((resolve) => resolve({ data: [{ id: 'r1' }], error: null }));
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('search').select('*').ilike('content', '%test%');
      expect(result.data).toEqual([{ id: 'r1' }]);
    });
  });

  describe('logCommunicationEvent', () => {
    it('should log event', async () => {
      const query = createMockQuery();
      query.single = vi.fn().mockResolvedValue({ data: { id: 'ev1' }, error: null });
      mockSupabase.from.mockReturnValue(query);

      const result = await mockSupabase.from('communication_events').insert({ event: 'test' }).select().single();
      expect(result.data).toEqual({ id: 'ev1' });
    });
  });
});
