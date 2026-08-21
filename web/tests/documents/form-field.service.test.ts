import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createFormFieldService } from '../../src/features/documents/services/form-field.service';

describe('FormFieldService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getFormFields: vi.fn(),
      createFormField: vi.fn(),
      updateFormField: vi.fn(),
      deleteFormField: vi.fn(),
      getFormFieldStats: vi.fn(),
    };
  });

  describe('creation', () => {
    it('should create a form field service', () => {
      const service = createFormFieldService(mockRepository);
      expect(service).toBeDefined();
    });
  });

  describe('getFormFields', () => {
    it('should call repository getFormFields', async () => {
      mockRepository.getFormFields.mockResolvedValue([{ id: 'ff1', type: 'text' }]);
      const service = createFormFieldService(mockRepository);
      const result = await service.getFormFields('doc1', 'user-1');
      expect(mockRepository.getFormFields).toHaveBeenCalledWith('doc1');
      expect(result).toEqual([{ id: 'ff1', type: 'text' }]);
    });
  });

  describe('createFormField', () => {
    it('should call repository createFormField', async () => {
      mockRepository.createFormField.mockResolvedValue({ id: 'ff1', type: 'text' });
      const service = createFormFieldService(mockRepository);
      const result = await service.createFormField('doc1', 'user-1', { type: 'text' });
      expect(mockRepository.createFormField).toHaveBeenCalledWith('doc1', 'user-1', { type: 'text' });
      expect(result).toEqual({ id: 'ff1', type: 'text' });
    });
  });

  describe('updateFormField', () => {
    it('should call repository updateFormField', async () => {
      mockRepository.getFormFields.mockResolvedValue([{ id: 'ff1' }]);
      mockRepository.updateFormField.mockResolvedValue({ id: 'ff1', type: 'text', updated: true });
      const service = createFormFieldService(mockRepository);
      const result = await service.updateFormField('doc1', 'ff1', 'user-1', { type: 'text' });
      expect(mockRepository.updateFormField).toHaveBeenCalledWith('ff1', 'user-1', { type: 'text' });
      expect(result).toEqual({ id: 'ff1', type: 'text', updated: true });
    });
  });

  describe('deleteFormField', () => {
    it('should call repository deleteFormField', async () => {
      mockRepository.getFormFields.mockResolvedValue([{ id: 'ff1' }]);
      mockRepository.deleteFormField.mockResolvedValue(undefined);
      const service = createFormFieldService(mockRepository);
      await service.deleteFormField('doc1', 'ff1', 'user-1');
      expect(mockRepository.deleteFormField).toHaveBeenCalledWith('ff1', 'user-1');
    });
  });

  describe('getFormFieldStats', () => {
    it('should call repository getFormFieldStats', async () => {
      mockRepository.getFormFieldStats.mockResolvedValue({ count: 3 });
      const service = createFormFieldService(mockRepository);
      const result = await service.getFormFieldStats('school-1', 'user-1');
      expect(mockRepository.getFormFieldStats).toHaveBeenCalledWith('school-1');
      expect(result).toEqual({ count: 3 });
    });
  });

  describe('error handling', () => {
    it('should throw when repository fails on getFormFields', async () => {
      mockRepository.getFormFields.mockRejectedValue(new Error('DB error'));
      const service = createFormFieldService(mockRepository);
      await expect(service.getFormFields('doc1', 'user-1')).rejects.toThrow('DB error');
    });

    it('should throw when repository fails on createFormField', async () => {
      mockRepository.createFormField.mockRejectedValue(new Error('Insert failed'));
      const service = createFormFieldService(mockRepository);
      await expect(service.createFormField('doc1', 'user-1', { type: 'text' })).rejects.toThrow('Insert failed');
    });

    it('should throw when repository fails on updateFormField', async () => {
      mockRepository.getFormFields.mockResolvedValue([{ id: 'ff1' }]);
      mockRepository.updateFormField.mockRejectedValue(new Error('Update failed'));
      const service = createFormFieldService(mockRepository);
      await expect(service.updateFormField('doc1', 'ff1', 'user-1', { type: 'text' })).rejects.toThrow('Update failed');
    });

    it('should throw when repository fails on deleteFormField', async () => {
      mockRepository.getFormFields.mockResolvedValue([{ id: 'ff1' }]);
      mockRepository.deleteFormField.mockRejectedValue(new Error('Delete failed'));
      const service = createFormFieldService(mockRepository);
      await expect(service.deleteFormField('doc1', 'ff1', 'user-1')).rejects.toThrow('Delete failed');
    });
  });

  describe('missing params', () => {
    it('should throw if documentId missing for getFormFields', async () => {
      const service = createFormFieldService(mockRepository);
      await expect(service.getFormFields('', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if userId missing for getFormFields', async () => {
      const service = createFormFieldService(mockRepository);
      await expect(service.getFormFields('doc1', '')).rejects.toThrow('userId is required');
    });
  });
});
