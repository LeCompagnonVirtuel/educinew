import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createDeadLetterService } from '../../src/features/integration/services/dead-letter.service';

describe('DeadLetterService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getDeadLetters: vi.fn(),
      getDeadLetterById: vi.fn(),
      createDeadLetter: vi.fn(),
      retryDeadLetter: vi.fn(),
      deleteDeadLetter: vi.fn(),
      bulkRetryDeadLetters: vi.fn(),
      getDeadLetterStats: vi.fn(),
      getDeadLetterHistory: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createDeadLetterService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getDeadLetters).toBeInstanceOf(Function);
    expect(service.getDeadLetterById).toBeInstanceOf(Function);
    expect(service.createDeadLetter).toBeInstanceOf(Function);
    expect(service.retryDeadLetter).toBeInstanceOf(Function);
    expect(service.deleteDeadLetter).toBeInstanceOf(Function);
    expect(service.bulkRetryDeadLetters).toBeInstanceOf(Function);
    expect(service.getDeadLetterStats).toBeInstanceOf(Function);
    expect(service.getDeadLetterHistory).toBeInstanceOf(Function);
  });

  describe('getDeadLetters', () => {
    it('should return dead letters list', async () => {
      mockRepository.getDeadLetters.mockResolvedValue([{ id: 'dl-1', queue: 'webhook-delivery', status: 'pending' }]);
      const service = createDeadLetterService(mockRepository);
      const result = await service.getDeadLetters('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return dead letters with filters', async () => {
      mockRepository.getDeadLetters.mockResolvedValue([{ id: 'dl-1' }]);
      const service = createDeadLetterService(mockRepository);
      await service.getDeadLetters('school-1', { status: 'pending' });
      expect(mockRepository.getDeadLetters).toHaveBeenCalledWith('school-1', { status: 'pending' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createDeadLetterService(mockRepository);
      await expect(service.getDeadLetters('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getDeadLetters.mockResolvedValue([]);
      const service = createDeadLetterService(mockRepository);
      const result = await service.getDeadLetters('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated dead letters', async () => {
      mockRepository.getDeadLetters.mockResolvedValue({ data: [{ id: 'dl-1' }], total: 100 });
      const service = createDeadLetterService(mockRepository);
      const result = await service.getDeadLetters('school-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by queue', async () => {
      mockRepository.getDeadLetters.mockResolvedValue([{ id: 'dl-1', queue: 'email-sending' }]);
      const service = createDeadLetterService(mockRepository);
      const result = await service.getDeadLetters('school-1', { queue: 'email-sending' });
      expect(result).toHaveLength(1);
    });

    it('should filter by error type', async () => {
      mockRepository.getDeadLetters.mockResolvedValue([{ id: 'dl-1', errorType: 'timeout' }]);
      const service = createDeadLetterService(mockRepository);
      const result = await service.getDeadLetters('school-1', { errorType: 'timeout' });
      expect(result).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getDeadLetters.mockRejectedValue(new Error('DB error'));
      const service = createDeadLetterService(mockRepository);
      await expect(service.getDeadLetters('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getDeadLetterById', () => {
    it('should return a single dead letter', async () => {
      mockRepository.getDeadLetterById.mockResolvedValue({ id: 'dl-1', queue: 'webhook-delivery', status: 'pending' });
      const service = createDeadLetterService(mockRepository);
      const result = await service.getDeadLetterById('dl-1');
      expect(result.id).toBe('dl-1');
    });

    it('should throw if dead letter not found', async () => {
      mockRepository.getDeadLetterById.mockResolvedValue(null);
      const service = createDeadLetterService(mockRepository);
      await expect(service.getDeadLetterById('nonexistent')).rejects.toThrow('Dead letter not found');
    });

    it('should throw if id is missing', async () => {
      const service = createDeadLetterService(mockRepository);
      await expect(service.getDeadLetterById('')).rejects.toThrow('Dead letter ID is required');
    });

    it('should return dead letter with payload', async () => {
      mockRepository.getDeadLetterById.mockResolvedValue({ id: 'dl-1', payload: { documentId: 'doc-1', action: 'process' } });
      const service = createDeadLetterService(mockRepository);
      const result = await service.getDeadLetterById('dl-1');
      expect(result.payload.documentId).toBe('doc-1');
    });

    it('should return dead letter with error details', async () => {
      mockRepository.getDeadLetterById.mockResolvedValue({ id: 'dl-1', error: 'Connection timeout', errorStack: 'at process...', retryCount: 3 });
      const service = createDeadLetterService(mockRepository);
      const result = await service.getDeadLetterById('dl-1');
      expect(result.error).toBe('Connection timeout');
      expect(result.retryCount).toBe(3);
    });

    it('should handle repository errors', async () => {
      mockRepository.getDeadLetterById.mockRejectedValue(new Error('Query timeout'));
      const service = createDeadLetterService(mockRepository);
      await expect(service.getDeadLetterById('dl-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createDeadLetter', () => {
    it('should create a dead letter', async () => {
      mockRepository.createDeadLetter.mockResolvedValue({ id: 'dl-1', queue: 'webhook-delivery', status: 'pending' });
      const service = createDeadLetterService(mockRepository);
      const result = await service.createDeadLetter({ schoolId: 'school-1', queue: 'webhook-delivery', payload: { documentId: 'doc-1' }, error: 'Timeout' });
      expect(result.id).toBe('dl-1');
    });

    it('should throw if schoolId is missing', async () => {
      const service = createDeadLetterService(mockRepository);
      await expect(service.createDeadLetter({ queue: 'test', payload: {}, error: 'err' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if queue is missing', async () => {
      const service = createDeadLetterService(mockRepository);
      await expect(service.createDeadLetter({ schoolId: 'school-1', payload: {}, error: 'err' })).rejects.toThrow('Queue is required');
    });

    it('should throw if payload is missing', async () => {
      const service = createDeadLetterService(mockRepository);
      await expect(service.createDeadLetter({ schoolId: 'school-1', queue: 'test', error: 'err' })).rejects.toThrow('Payload is required');
    });

    it('should throw if error is missing', async () => {
      const service = createDeadLetterService(mockRepository);
      await expect(service.createDeadLetter({ schoolId: 'school-1', queue: 'test', payload: {} })).rejects.toThrow('Error message is required');
    });

    it('should create dead letter with error type', async () => {
      mockRepository.createDeadLetter.mockResolvedValue({ id: 'dl-1', errorType: 'timeout' });
      const service = createDeadLetterService(mockRepository);
      const result = await service.createDeadLetter({ schoolId: 'school-1', queue: 'test', payload: {}, error: 'Timeout', errorType: 'timeout' });
      expect(result.errorType).toBe('timeout');
    });

    it('should handle creation failure', async () => {
      mockRepository.createDeadLetter.mockRejectedValue(new Error('Queue not found'));
      const service = createDeadLetterService(mockRepository);
      await expect(service.createDeadLetter({ schoolId: 'school-1', queue: 'test', payload: {}, error: 'err' })).rejects.toThrow('Queue not found');
    });
  });

  describe('retryDeadLetter', () => {
    it('should retry a dead letter', async () => {
      mockRepository.retryDeadLetter.mockResolvedValue({ deadLetterId: 'dl-1', status: 'retrying', retryCount: 1 });
      const service = createDeadLetterService(mockRepository);
      const result = await service.retryDeadLetter('dl-1', 'user-1');
      expect(result.status).toBe('retrying');
    });

    it('should throw if deadLetterId is missing', async () => {
      const service = createDeadLetterService(mockRepository);
      await expect(service.retryDeadLetter('', 'user-1')).rejects.toThrow('Dead letter ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createDeadLetterService(mockRepository);
      await expect(service.retryDeadLetter('dl-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle retry failure', async () => {
      mockRepository.retryDeadLetter.mockRejectedValue(new Error('Max retries exceeded'));
      const service = createDeadLetterService(mockRepository);
      await expect(service.retryDeadLetter('dl-1', 'user-1')).rejects.toThrow('Max retries exceeded');
    });

    it('should return retry details', async () => {
      mockRepository.retryDeadLetter.mockResolvedValue({ deadLetterId: 'dl-1', status: 'retrying', retryCount: 2, maxRetries: 5 });
      const service = createDeadLetterService(mockRepository);
      const result = await service.retryDeadLetter('dl-1', 'user-1');
      expect(result.retryCount).toBe(2);
    });

    it('should handle already completed', async () => {
      mockRepository.retryDeadLetter.mockResolvedValue({ status: 'already_completed' });
      const service = createDeadLetterService(mockRepository);
      const result = await service.retryDeadLetter('dl-1', 'user-1');
      expect(result.status).toBe('already_completed');
    });
  });

  describe('deleteDeadLetter', () => {
    it('should delete a dead letter', async () => {
      mockRepository.deleteDeadLetter.mockResolvedValue({ success: true });
      const service = createDeadLetterService(mockRepository);
      await service.deleteDeadLetter('dl-1', 'user-1');
      expect(mockRepository.deleteDeadLetter).toHaveBeenCalledWith('dl-1');
    });

    it('should throw if deadLetterId is missing', async () => {
      const service = createDeadLetterService(mockRepository);
      await expect(service.deleteDeadLetter('', 'user-1')).rejects.toThrow('Dead letter ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createDeadLetterService(mockRepository);
      await expect(service.deleteDeadLetter('dl-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle deletion failure', async () => {
      mockRepository.deleteDeadLetter.mockRejectedValue(new Error('Cannot delete'));
      const service = createDeadLetterService(mockRepository);
      await expect(service.deleteDeadLetter('dl-1', 'user-1')).rejects.toThrow('Cannot delete');
    });
  });

  describe('bulkRetryDeadLetters', () => {
    it('should bulk retry dead letters', async () => {
      mockRepository.bulkRetryDeadLetters.mockResolvedValue({ retriedCount: 10, failedCount: 2 });
      const service = createDeadLetterService(mockRepository);
      const result = await service.bulkRetryDeadLetters('school-1', 'user-1', { status: 'pending' });
      expect(result.retriedCount).toBe(10);
    });

    it('should throw if schoolId is missing', async () => {
      const service = createDeadLetterService(mockRepository);
      await expect(service.bulkRetryDeadLetters('', 'user-1', {})).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createDeadLetterService(mockRepository);
      await expect(service.bulkRetryDeadLetters('school-1', '', {})).rejects.toThrow('userId is required');
    });

    it('should handle bulk retry failure', async () => {
      mockRepository.bulkRetryDeadLetters.mockRejectedValue(new Error('Bulk retry failed'));
      const service = createDeadLetterService(mockRepository);
      await expect(service.bulkRetryDeadLetters('school-1', 'user-1', {})).rejects.toThrow('Bulk retry failed');
    });

    it('should return bulk retry details', async () => {
      mockRepository.bulkRetryDeadLetters.mockResolvedValue({ retriedCount: 5, failedCount: 1, totalProcessed: 6 });
      const service = createDeadLetterService(mockRepository);
      const result = await service.bulkRetryDeadLetters('school-1', 'user-1', { status: 'pending' });
      expect(result.totalProcessed).toBe(6);
    });
  });

  describe('getDeadLetterStats', () => {
    it('should return dead letter stats', async () => {
      mockRepository.getDeadLetterStats.mockResolvedValue({ totalDeadLetters: 100, pendingRetries: 20, successfulRetries: 70, failedRetries: 10 });
      const service = createDeadLetterService(mockRepository);
      const result = await service.getDeadLetterStats('school-1');
      expect(result.totalDeadLetters).toBe(100);
    });

    it('should return stats with filters', async () => {
      mockRepository.getDeadLetterStats.mockResolvedValue({ stats: {} });
      const service = createDeadLetterService(mockRepository);
      await service.getDeadLetterStats('school-1', { since: '2024-01-01' });
      expect(mockRepository.getDeadLetterStats).toHaveBeenCalledWith('school-1', { since: '2024-01-01' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createDeadLetterService(mockRepository);
      await expect(service.getDeadLetterStats('')).rejects.toThrow('schoolId is required');
    });

    it('should return zero stats', async () => {
      mockRepository.getDeadLetterStats.mockResolvedValue({ totalDeadLetters: 0 });
      const service = createDeadLetterService(mockRepository);
      const result = await service.getDeadLetterStats('school-1');
      expect(result.totalDeadLetters).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getDeadLetterStats.mockRejectedValue(new Error('DB error'));
      const service = createDeadLetterService(mockRepository);
      await expect(service.getDeadLetterStats('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getDeadLetterHistory', () => {
    it('should return dead letter history', async () => {
      mockRepository.getDeadLetterHistory.mockResolvedValue([{ action: 'created', userId: 'user-1', timestamp: '2024-01-01' }]);
      const service = createDeadLetterService(mockRepository);
      const result = await service.getDeadLetterHistory('dl-1');
      expect(result).toHaveLength(1);
    });

    it('should throw if deadLetterId is missing', async () => {
      const service = createDeadLetterService(mockRepository);
      await expect(service.getDeadLetterHistory('')).rejects.toThrow('Dead letter ID is required');
    });

    it('should return paginated history', async () => {
      mockRepository.getDeadLetterHistory.mockResolvedValue({ data: [{ action: 'created' }], total: 10 });
      const service = createDeadLetterService(mockRepository);
      const result = await service.getDeadLetterHistory('dl-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should return empty history', async () => {
      mockRepository.getDeadLetterHistory.mockResolvedValue([]);
      const service = createDeadLetterService(mockRepository);
      const result = await service.getDeadLetterHistory('dl-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getDeadLetterHistory.mockRejectedValue(new Error('DB error'));
      const service = createDeadLetterService(mockRepository);
      await expect(service.getDeadLetterHistory('dl-1')).rejects.toThrow('DB error');
    });
  });
});
