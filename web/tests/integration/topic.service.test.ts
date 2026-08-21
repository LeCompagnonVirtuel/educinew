import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTopicService } from '../../src/features/integration/services/topic.service';

describe('TopicService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getTopics: vi.fn(),
      getTopicById: vi.fn(),
      createTopic: vi.fn(),
      updateTopic: vi.fn(),
      deleteTopic: vi.fn(),
      subscribeToTopic: vi.fn(),
      unsubscribeFromTopic: vi.fn(),
      getSubscribers: vi.fn(),
      publishMessage: vi.fn(),
      getMessages: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createTopicService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getTopics).toBeInstanceOf(Function);
    expect(service.getTopicById).toBeInstanceOf(Function);
    expect(service.createTopic).toBeInstanceOf(Function);
    expect(service.updateTopic).toBeInstanceOf(Function);
    expect(service.deleteTopic).toBeInstanceOf(Function);
    expect(service.subscribeToTopic).toBeInstanceOf(Function);
    expect(service.unsubscribeFromTopic).toBeInstanceOf(Function);
    expect(service.getSubscribers).toBeInstanceOf(Function);
    expect(service.publishMessage).toBeInstanceOf(Function);
    expect(service.getMessages).toBeInstanceOf(Function);
  });

  describe('getTopics', () => {
    it('should return topics list', async () => {
      const topics = [{ id: 'tp-1', name: 'document.updates' }];
      mockRepository.getTopics.mockResolvedValue(topics);
      const service = createTopicService(mockRepository);
      const result = await service.getTopics('school-1');
      expect(result).toEqual(topics);
    });

    it('should return topics with filters', async () => {
      mockRepository.getTopics.mockResolvedValue([{ id: 'tp-1' }]);
      const service = createTopicService(mockRepository);
      await service.getTopics('school-1', { status: 'active' });
      expect(mockRepository.getTopics).toHaveBeenCalledWith('school-1', { status: 'active' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createTopicService(mockRepository);
      await expect(service.getTopics('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list when no topics exist', async () => {
      mockRepository.getTopics.mockResolvedValue([]);
      const service = createTopicService(mockRepository);
      const result = await service.getTopics('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated topics', async () => {
      mockRepository.getTopics.mockResolvedValue({ data: [{ id: 'tp-1' }], total: 20 });
      const service = createTopicService(mockRepository);
      const result = await service.getTopics('school-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by category', async () => {
      mockRepository.getTopics.mockResolvedValue([{ id: 'tp-1', category: 'document' }]);
      const service = createTopicService(mockRepository);
      const result = await service.getTopics('school-1', { category: 'document' });
      expect(result).toHaveLength(1);
    });

    it('should return topics with subscriber count', async () => {
      mockRepository.getTopics.mockResolvedValue([{ id: 'tp-1', subscriberCount: 10 }]);
      const service = createTopicService(mockRepository);
      const result = await service.getTopics('school-1');
      expect(result[0].subscriberCount).toBe(10);
    });

    it('should return topics with last message', async () => {
      mockRepository.getTopics.mockResolvedValue([{ id: 'tp-1', lastMessageAt: '2024-01-01' }]);
      const service = createTopicService(mockRepository);
      const result = await service.getTopics('school-1');
      expect(result[0].lastMessageAt).toBeDefined();
    });

    it('should filter by creator', async () => {
      mockRepository.getTopics.mockResolvedValue([{ id: 'tp-1', createdBy: 'user-1' }]);
      const service = createTopicService(mockRepository);
      const result = await service.getTopics('school-1', { createdBy: 'user-1' });
      expect(result).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getTopics.mockRejectedValue(new Error('DB error'));
      const service = createTopicService(mockRepository);
      await expect(service.getTopics('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getTopicById', () => {
    it('should return a single topic', async () => {
      const topic = { id: 'tp-1', name: 'document.updates' };
      mockRepository.getTopicById.mockResolvedValue(topic);
      const service = createTopicService(mockRepository);
      const result = await service.getTopicById('tp-1');
      expect(result).toEqual(topic);
    });

    it('should throw if topic not found', async () => {
      mockRepository.getTopicById.mockResolvedValue(null);
      const service = createTopicService(mockRepository);
      await expect(service.getTopicById('nonexistent')).rejects.toThrow('Topic not found');
    });

    it('should throw if id is missing', async () => {
      const service = createTopicService(mockRepository);
      await expect(service.getTopicById('')).rejects.toThrow('Topic ID is required');
    });

    it('should return topic with subscribers', async () => {
      mockRepository.getTopicById.mockResolvedValue({ id: 'tp-1', subscribers: ['user-1', 'user-2'] });
      const service = createTopicService(mockRepository);
      const result = await service.getTopicById('tp-1');
      expect(result.subscribers).toHaveLength(2);
    });

    it('should return topic with schema', async () => {
      mockRepository.getTopicById.mockResolvedValue({ id: 'tp-1', schema: { fields: ['id', 'type'] } });
      const service = createTopicService(mockRepository);
      const result = await service.getTopicById('tp-1');
      expect(result.schema.fields).toHaveLength(2);
    });

    it('should return topic with message count', async () => {
      mockRepository.getTopicById.mockResolvedValue({ id: 'tp-1', messageCount: 150 });
      const service = createTopicService(mockRepository);
      const result = await service.getTopicById('tp-1');
      expect(result.messageCount).toBe(150);
    });

    it('should return topic with retention', async () => {
      mockRepository.getTopicById.mockResolvedValue({ id: 'tp-1', retentionDays: 30 });
      const service = createTopicService(mockRepository);
      const result = await service.getTopicById('tp-1');
      expect(result.retentionDays).toBe(30);
    });

    it('should handle repository errors', async () => {
      mockRepository.getTopicById.mockRejectedValue(new Error('Query timeout'));
      const service = createTopicService(mockRepository);
      await expect(service.getTopicById('tp-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createTopic', () => {
    it('should create a topic', async () => {
      const data = { name: 'document.updates', category: 'document' };
      mockRepository.createTopic.mockResolvedValue({ id: 'tp-1', ...data });
      const service = createTopicService(mockRepository);
      const result = await service.createTopic('school-1', 'user-1', data);
      expect(result.id).toBe('tp-1');
      expect(mockRepository.createTopic).toHaveBeenCalled();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createTopicService(mockRepository);
      await expect(service.createTopic('', 'user-1', { name: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createTopicService(mockRepository);
      await expect(service.createTopic('school-1', '', { name: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if name is missing', async () => {
      const service = createTopicService(mockRepository);
      await expect(service.createTopic('school-1', 'user-1', { name: '' })).rejects.toThrow('Topic name is required');
    });

    it('should create topic with schema', async () => {
      mockRepository.createTopic.mockResolvedValue({ id: 'tp-1', schema: { fields: ['id'] } });
      const service = createTopicService(mockRepository);
      const result = await service.createTopic('school-1', 'user-1', { name: 'T', schema: { fields: ['id'] } });
      expect(result.schema.fields).toHaveLength(1);
    });

    it('should create topic with description', async () => {
      mockRepository.createTopic.mockResolvedValue({ id: 'tp-1', description: 'Test topic' });
      const service = createTopicService(mockRepository);
      const result = await service.createTopic('school-1', 'user-1', { name: 'T', description: 'Test topic' });
      expect(result.description).toBe('Test topic');
    });

    it('should create topic with retention', async () => {
      mockRepository.createTopic.mockResolvedValue({ id: 'tp-1', retentionDays: 60 });
      const service = createTopicService(mockRepository);
      const result = await service.createTopic('school-1', 'user-1', { name: 'T', retentionDays: 60 });
      expect(result.retentionDays).toBe(60);
    });

    it('should handle creation failure', async () => {
      mockRepository.createTopic.mockRejectedValue(new Error('Topic already exists'));
      const service = createTopicService(mockRepository);
      await expect(service.createTopic('school-1', 'user-1', { name: 'T' })).rejects.toThrow('Topic already exists');
    });
  });

  describe('updateTopic', () => {
    it('should update a topic', async () => {
      mockRepository.getTopicById.mockResolvedValue({ id: 'tp-1', name: 'Old' });
      mockRepository.updateTopic.mockResolvedValue({ id: 'tp-1', name: 'Updated' });
      const service = createTopicService(mockRepository);
      const result = await service.updateTopic('tp-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if topic not found', async () => {
      mockRepository.getTopicById.mockResolvedValue(null);
      const service = createTopicService(mockRepository);
      await expect(service.updateTopic('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createTopicService(mockRepository);
      await expect(service.updateTopic('', 'user-1', { name: 'New' })).rejects.toThrow('Topic ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createTopicService(mockRepository);
      await expect(service.updateTopic('tp-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update topic schema', async () => {
      mockRepository.getTopicById.mockResolvedValue({ id: 'tp-1' });
      mockRepository.updateTopic.mockResolvedValue({ id: 'tp-1', schema: { fields: ['new'] } });
      const service = createTopicService(mockRepository);
      const result = await service.updateTopic('tp-1', 'user-1', { schema: { fields: ['new'] } });
      expect(result.schema.fields).toHaveLength(1);
    });

    it('should update topic description', async () => {
      mockRepository.getTopicById.mockResolvedValue({ id: 'tp-1' });
      mockRepository.updateTopic.mockResolvedValue({ id: 'tp-1', description: 'New desc' });
      const service = createTopicService(mockRepository);
      const result = await service.updateTopic('tp-1', 'user-1', { description: 'New desc' });
      expect(result.description).toBe('New desc');
    });

    it('should handle update failure', async () => {
      mockRepository.getTopicById.mockResolvedValue({ id: 'tp-1' });
      mockRepository.updateTopic.mockRejectedValue(new Error('Cannot update'));
      const service = createTopicService(mockRepository);
      await expect(service.updateTopic('tp-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteTopic', () => {
    it('should delete a topic', async () => {
      mockRepository.getTopicById.mockResolvedValue({ id: 'tp-1' });
      mockRepository.deleteTopic.mockResolvedValue({ success: true });
      const service = createTopicService(mockRepository);
      await service.deleteTopic('tp-1', 'user-1');
      expect(mockRepository.deleteTopic).toHaveBeenCalledWith('tp-1');
    });

    it('should throw if topic not found', async () => {
      mockRepository.getTopicById.mockResolvedValue(null);
      const service = createTopicService(mockRepository);
      await expect(service.deleteTopic('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createTopicService(mockRepository);
      await expect(service.deleteTopic('', 'user-1')).rejects.toThrow('Topic ID is required');
    });

    it('should handle deletion with active subscribers', async () => {
      mockRepository.getTopicById.mockResolvedValue({ id: 'tp-1', subscriberCount: 5 });
      mockRepository.deleteTopic.mockRejectedValue(new Error('Topic has active subscribers'));
      const service = createTopicService(mockRepository);
      await expect(service.deleteTopic('tp-1', 'user-1')).rejects.toThrow('Topic has active subscribers');
    });

    it('should force delete topic', async () => {
      mockRepository.getTopicById.mockResolvedValue({ id: 'tp-1' });
      mockRepository.deleteTopic.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createTopicService(mockRepository);
      const result = await service.deleteTopic('tp-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('subscribeToTopic', () => {
    it('should subscribe user to topic', async () => {
      mockRepository.subscribeToTopic.mockResolvedValue({ topicId: 'tp-1', userId: 'user-1', subscribedAt: '2024-01-01' });
      const service = createTopicService(mockRepository);
      const result = await service.subscribeToTopic('tp-1', 'user-1');
      expect(result.topicId).toBe('tp-1');
      expect(result.userId).toBe('user-1');
    });

    it('should throw if topicId is missing', async () => {
      const service = createTopicService(mockRepository);
      await expect(service.subscribeToTopic('', 'user-1')).rejects.toThrow('Topic ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createTopicService(mockRepository);
      await expect(service.subscribeToTopic('tp-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle already subscribed', async () => {
      mockRepository.subscribeToTopic.mockRejectedValue(new Error('Already subscribed'));
      const service = createTopicService(mockRepository);
      await expect(service.subscribeToTopic('tp-1', 'user-1')).rejects.toThrow('Already subscribed');
    });

    it('should subscribe with options', async () => {
      mockRepository.subscribeToTopic.mockResolvedValue({ topicId: 'tp-1', userId: 'user-1', digest: true });
      const service = createTopicService(mockRepository);
      const result = await service.subscribeToTopic('tp-1', 'user-1', { digest: true });
      expect(result.digest).toBe(true);
    });

    it('should subscribe with webhook', async () => {
      mockRepository.subscribeToTopic.mockResolvedValue({ topicId: 'tp-1', userId: 'user-1', webhookUrl: 'https://example.com' });
      const service = createTopicService(mockRepository);
      const result = await service.subscribeToTopic('tp-1', 'user-1', { webhookUrl: 'https://example.com' });
      expect(result.webhookUrl).toBe('https://example.com');
    });
  });

  describe('unsubscribeFromTopic', () => {
    it('should unsubscribe user from topic', async () => {
      mockRepository.unsubscribeFromTopic.mockResolvedValue({ success: true });
      const service = createTopicService(mockRepository);
      await service.unsubscribeFromTopic('tp-1', 'user-1');
      expect(mockRepository.unsubscribeFromTopic).toHaveBeenCalledWith('tp-1', 'user-1');
    });

    it('should throw if topicId is missing', async () => {
      const service = createTopicService(mockRepository);
      await expect(service.unsubscribeFromTopic('', 'user-1')).rejects.toThrow('Topic ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createTopicService(mockRepository);
      await expect(service.unsubscribeFromTopic('tp-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle not subscribed', async () => {
      mockRepository.unsubscribeFromTopic.mockRejectedValue(new Error('Not subscribed'));
      const service = createTopicService(mockRepository);
      await expect(service.unsubscribeFromTopic('tp-1', 'user-1')).rejects.toThrow('Not subscribed');
    });
  });

  describe('getSubscribers', () => {
    it('should return topic subscribers', async () => {
      mockRepository.getSubscribers.mockResolvedValue([{ id: 'user-1', email: 'a@b.com' }]);
      const service = createTopicService(mockRepository);
      const result = await service.getSubscribers('tp-1');
      expect(result).toHaveLength(1);
    });

    it('should return paginated subscribers', async () => {
      mockRepository.getSubscribers.mockResolvedValue({ data: [{ id: 'user-1' }], total: 50 });
      const service = createTopicService(mockRepository);
      const result = await service.getSubscribers('tp-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should throw if topicId is missing', async () => {
      const service = createTopicService(mockRepository);
      await expect(service.getSubscribers('')).rejects.toThrow('Topic ID is required');
    });

    it('should return empty subscribers', async () => {
      mockRepository.getSubscribers.mockResolvedValue([]);
      const service = createTopicService(mockRepository);
      const result = await service.getSubscribers('tp-1');
      expect(result).toEqual([]);
    });
  });

  describe('publishMessage', () => {
    it('should publish a message to topic', async () => {
      mockRepository.publishMessage.mockResolvedValue({ id: 'msg-1', topicId: 'tp-1', publishedAt: '2024-01-01' });
      const service = createTopicService(mockRepository);
      const result = await service.publishMessage('tp-1', 'user-1', { type: 'created', data: { id: 'doc-1' } });
      expect(result.id).toBe('msg-1');
    });

    it('should throw if topicId is missing', async () => {
      const service = createTopicService(mockRepository);
      await expect(service.publishMessage('', 'user-1', {})).rejects.toThrow('Topic ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createTopicService(mockRepository);
      await expect(service.publishMessage('tp-1', '', {})).rejects.toThrow('userId is required');
    });

    it('should throw if payload is missing', async () => {
      const service = createTopicService(mockRepository);
      await expect(service.publishMessage('tp-1', 'user-1', null)).rejects.toThrow('Message payload is required');
    });

    it('should handle publish failure', async () => {
      mockRepository.publishMessage.mockRejectedValue(new Error('Topic inactive'));
      const service = createTopicService(mockRepository);
      await expect(service.publishMessage('tp-1', 'user-1', {})).rejects.toThrow('Topic inactive');
    });

    it('should publish with metadata', async () => {
      mockRepository.publishMessage.mockResolvedValue({ id: 'msg-1', metadata: { source: 'api' } });
      const service = createTopicService(mockRepository);
      const result = await service.publishMessage('tp-1', 'user-1', { data: {}, metadata: { source: 'api' } });
      expect(result.metadata.source).toBe('api');
    });
  });

  describe('getMessages', () => {
    it('should return topic messages', async () => {
      mockRepository.getMessages.mockResolvedValue([{ id: 'msg-1', topicId: 'tp-1' }]);
      const service = createTopicService(mockRepository);
      const result = await service.getMessages('tp-1');
      expect(result).toHaveLength(1);
    });

    it('should return messages with filters', async () => {
      mockRepository.getMessages.mockResolvedValue([{ id: 'msg-1' }]);
      const service = createTopicService(mockRepository);
      await service.getMessages('tp-1', { since: '2024-01-01' });
      expect(mockRepository.getMessages).toHaveBeenCalledWith('tp-1', { since: '2024-01-01' });
    });

    it('should throw if topicId is missing', async () => {
      const service = createTopicService(mockRepository);
      await expect(service.getMessages('')).rejects.toThrow('Topic ID is required');
    });

    it('should return paginated messages', async () => {
      mockRepository.getMessages.mockResolvedValue({ data: [{ id: 'msg-1' }], total: 100 });
      const service = createTopicService(mockRepository);
      const result = await service.getMessages('tp-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should return empty messages', async () => {
      mockRepository.getMessages.mockResolvedValue([]);
      const service = createTopicService(mockRepository);
      const result = await service.getMessages('tp-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getMessages.mockRejectedValue(new Error('DB error'));
      const service = createTopicService(mockRepository);
      await expect(service.getMessages('tp-1')).rejects.toThrow('DB error');
    });
  });
});
