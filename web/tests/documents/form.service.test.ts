import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createFormService } from '../../src/features/documents/services/form.service';

describe('FormService', () => {
  let mockRepository: {
    getFormTemplates: ReturnType<typeof vi.fn>;
    createFormTemplate: ReturnType<typeof vi.fn>;
    updateFormTemplate: ReturnType<typeof vi.fn>;
    deleteFormTemplate: ReturnType<typeof vi.fn>;
    getFormInstances: ReturnType<typeof vi.fn>;
    createFormInstance: ReturnType<typeof vi.fn>;
    submitFormInstance: ReturnType<typeof vi.fn>;
    getFormFieldOptions: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getFormTemplates: vi.fn(),
      createFormTemplate: vi.fn(),
      updateFormTemplate: vi.fn(),
      deleteFormTemplate: vi.fn(),
      getFormInstances: vi.fn(),
      createFormInstance: vi.fn(),
      submitFormInstance: vi.fn(),
      getFormFieldOptions: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createFormService(mockRepository as any);
    expect(service).toBeDefined();
    expect(service.getFormTemplates).toBeInstanceOf(Function);
    expect(service.createFormTemplate).toBeInstanceOf(Function);
    expect(service.updateFormTemplate).toBeInstanceOf(Function);
    expect(service.deleteFormTemplate).toBeInstanceOf(Function);
    expect(service.getFormInstances).toBeInstanceOf(Function);
    expect(service.createFormInstance).toBeInstanceOf(Function);
    expect(service.submitFormInstance).toBeInstanceOf(Function);
    expect(service.getFormFieldOptions).toBeInstanceOf(Function);
  });

  describe('getFormTemplates', () => {
    it('should return form templates', async () => {
      const templates = [{ id: 'ft-1', name: 'Student Enrollment' }];
      mockRepository.getFormTemplates.mockResolvedValue(templates);
      const service = createFormService(mockRepository as any);
      const result = await service.getFormTemplates('school-1', 'user-1');
      expect(result).toEqual(templates);
      expect(mockRepository.getFormTemplates).toHaveBeenCalledWith('school-1');
    });

    it('should return empty list when no templates', async () => {
      mockRepository.getFormTemplates.mockResolvedValue([]);
      const service = createFormService(mockRepository as any);
      const result = await service.getFormTemplates('school-1', 'user-1');
      expect(result).toEqual([]);
    });

    it('should return multiple templates', async () => {
      mockRepository.getFormTemplates.mockResolvedValue([{ id: 'ft-1' }, { id: 'ft-2' }]);
      const service = createFormService(mockRepository as any);
      const result = await service.getFormTemplates('school-1', 'user-1');
      expect(result).toHaveLength(2);
    });

    it('should throw if schoolId missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.getFormTemplates('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.getFormTemplates('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getFormTemplates.mockRejectedValue(new Error('DB error'));
      const service = createFormService(mockRepository as any);
      await expect(service.getFormTemplates('school-1', 'user-1')).rejects.toThrow('DB error');
    });
  });

  describe('createFormTemplate', () => {
    it('should create a form template', async () => {
      const data = { name: 'Feedback Form', fields: ['rating', 'comments'] };
      const created = { id: 'ft-1', ...data, createdBy: 'user-1' };
      mockRepository.createFormTemplate.mockResolvedValue(created);
      const service = createFormService(mockRepository as any);
      const result = await service.createFormTemplate('school-1', 'user-1', data);
      expect(result).toEqual(created);
      expect(mockRepository.createFormTemplate).toHaveBeenCalledWith({ ...data, createdBy: 'user-1' }, 'school-1');
    });

    it('should throw if schoolId missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.createFormTemplate('', 'user-1', { name: 'Form' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.createFormTemplate('school-1', '', { name: 'Form' })).rejects.toThrow('userId is required');
    });

    it('should throw if data missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.createFormTemplate('school-1', 'user-1', null as any)).rejects.toThrow('template name is required');
    });

    it('should throw if name missing from data', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.createFormTemplate('school-1', 'user-1', {})).rejects.toThrow('template name is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.createFormTemplate.mockRejectedValue(new Error('Create failed'));
      const service = createFormService(mockRepository as any);
      await expect(service.createFormTemplate('school-1', 'user-1', { name: 'Form' })).rejects.toThrow('Create failed');
    });
  });

  describe('updateFormTemplate', () => {
    it('should update a form template', async () => {
      const updated = { id: 'ft-1', name: 'Updated Form' };
      mockRepository.updateFormTemplate.mockResolvedValue(updated);
      const service = createFormService(mockRepository as any);
      const result = await service.updateFormTemplate('ft-1', 'user-1', { name: 'Updated Form' });
      expect(result).toEqual(updated);
      expect(mockRepository.updateFormTemplate).toHaveBeenCalledWith('ft-1', { name: 'Updated Form' });
    });

    it('should throw if templateId missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.updateFormTemplate('', 'user-1', { name: 'Form' })).rejects.toThrow('templateId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.updateFormTemplate('ft-1', '', { name: 'Form' })).rejects.toThrow('userId is required');
    });

    it('should throw if data missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.updateFormTemplate('ft-1', 'user-1', null as any)).rejects.toThrow('update data is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.updateFormTemplate.mockRejectedValue(new Error('Update failed'));
      const service = createFormService(mockRepository as any);
      await expect(service.updateFormTemplate('ft-1', 'user-1', { name: 'Form' })).rejects.toThrow('Update failed');
    });
  });

  describe('deleteFormTemplate', () => {
    it('should delete a form template', async () => {
      mockRepository.deleteFormTemplate.mockResolvedValue(undefined);
      const service = createFormService(mockRepository as any);
      await service.deleteFormTemplate('ft-1', 'user-1');
      expect(mockRepository.deleteFormTemplate).toHaveBeenCalledWith('ft-1');
    });

    it('should throw if templateId missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.deleteFormTemplate('', 'user-1')).rejects.toThrow('templateId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.deleteFormTemplate('ft-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.deleteFormTemplate.mockRejectedValue(new Error('Delete failed'));
      const service = createFormService(mockRepository as any);
      await expect(service.deleteFormTemplate('ft-1', 'user-1')).rejects.toThrow('Delete failed');
    });
  });

  describe('getFormInstances', () => {
    it('should return form instances', async () => {
      const instances = [{ id: 'fi-1', status: 'submitted' }];
      mockRepository.getFormInstances.mockResolvedValue(instances);
      const service = createFormService(mockRepository as any);
      const result = await service.getFormInstances('school-1', 'user-1');
      expect(result).toEqual(instances);
      expect(mockRepository.getFormInstances).toHaveBeenCalledWith('school-1');
    });

    it('should return form instances with template filter', async () => {
      mockRepository.getFormInstances.mockResolvedValue([]);
      const service = createFormService(mockRepository as any);
      await service.getFormInstances('school-1', 'user-1', 'ft-1');
      expect(mockRepository.getFormInstances).toHaveBeenCalledWith('school-1');
    });

    it('should throw if schoolId missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.getFormInstances('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.getFormInstances('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getFormInstances.mockRejectedValue(new Error('Query failed'));
      const service = createFormService(mockRepository as any);
      await expect(service.getFormInstances('school-1', 'user-1')).rejects.toThrow('Query failed');
    });
  });

  describe('createFormInstance', () => {
    it('should create a form instance', async () => {
      const data = { templateId: 'ft-1', responses: { rating: 5 } };
      const created = { id: 'fi-1', ...data };
      mockRepository.createFormInstance.mockResolvedValue(created);
      const service = createFormService(mockRepository as any);
      const result = await service.createFormInstance('school-1', 'user-1', data);
      expect(result).toEqual(created);
      expect(mockRepository.createFormInstance).toHaveBeenCalledWith('ft-1', 'school-1', { ...data, createdBy: 'user-1' });
    });

    it('should throw if schoolId missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.createFormInstance('', 'user-1', { templateId: 'ft-1' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.createFormInstance('school-1', '', { templateId: 'ft-1' })).rejects.toThrow('userId is required');
    });

    it('should throw if data missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.createFormInstance('school-1', 'user-1', null as any)).rejects.toThrow('templateId is required');
    });

    it('should throw if templateId missing from data', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.createFormInstance('school-1', 'user-1', {})).rejects.toThrow('templateId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.createFormInstance.mockRejectedValue(new Error('Create failed'));
      const service = createFormService(mockRepository as any);
      await expect(service.createFormInstance('school-1', 'user-1', { templateId: 'ft-1' })).rejects.toThrow('Create failed');
    });
  });

  describe('submitFormInstance', () => {
    it('should submit a form instance', async () => {
      const data = { responses: { rating: 5, comments: 'Great' } };
      const result = { id: 'fi-1', status: 'submitted' };
      mockRepository.submitFormInstance.mockResolvedValue(result);
      const service = createFormService(mockRepository as any);
      const response = await service.submitFormInstance('fi-1', 'user-1', data);
      expect(response).toEqual(result);
      expect(mockRepository.submitFormInstance).toHaveBeenCalledWith('fi-1');
    });

    it('should throw if instanceId missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.submitFormInstance('', 'user-1', { responses: {} })).rejects.toThrow('instanceId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.submitFormInstance('fi-1', '', { responses: {} })).rejects.toThrow('userId is required');
    });

    it('should throw if data missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.submitFormInstance('fi-1', 'user-1', null as any)).rejects.toThrow('submission data is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.submitFormInstance.mockRejectedValue(new Error('Submit failed'));
      const service = createFormService(mockRepository as any);
      await expect(service.submitFormInstance('fi-1', 'user-1', { responses: {} })).rejects.toThrow('Submit failed');
    });
  });

  describe('getFormFieldOptions', () => {
    it('should return form field options', async () => {
      const options = [{ value: 'excellent', label: 'Excellent' }];
      mockRepository.getFormFieldOptions.mockResolvedValue(options);
      const service = createFormService(mockRepository as any);
      const result = await service.getFormFieldOptions('ft-1', 'user-1', 'field-1');
      expect(result).toEqual(options);
      expect(mockRepository.getFormFieldOptions).toHaveBeenCalledWith('ft-1');
    });

    it('should throw if templateId missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.getFormFieldOptions('', 'user-1', 'field-1')).rejects.toThrow('templateId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.getFormFieldOptions('ft-1', '', 'field-1')).rejects.toThrow('userId is required');
    });

    it('should throw if fieldId missing', async () => {
      const service = createFormService(mockRepository as any);
      await expect(service.getFormFieldOptions('ft-1', 'user-1', '')).rejects.toThrow('fieldId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getFormFieldOptions.mockRejectedValue(new Error('Options query failed'));
      const service = createFormService(mockRepository as any);
      await expect(service.getFormFieldOptions('ft-1', 'user-1', 'field-1')).rejects.toThrow('Options query failed');
    });
  });

  describe('method existence', () => {
    it('should have all 8 methods defined', () => {
      const service = createFormService(mockRepository as any);
      const methods = ['getFormTemplates', 'createFormTemplate', 'updateFormTemplate', 'deleteFormTemplate', 'getFormInstances', 'createFormInstance', 'submitFormInstance', 'getFormFieldOptions'];
      methods.forEach((method) => {
        expect(service[method as keyof typeof service]).toBeDefined();
      });
    });

    it('should return object with correct shape', () => {
      const service = createFormService(mockRepository as any);
      expect(Object.keys(service)).toHaveLength(8);
    });

    it('should pass correct arguments to getFormTemplates', async () => {
      mockRepository.getFormTemplates.mockResolvedValue([]);
      const service = createFormService(mockRepository as any);
      await service.getFormTemplates('school-1', 'user-1');
      expect(mockRepository.getFormTemplates).toHaveBeenCalledWith('school-1');
    });

    it('should pass correct arguments to createFormTemplate', async () => {
      mockRepository.createFormTemplate.mockResolvedValue({ id: 'ft-1' });
      const service = createFormService(mockRepository as any);
      await service.createFormTemplate('school-1', 'user-1', { name: 'Form' });
      expect(mockRepository.createFormTemplate).toHaveBeenCalledWith({ name: 'Form', createdBy: 'user-1' }, 'school-1');
    });

    it('should pass correct arguments to deleteFormTemplate', async () => {
      mockRepository.deleteFormTemplate.mockResolvedValue(undefined);
      const service = createFormService(mockRepository as any);
      await service.deleteFormTemplate('ft-1', 'user-1');
      expect(mockRepository.deleteFormTemplate).toHaveBeenCalledWith('ft-1');
    });
  });
});
