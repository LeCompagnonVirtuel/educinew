import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTimestampService } from '../../src/features/documents/services/timestamp.service';

describe('TimestampService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getDocument: vi.fn(),
    };
  });

  describe('creation', () => {
    it('should create a timestamp service', () => {
      const service = createTimestampService(mockRepository);
      expect(service).toBeDefined();
    });
  });

  describe('createTimestamp', () => {
    it('should create a timestamp', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc1' });
      const service = createTimestampService(mockRepository);
      const result = await service.createTimestamp('doc1', 'user-1', { type: 'standard' });
      expect(mockRepository.getDocument).toHaveBeenCalledWith('doc1');
      expect(result).toBeDefined();
      expect(result.documentId).toBe('doc1');
    });
  });

  describe('getTimestamps', () => {
    it('should return timestamps for a document', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc1' });
      const service = createTimestampService(mockRepository);
      const result = await service.getTimestamps('doc1', 'user-1');
      expect(mockRepository.getDocument).toHaveBeenCalledWith('doc1');
      expect(result).toBeDefined();
    });
  });

  describe('validateTimestamp', () => {
    it('should validate a timestamp', async () => {
      const service = createTimestampService(mockRepository);
      const result = await service.validateTimestamp('ts-1', 'user-1');
      expect(result).toEqual({ valid: true });
    });
  });

  describe('getTimestampStats', () => {
    it('should return stats', async () => {
      const service = createTimestampService(mockRepository);
      const result = await service.getTimestampStats('school-1', 'user-1');
      expect(result).toBeDefined();
      expect(result.totalTimestamps).toBe(0);
    });
  });

  describe('error handling', () => {
    it('should throw when repository fails on createTimestamp', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('DB error'));
      const service = createTimestampService(mockRepository);
      await expect(service.createTimestamp('doc1', 'user-1', {})).rejects.toThrow('DB error');
    });

    it('should throw when repository fails on getTimestamps', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Fetch failed'));
      const service = createTimestampService(mockRepository);
      await expect(service.getTimestamps('doc1', 'user-1')).rejects.toThrow('Fetch failed');
    });
  });

  describe('missing params', () => {
    it('should throw if documentId missing for createTimestamp', async () => {
      const service = createTimestampService(mockRepository);
      await expect(service.createTimestamp('', 'user-1', {})).rejects.toThrow('documentId is required');
    });

    it('should throw if userId missing for createTimestamp', async () => {
      const service = createTimestampService(mockRepository);
      await expect(service.createTimestamp('doc1', '', {})).rejects.toThrow('userId is required');
    });

    it('should throw if documentId missing for getTimestamps', async () => {
      const service = createTimestampService(mockRepository);
      await expect(service.getTimestamps('', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if schoolId missing for getTimestampStats', async () => {
      const service = createTimestampService(mockRepository);
      await expect(service.getTimestampStats('', 'user-1')).rejects.toThrow('schoolId is required');
    });
  });
});
