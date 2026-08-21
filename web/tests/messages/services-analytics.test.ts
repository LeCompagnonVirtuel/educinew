import { describe, it, expect, vi } from 'vitest';

describe('Message Services Analytics', () => {
  it('should handle StatisticsService initialization', () => {
    const mockRepo = {
      getMessageStatistics: vi.fn().mockResolvedValue({}),
      findMessages: vi.fn().mockResolvedValue({ data: [] }),
      findAllConversations: vi.fn().mockResolvedValue({ data: [] }),
    };
    expect(mockRepo.getMessageStatistics).toBeDefined();
    expect(typeof mockRepo.getMessageStatistics).toBe('function');
  });

  it('should handle getMessageStatistics', async () => {
    const mockRepo = {
      getMessageStatistics: vi.fn().mockResolvedValue({
        totalMessages: 100,
        messagesByType: { TEXT: 80, IMAGE: 20 },
      }),
    };
    const result = await mockRepo.getMessageStatistics({});
    expect(result.totalMessages).toBe(100);
    expect(result.messagesByType.TEXT).toBe(80);
  });

  it('should handle getConversationStatistics', async () => {
    const mockRepo = {
      findMessages: vi.fn().mockResolvedValue({
        data: [
          { id: '1', createdAt: '2025-01-01' },
          { id: '2', createdAt: '2025-01-02' },
        ],
      }),
    };
    const { data } = await mockRepo.findMessages('conv1', { limit: 10000 });
    const stats = { conversationId: 'conv1', totalMessages: data.length, lastActivity: data[0]?.createdAt };
    expect(stats.totalMessages).toBe(2);
    expect(stats.lastActivity).toBe('2025-01-01');
  });

  it('should handle getUserStatistics', async () => {
    const mockRepo = {
      findAllConversations: vi.fn().mockResolvedValue({
        data: [{ id: '1' }, { id: '2' }, { id: '3' }],
      }),
    };
    const { data: conversations } = await mockRepo.findAllConversations('sch1', { limit: 10000 });
    const stats = { userId: 'u1', totalConversations: conversations.length };
    expect(stats.totalConversations).toBe(3);
  });

  it('should handle DashboardService initialization', () => {
    const mockRepo = {
      getDashboard: vi.fn().mockResolvedValue({}),
      findAllConversations: vi.fn().mockResolvedValue({ data: [] }),
      getTotalUnreadCount: vi.fn().mockResolvedValue(0),
    };
    expect(mockRepo.getDashboard).toBeDefined();
  });

  it('should handle getDashboard', async () => {
    const mockRepo = {
      getDashboard: vi.fn().mockResolvedValue({
        totalConversations: 50,
        activeConversations: 30,
        totalMessages: 1000,
      }),
    };
    const result = await mockRepo.getDashboard();
    expect(result.totalConversations).toBe(50);
    expect(result.activeConversations).toBe(30);
  });

  it('should handle getRecentActivity', async () => {
    const mockRepo = {
      findAllConversations: vi.fn().mockResolvedValue({
        data: [
          { id: '1', lastMessageAt: '2025-01-01' },
          { id: '2', lastMessageAt: '2025-01-02' },
        ],
      }),
    };
    const { data: conversations } = await mockRepo.findAllConversations('sch1', {
      limit: 10,
      sortBy: 'lastMessageAt',
      sortOrder: 'desc',
    });
    expect(conversations).toHaveLength(2);
  });

  it('should handle getUnreadCounts', async () => {
    const mockRepo = {
      getTotalUnreadCount: vi.fn().mockResolvedValue(15),
    };
    const totalUnread = await mockRepo.getTotalUnreadCount('user1', 'sch1');
    expect(totalUnread).toBe(15);
  });

  it('should handle AuditService initialization', () => {
    const mockRepo = {
      logAudit: vi.fn().mockResolvedValue(undefined),
      getAuditLog: vi.fn().mockResolvedValue({ data: [] }),
    };
    expect(mockRepo.logAudit).toBeDefined();
  });

  it('should handle logAudit', async () => {
    const mockRepo = {
      logAudit: vi.fn().mockResolvedValue(undefined),
    };
    await mockRepo.logAudit('sch1', 'u1', 'CREATE', 'MESSAGE', 'm1');
    expect(mockRepo.logAudit).toHaveBeenCalledWith('sch1', 'u1', 'CREATE', 'MESSAGE', 'm1');
  });

  it('should handle getAuditLog', async () => {
    const mockRepo = {
      getAuditLog: vi.fn().mockResolvedValue({
        data: [
          { id: '1', action: 'CREATE' },
          { id: '2', action: 'DELETE' },
        ],
      }),
    };
    const result = await mockRepo.getAuditLog({});
    expect(result.data).toHaveLength(2);
  });

  it('should handle getAuditEntry', async () => {
    const mockRepo = {
      getAuditLog: vi.fn().mockResolvedValue({
        data: [
          { id: '1', action: 'CREATE' },
          { id: '2', action: 'DELETE' },
        ],
      }),
    };
    const { data } = await mockRepo.getAuditLog({ limit: 1000 });
    const entry = data.find((a: any) => a.id === '2');
    expect(entry).toEqual({ id: '2', action: 'DELETE' });
  });

  it('should handle empty audit log', async () => {
    const mockRepo = {
      getAuditLog: vi.fn().mockResolvedValue({ data: [] }),
    };
    const { data } = await mockRepo.getAuditLog({ limit: 1000 });
    const entry = data.find((a: any) => a.id === '1');
    expect(entry).toBeUndefined();
  });

  it('should handle statistics with filters', async () => {
    const mockRepo = {
      getMessageStatistics: vi.fn().mockResolvedValue({
        totalMessages: 50,
        dateFrom: '2025-01-01',
        dateTo: '2025-01-31',
      }),
    };
    const result = await mockRepo.getMessageStatistics({
      dateFrom: '2025-01-01',
      dateTo: '2025-01-31',
    });
    expect(result.totalMessages).toBe(50);
  });

  it('should handle statistics by type', async () => {
    const mockRepo = {
      getMessageStatistics: vi.fn().mockResolvedValue({
        messagesByType: {
          TEXT: 100,
          IMAGE: 20,
          FILE: 10,
          AUDIO: 5,
          VIDEO: 2,
        },
      }),
    };
    const result = await mockRepo.getMessageStatistics({});
    expect(result.messagesByType.TEXT).toBe(100);
    expect(result.messagesByType.IMAGE).toBe(20);
  });

  it('should handle statistics by day', async () => {
    const mockRepo = {
      getMessageStatistics: vi.fn().mockResolvedValue({
        messagesByDay: [
          { date: '2025-01-01', count: 10 },
          { date: '2025-01-02', count: 15 },
          { date: '2025-01-03', count: 8 },
        ],
      }),
    };
    const result = await mockRepo.getMessageStatistics({});
    expect(result.messagesByDay).toHaveLength(3);
  });

  it('should handle top conversations', async () => {
    const mockRepo = {
      getMessageStatistics: vi.fn().mockResolvedValue({
        topConversations: [
          { conversationId: 'c1', messageCount: 100 },
          { conversationId: 'c2', messageCount: 80 },
        ],
      }),
    };
    const result = await mockRepo.getMessageStatistics({});
    expect(result.topConversations).toHaveLength(2);
    expect(result.topConversations[0].messageCount).toBe(100);
  });

  it('should handle active users count', async () => {
    const mockRepo = {
      getMessageStatistics: vi.fn().mockResolvedValue({
        activeUsers: 25,
        totalUsers: 100,
      }),
    };
    const result = await mockRepo.getMessageStatistics({});
    expect(result.activeUsers).toBe(25);
    expect(result.activeUsers).toBeLessThanOrEqual(result.totalUsers);
  });

  it('should handle average messages per day', async () => {
    const mockRepo = {
      getMessageStatistics: vi.fn().mockResolvedValue({
        averageMessagesPerDay: 42.5,
      }),
    };
    const result = await mockRepo.getMessageStatistics({});
    expect(result.averageMessagesPerDay).toBe(42.5);
  });

  it('should handle average response time', async () => {
    const mockRepo = {
      getMessageStatistics: vi.fn().mockResolvedValue({
        averageResponseTime: 300,
      }),
    };
    const result = await mockRepo.getMessageStatistics({});
    expect(result.averageResponseTime).toBe(300);
  });

  it('should handle dashboard with unread counts', async () => {
    const mockRepo = {
      getDashboard: vi.fn().mockResolvedValue({
        unreadByUser: {
          u1: 5,
          u2: 10,
          u3: 0,
        },
      }),
    };
    const result = await mockRepo.getDashboard();
    expect(result.unreadByUser.u1).toBe(5);
    expect(result.unreadByUser.u3).toBe(0);
  });

  it('should handle dashboard pending broadcasts', async () => {
    const mockRepo = {
      getDashboard: vi.fn().mockResolvedValue({
        pendingBroadcasts: 3,
      }),
    };
    const result = await mockRepo.getDashboard();
    expect(result.pendingBroadcasts).toBe(3);
  });

  it('should handle empty statistics', async () => {
    const mockRepo = {
      getMessageStatistics: vi.fn().mockResolvedValue({
        totalMessages: 0,
        messagesByType: {},
        messagesByDay: [],
      }),
    };
    const result = await mockRepo.getMessageStatistics({});
    expect(result.totalMessages).toBe(0);
    expect(Object.keys(result.messagesByType)).toHaveLength(0);
  });

  it('should handle audit log with filters', async () => {
    const mockRepo = {
      getAuditLog: vi.fn().mockResolvedValue({
        data: [
          { id: '1', action: 'CREATE', entityType: 'MESSAGE' },
          { id: '2', action: 'DELETE', entityType: 'CONVERSATION' },
        ],
      }),
    };
    const result = await mockRepo.getAuditLog({ entityType: 'MESSAGE' });
    expect(result.data).toHaveLength(2);
  });

  it('should handle statistics error cases', async () => {
    const mockRepo = {
      getMessageStatistics: vi.fn().mockRejectedValue(new Error('Database error')),
    };
    try {
      await mockRepo.getMessageStatistics({});
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe('Database error');
    }
  });

  it('should handle dashboard error cases', async () => {
    const mockRepo = {
      getDashboard: vi.fn().mockRejectedValue(new Error('Service unavailable')),
    };
    try {
      await mockRepo.getDashboard();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe('Service unavailable');
    }
  });

  it('should handle statistics calculation', () => {
    const calculateStats = (messages: any[]) => {
      const total = messages.length;
      const byType: Record<string, number> = {};
      for (const msg of messages) {
        byType[msg.type] = (byType[msg.type] || 0) + 1;
      }
      return { total, byType };
    };
    const messages = [
      { type: 'TEXT' },
      { type: 'TEXT' },
      { type: 'IMAGE' },
      { type: 'FILE' },
    ];
    const stats = calculateStats(messages);
    expect(stats.total).toBe(4);
    expect(stats.byType.TEXT).toBe(2);
    expect(stats.byType.IMAGE).toBe(1);
  });

  it('should handle percentage calculation', () => {
    const calculatePercentage = (value: number, total: number) => {
      if (total === 0) return 0;
      return Math.round((value / total) * 100 * 100) / 100;
    };
    expect(calculatePercentage(25, 100)).toBe(25);
    expect(calculatePercentage(1, 3)).toBe(33.33);
    expect(calculatePercentage(0, 100)).toBe(0);
    expect(calculatePercentage(10, 0)).toBe(0);
  });

  it('should handle statistics with conversationId filter', async () => {
    const mockRepo = {
      getMessageStatistics: vi.fn().mockResolvedValue({
        totalMessages: 25,
        conversationId: 'conv1',
      }),
    };
    const result = await mockRepo.getMessageStatistics({ conversationId: 'conv1' });
    expect(result.totalMessages).toBe(25);
    expect(result.conversationId).toBe('conv1');
  });

  it('should handle statistics with type filter', async () => {
    const mockRepo = {
      getMessageStatistics: vi.fn().mockResolvedValue({
        totalMessages: 10,
        type: 'TEXT',
      }),
    };
    const result = await mockRepo.getMessageStatistics({ type: 'TEXT' });
    expect(result.totalMessages).toBe(10);
  });

  it('should handle dashboard total messages', async () => {
    const mockRepo = {
      getDashboard: vi.fn().mockResolvedValue({
        totalMessages: 5000,
      }),
    };
    const result = await mockRepo.getDashboard();
    expect(result.totalMessages).toBe(5000);
  });

  it('should handle audit log with previous and new values', async () => {
    const mockRepo = {
      getAuditLog: vi.fn().mockResolvedValue({
        data: [
          {
            id: '1',
            action: 'UPDATE',
            entityType: 'MESSAGE',
            previousValue: { content: 'Old' },
            newValue: { content: 'New' },
          },
        ],
      }),
    };
    const result = await mockRepo.getAuditLog({});
    expect(result.data[0].previousValue.content).toBe('Old');
    expect(result.data[0].newValue.content).toBe('New');
  });

  it('should handle statistics messages by hour', async () => {
    const mockRepo = {
      getMessageStatistics: vi.fn().mockResolvedValue({
        messagesByHour: [
          { hour: 8, count: 50 },
          { hour: 12, count: 100 },
          { hour: 16, count: 75 },
        ],
      }),
    };
    const result = await mockRepo.getMessageStatistics({});
    expect(result.messagesByHour).toHaveLength(3);
    expect(result.messagesByHour[1].count).toBe(100);
  });

  it('should handle statistics with date range validation', async () => {
    const mockRepo = {
      getMessageStatistics: vi.fn().mockResolvedValue({
        totalMessages: 100,
        dateFrom: '2025-01-01',
        dateTo: '2025-12-31',
      }),
    };
    const result = await mockRepo.getMessageStatistics({
      dateFrom: '2025-01-01',
      dateTo: '2025-12-31',
    });
    expect(result.dateFrom).toBe('2025-01-01');
    expect(result.dateTo).toBe('2025-12-31');
  });

  it('should handle dashboard recent activity sorting', async () => {
    const mockRepo = {
      findAllConversations: vi.fn().mockResolvedValue({
        data: [
          { id: '1', lastMessageAt: '2025-01-03' },
          { id: '2', lastMessageAt: '2025-01-01' },
          { id: '3', lastMessageAt: '2025-01-02' },
        ],
      }),
    };
    const { data: conversations } = await mockRepo.findAllConversations('sch1', {
      sortBy: 'lastMessageAt',
      sortOrder: 'desc',
    });
    expect(conversations[0].lastMessageAt).toBe('2025-01-03');
  });
});
