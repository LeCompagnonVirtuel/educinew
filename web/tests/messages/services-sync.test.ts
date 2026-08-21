import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockLogger = { info: vi.fn(), error: vi.fn(), warn: vi.fn(), debug: vi.fn() };
vi.mock('@educi/logger', () => ({ logger: mockLogger }));

function createMockRepo() {
  return {
    findConversation: vi.fn(),
    findAllConversations: vi.fn().mockResolvedValue({ data: [], total: 0 }),
    createConversation: vi.fn(),
    updateConversation: vi.fn(),
    deleteConversation: vi.fn(),
    findMessages: vi.fn().mockResolvedValue({ data: [], total: 0 }),
    createMessage: vi.fn(),
    findNotificationSettings: vi.fn(),
    updateNotificationSettings: vi.fn(),
    getMessageStatistics: vi.fn().mockResolvedValue({ totalMessages: 0, messagesByType: {}, messagesByDay: [], activeConversations: 0, activeUsers: 0, averageMessagesPerDay: 0, topSenders: [] }),
    findAnnouncements: vi.fn().mockResolvedValue({ data: [], total: 0 }),
  };
}

describe('SyncService', () => {
  let service: InstanceType<typeof import('../../src/features/messages/services/sync.service').SyncService>;

  beforeEach(async () => {
    vi.clearAllMocks();
    const { SyncService } = await import('../../src/features/messages/services/sync.service');
    service = new SyncService({ repository: createMockRepo() as never, schoolId: 's1' });
  });

  it('should instantiate SyncService', () => {
    expect(service).toBeDefined();
  });

  it('should sync messages', async () => {
    const result = await service.syncMessages('u1');
    expect(result).toBeDefined();
    expect(result.syncedAt).toBeDefined();
  });

  it('should sync messages with lastSyncAt', async () => {
    const result = await service.syncMessages('u1', '2024-01-01T00:00:00Z');
    expect(result).toBeDefined();
  });

  it('should sync conversations', async () => {
    const result = await service.syncConversations('u1');
    expect(result).toBeDefined();
  });

  it('should sync conversations with lastSyncAt', async () => {
    const result = await service.syncConversations('u1', '2024-01-01T00:00:00Z');
    expect(result).toBeDefined();
  });

  it('should resolve conflict - server newer', async () => {
    const local = { updatedAt: '2024-01-01T00:00:00Z', content: 'local' };
    const server = { updatedAt: '2024-01-02T00:00:00Z', content: 'server' };
    const result = await service.resolveConflict(local, server);
    expect(result).toEqual(server);
  });

  it('should resolve conflict - local newer', async () => {
    const local = { updatedAt: '2024-01-03T00:00:00Z', content: 'local' };
    const server = { updatedAt: '2024-01-02T00:00:00Z', content: 'server' };
    const result = await service.resolveConflict(local, server);
    expect(result).toEqual(local);
  });

  it('should resolve conflict - equal timestamps returns local', async () => {
    const local = { updatedAt: '2024-01-01T00:00:00Z', content: 'local' };
    const server = { updatedAt: '2024-01-01T00:00:00Z', content: 'server' };
    const result = await service.resolveConflict(local, server);
    expect(result).toEqual(local);
  });

  it('should get offline queue', async () => {
    const result = await service.getOfflineQueue('u1');
    expect(result.queue).toEqual([]);
    expect(result.count).toBe(0);
  });

  it('should process offline queue', async () => {
    const result = await service.processOfflineQueue('u1');
    expect(result.processed).toBe(0);
    expect(result.failed).toBe(0);
  });

  it('should log sync messages info', async () => {
    await service.syncMessages('u1');
    expect(mockLogger.info).toHaveBeenCalledWith('Syncing messages', expect.any(Object));
  });

  it('should log sync conversations info', async () => {
    await service.syncConversations('u1');
    expect(mockLogger.info).toHaveBeenCalledWith('Syncing conversations', expect.any(Object));
  });

  it('should log conflict resolution info', async () => {
    await service.resolveConflict({ updatedAt: '2024-01-01T00:00:00Z' }, { updatedAt: '2024-01-02T00:00:00Z' });
    expect(mockLogger.info).toHaveBeenCalledWith('Resolving sync conflict', expect.any(Object));
  });
});

describe('SettingsService', () => {
  let service: InstanceType<typeof import('../../src/features/messages/services/settings.service').SettingsService>;

  beforeEach(async () => {
    vi.clearAllMocks();
    const { SettingsService } = await import('../../src/features/messages/services/settings.service');
    service = new SettingsService({ repository: createMockRepo() as never, schoolId: 's1' });
  });

  it('should instantiate SettingsService', () => {
    expect(service).toBeDefined();
  });

  it('should find settings', async () => {
    const mockRepo = createMockRepo();
    mockRepo.findNotificationSettings.mockResolvedValue({ emailEnabled: true });
    const { SettingsService } = await import('../../src/features/messages/services/settings.service');
    const svc = new SettingsService({ repository: mockRepo as never, schoolId: 's1' });
    const result = await svc.findSettings('u1');
    expect(result).toEqual({ emailEnabled: true });
  });

  it('should update settings', async () => {
    const mockRepo = createMockRepo();
    mockRepo.updateNotificationSettings.mockResolvedValue({ emailEnabled: false });
    const { SettingsService } = await import('../../src/features/messages/services/settings.service');
    const svc = new SettingsService({ repository: mockRepo as never, schoolId: 's1' });
    const result = await svc.updateSettings('u1', { emailEnabled: false });
    expect(result.emailEnabled).toBe(false);
  });

  it('should find notification settings', async () => {
    const mockRepo = createMockRepo();
    mockRepo.findNotificationSettings.mockResolvedValue({ pushEnabled: true });
    const { SettingsService } = await import('../../src/features/messages/services/settings.service');
    const svc = new SettingsService({ repository: mockRepo as never, schoolId: 's1' });
    const result = await svc.findNotificationSettings('u1');
    expect(result.pushEnabled).toBe(true);
  });

  it('should update notification settings', async () => {
    const mockRepo = createMockRepo();
    mockRepo.updateNotificationSettings.mockResolvedValue({ pushEnabled: false });
    const { SettingsService } = await import('../../src/features/messages/services/settings.service');
    const svc = new SettingsService({ repository: mockRepo as never, schoolId: 's1' });
    const result = await svc.updateNotificationSettings('u1', { pushEnabled: false });
    expect(result.pushEnabled).toBe(false);
  });

  it('should return null when no settings found', async () => {
    const mockRepo = createMockRepo();
    mockRepo.findNotificationSettings.mockResolvedValue(null);
    const { SettingsService } = await import('../../src/features/messages/services/settings.service');
    const svc = new SettingsService({ repository: mockRepo as never, schoolId: 's1' });
    const result = await svc.findSettings('u1');
    expect(result).toBeNull();
  });

  it('should log finding settings', async () => {
    await service.findSettings('u1');
    expect(mockLogger.info).toHaveBeenCalledWith('Finding notification settings', expect.any(Object));
  });

  it('should log updating settings', async () => {
    const mockRepo = createMockRepo();
    mockRepo.updateNotificationSettings.mockResolvedValue({});
    const { SettingsService } = await import('../../src/features/messages/services/settings.service');
    const svc = new SettingsService({ repository: mockRepo as never, schoolId: 's1' });
    await svc.updateSettings('u1', { emailEnabled: true });
    expect(mockLogger.info).toHaveBeenCalledWith('Updating notification settings', expect.any(Object));
  });
});

describe('TimelineService', () => {
  let service: InstanceType<typeof import('../../src/features/messages/services/timeline.service').TimelineService>;

  beforeEach(async () => {
    vi.clearAllMocks();
    const { TimelineService } = await import('../../src/features/messages/services/timeline.service');
    service = new TimelineService({ repository: createMockRepo() as never, schoolId: 's1' });
  });

  it('should instantiate TimelineService', () => {
    expect(service).toBeDefined();
  });

  it('should get timeline', async () => {
    const result = await service.getTimeline();
    expect(result.timeline).toBeDefined();
    expect(result.generatedAt).toBeDefined();
  });

  it('should get conversation timeline', async () => {
    const result = await service.getConversationTimeline('c1');
    expect(result.timeline).toBeDefined();
    expect(result.conversationId).toBe('c1');
  });

  it('should get conversation timeline with custom limit', async () => {
    const result = await service.getConversationTimeline('c1', 100);
    expect(result.timeline).toBeDefined();
  });

  it('should get user timeline', async () => {
    const result = await service.getUserTimeline('u1');
    expect(result.timeline).toBeDefined();
    expect(result.userId).toBe('u1');
  });

  it('should get user timeline with custom limit', async () => {
    const result = await service.getUserTimeline('u1', 25);
    expect(result.timeline).toBeDefined();
  });

  it('should log getting timeline', async () => {
    await service.getTimeline();
    expect(mockLogger.info).toHaveBeenCalledWith('Getting timeline', expect.any(Object));
  });

  it('should log getting conversation timeline', async () => {
    await service.getConversationTimeline('c1');
    expect(mockLogger.info).toHaveBeenCalledWith('Getting conversation timeline', expect.any(Object));
  });

  it('should log getting user timeline', async () => {
    await service.getUserTimeline('u1');
    expect(mockLogger.info).toHaveBeenCalledWith('Getting user timeline', expect.any(Object));
  });
});

describe('ExportService', () => {
  let service: InstanceType<typeof import('../../src/features/messages/services/export.service').ExportService>;

  beforeEach(async () => {
    vi.clearAllMocks();
    const { ExportService } = await import('../../src/features/messages/services/export.service');
    service = new ExportService({ repository: createMockRepo() as never, schoolId: 's1' });
  });

  it('should instantiate ExportService', () => {
    expect(service).toBeDefined();
  });

  it('should export messages', async () => {
    const result = await service.exportMessages('c1', 'json');
    expect(result.messages).toBeDefined();
    expect(result.format).toBe('json');
    expect(result.exportedAt).toBeDefined();
  });

  it('should export conversations', async () => {
    const result = await service.exportConversations('csv');
    expect(result.conversations).toBeDefined();
    expect(result.format).toBe('csv');
  });

  it('should export statistics', async () => {
    const result = await service.exportStatistics();
    expect(result.statistics).toBeDefined();
    expect(result.period).toBe('all');
  });

  it('should export statistics with period', async () => {
    const result = await service.exportStatistics('30d');
    expect(result.period).toBe('30d');
  });

  it('should log exporting messages', async () => {
    await service.exportMessages('c1', 'json');
    expect(mockLogger.info).toHaveBeenCalledWith('Exporting messages', expect.any(Object));
  });

  it('should log exporting conversations', async () => {
    await service.exportConversations('csv');
    expect(mockLogger.info).toHaveBeenCalledWith('Exporting conversations', expect.any(Object));
  });

  it('should log exporting statistics', async () => {
    await service.exportStatistics();
    expect(mockLogger.info).toHaveBeenCalledWith('Exporting message statistics', expect.any(Object));
  });
});

describe('ImportService', () => {
  let service: InstanceType<typeof import('../../src/features/messages/services/import.service').ImportService>;

  beforeEach(async () => {
    vi.clearAllMocks();
    const { ImportService } = await import('../../src/features/messages/services/import.service');
    service = new ImportService({ repository: createMockRepo(), schoolId: 's1' });
  });

  it('should instantiate ImportService', () => {
    expect(service).toBeDefined();
  });

  it('should import messages', async () => {
    const result = await service.importMessages({
      conversationId: 'c1',
      messages: [{ senderId: 'u1', content: 'Hello' }, { senderId: 'u2', content: 'Hi' }],
    });
    expect(result.imported).toBe(2);
    expect(result.conversationId).toBe('c1');
  });

  it('should import conversations', async () => {
    const result = await service.importConversations({
      conversations: [{ title: 'Group 1', type: 'GROUP', memberIds: ['u1', 'u2'] }],
    });
    expect(result.imported).toBe(1);
  });

  it('should import multiple messages', async () => {
    const msgs = Array.from({ length: 10 }, (_, i) => ({ senderId: `u${i}`, content: `Msg ${i}` }));
    const result = await service.importMessages({ conversationId: 'c1', messages: msgs });
    expect(result.imported).toBe(10);
  });

  it('should import multiple conversations', async () => {
    const convs = Array.from({ length: 5 }, (_, i) => ({ title: `Group ${i}`, type: 'GROUP', memberIds: ['u1'] }));
    const result = await service.importConversations({ conversations: convs });
    expect(result.imported).toBe(5);
  });

  it('should import empty messages', async () => {
    const result = await service.importMessages({ conversationId: 'c1', messages: [] });
    expect(result.imported).toBe(0);
  });

  it('should import empty conversations', async () => {
    const result = await service.importConversations({ conversations: [] });
    expect(result.imported).toBe(0);
  });

  it('should handle messages with optional createdAt', async () => {
    const result = await service.importMessages({
      conversationId: 'c1',
      messages: [{ senderId: 'u1', content: 'Timed', createdAt: '2024-01-01T00:00:00Z' }],
    });
    expect(result.imported).toBe(1);
  });

  it('should handle conversations with various types', async () => {
    const result = await service.importConversations({
      conversations: [
        { title: 'Class', type: 'CLASS', memberIds: ['u1'] },
        { title: 'Group', type: 'GROUP', memberIds: ['u2'] },
        { title: 'Direct', type: 'DIRECT', memberIds: ['u3'] },
      ],
    });
    expect(result.imported).toBe(3);
  });
});
