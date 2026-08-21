import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createCustomFieldService } from '../../src/features/documents/services/custom-field.service';

describe('CustomFieldService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getCustomFields: vi.fn(),
      createCustomField: vi.fn(),
      updateCustomField: vi.fn(),
      deleteCustomField: vi.fn(),
      getCustomFieldStats: vi.fn(),
    };
  });

  describe('creation', () => {
    it('should create a custom field service', () => {
      const service = createCustomFieldService(mockRepository);
      expect(service).toBeDefined();
    });
  });

  describe('getCustomFields', () => {
    it('should call repository getCustomFields', async () => {
      mockRepository.getCustomFields.mockResolvedValue([{ id: 'cf1', name: 'field1' }]);
      const service = createCustomFieldService(mockRepository);
      const result = await service.getCustomFields('doc1', 'user-1');
      expect(mockRepository.getCustomFields).toHaveBeenCalledWith('doc1');
      expect(result).toEqual([{ id: 'cf1', name: 'field1' }]);
    });
  });

  describe('createCustomField', () => {
    it('should call repository createCustomField', async () => {
      mockRepository.createCustomField.mockResolvedValue({ id: 'cf1', name: 'field1' });
      const service = createCustomFieldService(mockRepository);
      const result = await service.createCustomField('doc1', 'user-1', { name: 'field1' });
      expect(mockRepository.createCustomField).toHaveBeenCalledWith('doc1', 'user-1', { name: 'field1' });
      expect(result).toEqual({ id: 'cf1', name: 'field1' });
    });
  });

  describe('updateCustomField', () => {
    it('should call repository updateCustomField', async () => {
      mockRepository.getCustomFields.mockResolvedValue([{ id: 'cf1' }]);
      mockRepository.updateCustomField.mockResolvedValue({ id: 'cf1', name: 'field1', updated: true });
      const service = createCustomFieldService(mockRepository);
      const result = await service.updateCustomField('doc1', 'cf1', 'user-1', { name: 'field1' });
      expect(mockRepository.updateCustomField).toHaveBeenCalledWith('cf1', 'user-1', { name: 'field1' });
      expect(result).toEqual({ id: 'cf1', name: 'field1', updated: true });
    });
  });

  describe('deleteCustomField', () => {
    it('should call repository deleteCustomField', async () => {
      mockRepository.getCustomFields.mockResolvedValue([{ id: 'cf1' }]);
      mockRepository.deleteCustomField.mockResolvedValue(undefined);
      const service = createCustomFieldService(mockRepository);
      await service.deleteCustomField('doc1', 'cf1', 'user-1');
      expect(mockRepository.deleteCustomField).toHaveBeenCalledWith('cf1', 'user-1');
    });
  });

  describe('getCustomFieldStats', () => {
    it('should call repository getCustomFieldStats', async () => {
      mockRepository.getCustomFieldStats.mockResolvedValue({ count: 7 });
      const service = createCustomFieldService(mockRepository);
      const result = await service.getCustomFieldStats('school-1', 'user-1');
      expect(mockRepository.getCustomFieldStats).toHaveBeenCalledWith('school-1');
      expect(result).toEqual({ count: 7 });
    });
  });

  describe('error handling', () => {
    it('should throw when repository fails on getCustomFields', async () => {
      mockRepository.getCustomFields.mockRejectedValue(new Error('DB error'));
      const service = createCustomFieldService(mockRepository);
      await expect(service.getCustomFields('doc1', 'user-1')).rejects.toThrow('DB error');
    });

    it('should throw when repository fails on createCustomField', async () => {
      mockRepository.createCustomField.mockRejectedValue(new Error('Insert failed'));
      const service = createCustomFieldService(mockRepository);
      await expect(service.createCustomField('doc1', 'user-1', { name: 'field' })).rejects.toThrow('Insert failed');
    });

    it('should throw when repository fails on updateCustomField', async () => {
      mockRepository.getCustomFields.mockResolvedValue([{ id: 'cf1' }]);
      mockRepository.updateCustomField.mockRejectedValue(new Error('Update failed'));
      const service = createCustomFieldService(mockRepository);
      await expect(service.updateCustomField('doc1', 'cf1', 'user-1', { name: 'field' })).rejects.toThrow('Update failed');
    });

    it('should throw when repository fails on deleteCustomField', async () => {
      mockRepository.getCustomFields.mockResolvedValue([{ id: 'cf1' }]);
      mockRepository.deleteCustomField.mockRejectedValue(new Error('Delete failed'));
      const service = createCustomFieldService(mockRepository);
      await expect(service.deleteCustomField('doc1', 'cf1', 'user-1')).rejects.toThrow('Delete failed');
    });
  });

  describe('missing params', () => {
    it('should throw if documentId missing for getCustomFields', async () => {
      const service = createCustomFieldService(mockRepository);
      await expect(service.getCustomFields('', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if userId missing for getCustomFields', async () => {
      const service = createCustomFieldService(mockRepository);
      await expect(service.getCustomFields('doc1', '')).rejects.toThrow('userId is required');
    });
  });
});
