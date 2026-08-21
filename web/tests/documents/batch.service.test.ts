import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createBatchService } from '../../src/features/documents/services/batch.service';

describe('BatchService', () => {
  const mockRepository = {
    createBatchProcess: vi.fn(),
    getBatchProcess: vi.fn(),
    getBatchProcesses: vi.fn(),
    cancelBatchProcess: vi.fn(),
    getQueueItems: vi.fn(),
    addToQueue: vi.fn(),
    processQueueItem: vi.fn(),
    retryQueueItem: vi.fn(),
  };

  const schoolId = 'school-1';
  const userId = 'user-1';
  const batchId = 'batch-1';
  const itemId = 'item-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create service with all methods', () => {
    const service = createBatchService(mockRepository as any);
    expect(service.createBatchProcess).toBeDefined();
    expect(service.getBatchProcess).toBeDefined();
    expect(service.getBatchProcesses).toBeDefined();
    expect(service.cancelBatchProcess).toBeDefined();
    expect(service.getQueueItems).toBeDefined();
    expect(service.addToQueue).toBeDefined();
    expect(service.processQueueItem).toBeDefined();
    expect(service.retryQueueItem).toBeDefined();
  });

  describe('createBatchProcess', () => {
    it('should create batch process with valid data', async () => {
      const data = { type: 'merge', documentIds: ['doc-1', 'doc-2'] };
      const batch = { id: batchId, ...data, createdBy: userId, status: 'pending' };
      mockRepository.createBatchProcess.mockResolvedValue(batch);
      const service = createBatchService(mockRepository as any);
      const result = await service.createBatchProcess(schoolId, userId, data);
      expect(result.id).toBe(batchId);
      expect(mockRepository.createBatchProcess).toHaveBeenCalled();
    });

    it('should throw on missing schoolId', async () => {
      const service = createBatchService(mockRepository as any);
      await expect(service.createBatchProcess('', userId, { type: 'merge' })).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createBatchService(mockRepository as any);
      await expect(service.createBatchProcess(schoolId, '', { type: 'merge' })).rejects.toThrow();
    });

    it('should throw on missing batch type', async () => {
      const service = createBatchService(mockRepository as any);
      await expect(service.createBatchProcess(schoolId, userId, {})).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.createBatchProcess.mockRejectedValue(new Error('DB error'));
      const service = createBatchService(mockRepository as any);
      await expect(service.createBatchProcess(schoolId, userId, { type: 'merge' })).rejects.toThrow('DB error');
    });

    it('should pass schoolId to repository', async () => {
      mockRepository.createBatchProcess.mockResolvedValue({ id: batchId });
      const service = createBatchService(mockRepository as any);
      await service.createBatchProcess(schoolId, userId, { type: 'merge' });
      expect(mockRepository.createBatchProcess).toHaveBeenCalledWith(
        expect.objectContaining({ createdBy: userId }),
        schoolId
      );
    });

    it('should handle different batch types', async () => {
      mockRepository.createBatchProcess.mockResolvedValue({ id: batchId });
      const service = createBatchService(mockRepository as any);
      await service.createBatchProcess(schoolId, userId, { type: 'convert' });
      expect(mockRepository.createBatchProcess).toHaveBeenCalled();
    });

    it('should return created batch with status', async () => {
      const batch = { id: batchId, status: 'queued', createdAt: new Date().toISOString() };
      mockRepository.createBatchProcess.mockResolvedValue(batch);
      const service = createBatchService(mockRepository as any);
      const result = await service.createBatchProcess(schoolId, userId, { type: 'merge' });
      expect(result.status).toBe('queued');
    });
  });

  describe('getBatchProcess', () => {
    it('should return batch process by id', async () => {
      const batch = { id: batchId, type: 'merge', status: 'completed' };
      mockRepository.getBatchProcess.mockResolvedValue(batch);
      const service = createBatchService(mockRepository as any);
      const result = await service.getBatchProcess(batchId, userId);
      expect(result.id).toBe(batchId);
    });

    it('should throw when batch process not found', async () => {
      mockRepository.getBatchProcess.mockResolvedValue(null);
      const service = createBatchService(mockRepository as any);
      await expect(service.getBatchProcess(batchId, userId)).rejects.toThrow();
    });

    it('should throw on missing batchId', async () => {
      const service = createBatchService(mockRepository as any);
      await expect(service.getBatchProcess('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createBatchService(mockRepository as any);
      await expect(service.getBatchProcess(batchId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.getBatchProcess.mockRejectedValue(new Error('Connection timeout'));
      const service = createBatchService(mockRepository as any);
      await expect(service.getBatchProcess(batchId, userId)).rejects.toThrow('Connection timeout');
    });

    it('should call repository with correct batchId', async () => {
      mockRepository.getBatchProcess.mockResolvedValue({ id: batchId });
      const service = createBatchService(mockRepository as any);
      await service.getBatchProcess(batchId, userId);
      expect(mockRepository.getBatchProcess).toHaveBeenCalledWith(batchId);
    });

    it('should return batch with all properties', async () => {
      const batch = { id: batchId, type: 'merge', status: 'completed', progress: 100 };
      mockRepository.getBatchProcess.mockResolvedValue(batch);
      const service = createBatchService(mockRepository as any);
      const result = await service.getBatchProcess(batchId, userId);
      expect(result.progress).toBe(100);
    });

    it('should handle batch with error status', async () => {
      const batch = { id: batchId, status: 'failed', error: 'Processing failed' };
      mockRepository.getBatchProcess.mockResolvedValue(batch);
      const service = createBatchService(mockRepository as any);
      const result = await service.getBatchProcess(batchId, userId);
      expect(result.status).toBe('failed');
    });
  });

  describe('getBatchProcesses', () => {
    it('should return list of batch processes', async () => {
      const batches = [{ id: 'b1' }, { id: 'b2' }];
      mockRepository.getBatchProcesses.mockResolvedValue(batches);
      const service = createBatchService(mockRepository as any);
      const result = await service.getBatchProcesses(schoolId, userId);
      expect(result).toHaveLength(2);
    });

    it('should throw on missing schoolId', async () => {
      const service = createBatchService(mockRepository as any);
      await expect(service.getBatchProcesses('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createBatchService(mockRepository as any);
      await expect(service.getBatchProcesses(schoolId, '')).rejects.toThrow();
    });

    it('should return empty array when no batches', async () => {
      mockRepository.getBatchProcesses.mockResolvedValue([]);
      const service = createBatchService(mockRepository as any);
      const result = await service.getBatchProcesses(schoolId, userId);
      expect(result).toHaveLength(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getBatchProcesses.mockRejectedValue(new Error('DB error'));
      const service = createBatchService(mockRepository as any);
      await expect(service.getBatchProcesses(schoolId, userId)).rejects.toThrow('DB error');
    });

    it('should pass schoolId to repository', async () => {
      mockRepository.getBatchProcesses.mockResolvedValue([]);
      const service = createBatchService(mockRepository as any);
      await service.getBatchProcesses(schoolId, userId);
      expect(mockRepository.getBatchProcesses).toHaveBeenCalledWith(schoolId);
    });

    it('should return batches with different statuses', async () => {
      const batches = [{ id: 'b1', status: 'pending' }, { id: 'b2', status: 'completed' }];
      mockRepository.getBatchProcesses.mockResolvedValue(batches);
      const service = createBatchService(mockRepository as any);
      const result = await service.getBatchProcesses(schoolId, userId);
      expect(result[0].status).toBe('pending');
      expect(result[1].status).toBe('completed');
    });

    it('should handle large batch lists', async () => {
      const batches = Array.from({ length: 100 }, (_, i) => ({ id: `b${i}` }));
      mockRepository.getBatchProcesses.mockResolvedValue(batches);
      const service = createBatchService(mockRepository as any);
      const result = await service.getBatchProcesses(schoolId, userId);
      expect(result).toHaveLength(100);
    });
  });

  describe('cancelBatchProcess', () => {
    it('should cancel batch process', async () => {
      mockRepository.cancelBatchProcess.mockResolvedValue({ id: batchId, status: 'cancelled' });
      const service = createBatchService(mockRepository as any);
      const result = await service.cancelBatchProcess(batchId, userId);
      expect(result.status).toBe('cancelled');
    });

    it('should throw on missing batchId', async () => {
      const service = createBatchService(mockRepository as any);
      await expect(service.cancelBatchProcess('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createBatchService(mockRepository as any);
      await expect(service.cancelBatchProcess(batchId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.cancelBatchProcess.mockRejectedValue(new Error('Cannot cancel'));
      const service = createBatchService(mockRepository as any);
      await expect(service.cancelBatchProcess(batchId, userId)).rejects.toThrow('Cannot cancel');
    });

    it('should call repository with correct batchId', async () => {
      mockRepository.cancelBatchProcess.mockResolvedValue({ id: batchId });
      const service = createBatchService(mockRepository as any);
      await service.cancelBatchProcess(batchId, userId);
      expect(mockRepository.cancelBatchProcess).toHaveBeenCalledWith(batchId);
    });

    it('should return cancelled batch with timestamp', async () => {
      const cancelledAt = new Date().toISOString();
      mockRepository.cancelBatchProcess.mockResolvedValue({ id: batchId, status: 'cancelled', cancelledAt });
      const service = createBatchService(mockRepository as any);
      const result = await service.cancelBatchProcess(batchId, userId);
      expect(result.cancelledAt).toBeDefined();
    });

    it('should handle already completed batch', async () => {
      mockRepository.cancelBatchProcess.mockRejectedValue(new Error('Batch already completed'));
      const service = createBatchService(mockRepository as any);
      await expect(service.cancelBatchProcess(batchId, userId)).rejects.toThrow('Batch already completed');
    });
  });

  describe('getQueueItems', () => {
    it('should return queue items', async () => {
      const items = [{ id: 'q1' }, { id: 'q2' }];
      mockRepository.getQueueItems.mockResolvedValue(items);
      const service = createBatchService(mockRepository as any);
      const result = await service.getQueueItems(schoolId, userId);
      expect(result).toHaveLength(2);
    });

    it('should throw on missing schoolId', async () => {
      const service = createBatchService(mockRepository as any);
      await expect(service.getQueueItems('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createBatchService(mockRepository as any);
      await expect(service.getQueueItems(schoolId, '')).rejects.toThrow();
    });

    it('should return empty queue when no items', async () => {
      mockRepository.getQueueItems.mockResolvedValue([]);
      const service = createBatchService(mockRepository as any);
      const result = await service.getQueueItems(schoolId, userId);
      expect(result).toHaveLength(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getQueueItems.mockRejectedValue(new Error('Queue unavailable'));
      const service = createBatchService(mockRepository as any);
      await expect(service.getQueueItems(schoolId, userId)).rejects.toThrow('Queue unavailable');
    });

    it('should pass schoolId to repository', async () => {
      mockRepository.getQueueItems.mockResolvedValue([]);
      const service = createBatchService(mockRepository as any);
      await service.getQueueItems(schoolId, userId);
      expect(mockRepository.getQueueItems).toHaveBeenCalledWith(schoolId);
    });

    it('should return queue items with priorities', async () => {
      const items = [{ id: 'q1', priority: 'high' }, { id: 'q2', priority: 'low' }];
      mockRepository.getQueueItems.mockResolvedValue(items);
      const service = createBatchService(mockRepository as any);
      const result = await service.getQueueItems(schoolId, userId);
      expect(result[0].priority).toBe('high');
    });

    it('should handle pending and processing items', async () => {
      const items = [{ id: 'q1', status: 'pending' }, { id: 'q2', status: 'processing' }];
      mockRepository.getQueueItems.mockResolvedValue(items);
      const service = createBatchService(mockRepository as any);
      const result = await service.getQueueItems(schoolId, userId);
      expect(result).toHaveLength(2);
    });
  });

  describe('addToQueue', () => {
    it('should add item to queue', async () => {
      const data = { documentId: 'doc-1', action: 'convert' };
      const item = { id: itemId, ...data, userId };
      mockRepository.addToQueue.mockResolvedValue(item);
      const service = createBatchService(mockRepository as any);
      const result = await service.addToQueue(schoolId, userId, data);
      expect(result.id).toBe(itemId);
    });

    it('should throw on missing schoolId', async () => {
      const service = createBatchService(mockRepository as any);
      await expect(service.addToQueue('', userId, { documentId: 'doc-1' })).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createBatchService(mockRepository as any);
      await expect(service.addToQueue(schoolId, '', { documentId: 'doc-1' })).rejects.toThrow();
    });

    it('should throw on missing data', async () => {
      const service = createBatchService(mockRepository as any);
      await expect(service.addToQueue(schoolId, userId, null as any)).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.addToQueue.mockRejectedValue(new Error('Queue full'));
      const service = createBatchService(mockRepository as any);
      await expect(service.addToQueue(schoolId, userId, { documentId: 'doc-1' })).rejects.toThrow('Queue full');
    });

    it('should pass data with userId to repository', async () => {
      mockRepository.addToQueue.mockResolvedValue({ id: itemId });
      const service = createBatchService(mockRepository as any);
      await service.addToQueue(schoolId, userId, { documentId: 'doc-1' });
      expect(mockRepository.addToQueue).toHaveBeenCalledWith(
        expect.objectContaining({ userId }),
        schoolId
      );
    });

    it('should return queued item with position', async () => {
      mockRepository.addToQueue.mockResolvedValue({ id: itemId, position: 3 });
      const service = createBatchService(mockRepository as any);
      const result = await service.addToQueue(schoolId, userId, { documentId: 'doc-1' });
      expect(result.position).toBe(3);
    });

    it('should handle different action types', async () => {
      mockRepository.addToQueue.mockResolvedValue({ id: itemId });
      const service = createBatchService(mockRepository as any);
      await service.addToQueue(schoolId, userId, { documentId: 'doc-1', action: 'merge' });
      expect(mockRepository.addToQueue).toHaveBeenCalled();
    });
  });

  describe('processQueueItem', () => {
    it('should process queue item', async () => {
      mockRepository.processQueueItem.mockResolvedValue({ id: itemId, status: 'completed' });
      const service = createBatchService(mockRepository as any);
      const result = await service.processQueueItem(itemId, userId);
      expect(result.status).toBe('completed');
    });

    it('should throw on missing itemId', async () => {
      const service = createBatchService(mockRepository as any);
      await expect(service.processQueueItem('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createBatchService(mockRepository as any);
      await expect(service.processQueueItem(itemId, '')).rejects.toThrow();
    });

    it('should call repository with correct itemId', async () => {
      mockRepository.processQueueItem.mockResolvedValue({ id: itemId });
      const service = createBatchService(mockRepository as any);
      await service.processQueueItem(itemId, userId);
      expect(mockRepository.processQueueItem).toHaveBeenCalledWith(itemId);
    });

    it('should handle repository errors', async () => {
      mockRepository.processQueueItem.mockRejectedValue(new Error('Processing failed'));
      const service = createBatchService(mockRepository as any);
      await expect(service.processQueueItem(itemId, userId)).rejects.toThrow('Processing failed');
    });

    it('should return result with progress', async () => {
      mockRepository.processQueueItem.mockResolvedValue({ id: itemId, progress: 50 });
      const service = createBatchService(mockRepository as any);
      const result = await service.processQueueItem(itemId, userId);
      expect(result.progress).toBe(50);
    });

    it('should handle item not found', async () => {
      mockRepository.processQueueItem.mockRejectedValue(new Error('Item not found'));
      const service = createBatchService(mockRepository as any);
      await expect(service.processQueueItem(itemId, userId)).rejects.toThrow('Item not found');
    });
  });

  describe('retryQueueItem', () => {
    it('should retry queue item', async () => {
      mockRepository.retryQueueItem.mockResolvedValue({ id: itemId, status: 'retrying' });
      const service = createBatchService(mockRepository as any);
      const result = await service.retryQueueItem(itemId, userId);
      expect(result.status).toBe('retrying');
    });

    it('should throw on missing itemId', async () => {
      const service = createBatchService(mockRepository as any);
      await expect(service.retryQueueItem('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createBatchService(mockRepository as any);
      await expect(service.retryQueueItem(itemId, '')).rejects.toThrow();
    });

    it('should call repository with correct itemId', async () => {
      mockRepository.retryQueueItem.mockResolvedValue({ id: itemId });
      const service = createBatchService(mockRepository as any);
      await service.retryQueueItem(itemId, userId);
      expect(mockRepository.retryQueueItem).toHaveBeenCalledWith(itemId);
    });

    it('should handle repository errors', async () => {
      mockRepository.retryQueueItem.mockRejectedValue(new Error('Retry limit exceeded'));
      const service = createBatchService(mockRepository as any);
      await expect(service.retryQueueItem(itemId, userId)).rejects.toThrow('Retry limit exceeded');
    });

    it('should return retry result with attempt count', async () => {
      mockRepository.retryQueueItem.mockResolvedValue({ id: itemId, attempt: 2 });
      const service = createBatchService(mockRepository as any);
      const result = await service.retryQueueItem(itemId, userId);
      expect(result.attempt).toBe(2);
    });

    it('should handle item not found for retry', async () => {
      mockRepository.retryQueueItem.mockRejectedValue(new Error('Item not found'));
      const service = createBatchService(mockRepository as any);
      await expect(service.retryQueueItem(itemId, userId)).rejects.toThrow('Item not found');
    });

    it('should handle max retries exceeded', async () => {
      mockRepository.retryQueueItem.mockRejectedValue(new Error('Max retries exceeded'));
      const service = createBatchService(mockRepository as any);
      await expect(service.retryQueueItem(itemId, userId)).rejects.toThrow('Max retries exceeded');
    });
  });
});
