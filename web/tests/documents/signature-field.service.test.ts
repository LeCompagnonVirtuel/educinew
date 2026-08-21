import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createSignatureFieldService } from '../../src/features/documents/services/signature-field.service';

describe('SignatureFieldService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getSignatureFields: vi.fn(),
      createSignatureField: vi.fn(),
      updateSignatureField: vi.fn(),
      deleteSignatureField: vi.fn(),
      getSignatureFieldStats: vi.fn(),
    };
  });

  describe('creation', () => {
    it('should create a signature field service', () => {
      const service = createSignatureFieldService(mockRepository);
      expect(service).toBeDefined();
    });
  });

  describe('getSignatureFields', () => {
    it('should call repository getSignatureFields', async () => {
      mockRepository.getSignatureFields.mockResolvedValue([{ id: 'sf1', type: 'signature' }]);
      const service = createSignatureFieldService(mockRepository);
      const result = await service.getSignatureFields('doc1', 'user-1');
      expect(mockRepository.getSignatureFields).toHaveBeenCalledWith('doc1');
      expect(result).toEqual([{ id: 'sf1', type: 'signature' }]);
    });
  });

  describe('createSignatureField', () => {
    it('should call repository createSignatureField', async () => {
      mockRepository.createSignatureField.mockResolvedValue({ id: 'sf1', type: 'signature' });
      const service = createSignatureFieldService(mockRepository);
      const result = await service.createSignatureField('doc1', 'user-1', { type: 'signature' });
      expect(mockRepository.createSignatureField).toHaveBeenCalledWith('doc1', 'user-1', { type: 'signature' });
      expect(result).toEqual({ id: 'sf1', type: 'signature' });
    });
  });

  describe('updateSignatureField', () => {
    it('should call repository updateSignatureField', async () => {
      mockRepository.getSignatureFields.mockResolvedValue([{ id: 'sf1' }]);
      mockRepository.updateSignatureField.mockResolvedValue({ id: 'sf1', type: 'signature', updated: true });
      const service = createSignatureFieldService(mockRepository);
      const result = await service.updateSignatureField('doc1', 'sf1', 'user-1', { type: 'signature' });
      expect(mockRepository.updateSignatureField).toHaveBeenCalledWith('sf1', 'user-1', { type: 'signature' });
      expect(result).toEqual({ id: 'sf1', type: 'signature', updated: true });
    });
  });

  describe('deleteSignatureField', () => {
    it('should call repository deleteSignatureField', async () => {
      mockRepository.getSignatureFields.mockResolvedValue([{ id: 'sf1' }]);
      mockRepository.deleteSignatureField.mockResolvedValue(undefined);
      const service = createSignatureFieldService(mockRepository);
      await service.deleteSignatureField('doc1', 'sf1', 'user-1');
      expect(mockRepository.deleteSignatureField).toHaveBeenCalledWith('sf1', 'user-1');
    });
  });

  describe('getSignatureFieldStats', () => {
    it('should call repository getSignatureFieldStats', async () => {
      mockRepository.getSignatureFieldStats.mockResolvedValue({ count: 5 });
      const service = createSignatureFieldService(mockRepository);
      const result = await service.getSignatureFieldStats('school-1', 'user-1');
      expect(mockRepository.getSignatureFieldStats).toHaveBeenCalledWith('school-1');
      expect(result).toEqual({ count: 5 });
    });
  });

  describe('error handling', () => {
    it('should throw when repository fails on getSignatureFields', async () => {
      mockRepository.getSignatureFields.mockRejectedValue(new Error('DB error'));
      const service = createSignatureFieldService(mockRepository);
      await expect(service.getSignatureFields('doc1', 'user-1')).rejects.toThrow('DB error');
    });

    it('should throw when repository fails on createSignatureField', async () => {
      mockRepository.createSignatureField.mockRejectedValue(new Error('Insert failed'));
      const service = createSignatureFieldService(mockRepository);
      await expect(service.createSignatureField('doc1', 'user-1', { type: 'sig' })).rejects.toThrow('Insert failed');
    });

    it('should throw when repository fails on updateSignatureField', async () => {
      mockRepository.getSignatureFields.mockResolvedValue([{ id: 'sf1' }]);
      mockRepository.updateSignatureField.mockRejectedValue(new Error('Update failed'));
      const service = createSignatureFieldService(mockRepository);
      await expect(service.updateSignatureField('doc1', 'sf1', 'user-1', { type: 'sig' })).rejects.toThrow('Update failed');
    });

    it('should throw when repository fails on deleteSignatureField', async () => {
      mockRepository.getSignatureFields.mockResolvedValue([{ id: 'sf1' }]);
      mockRepository.deleteSignatureField.mockRejectedValue(new Error('Delete failed'));
      const service = createSignatureFieldService(mockRepository);
      await expect(service.deleteSignatureField('doc1', 'sf1', 'user-1')).rejects.toThrow('Delete failed');
    });
  });

  describe('missing params', () => {
    it('should throw if documentId missing for getSignatureFields', async () => {
      const service = createSignatureFieldService(mockRepository);
      await expect(service.getSignatureFields('', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if userId missing for getSignatureFields', async () => {
      const service = createSignatureFieldService(mockRepository);
      await expect(service.getSignatureFields('doc1', '')).rejects.toThrow('userId is required');
    });
  });
});
