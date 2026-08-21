import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createComplianceService } from '../../src/features/documents/services/compliance.service';

describe('ComplianceService', () => {
  let mockRepository: {
    getComplianceChecks: ReturnType<typeof vi.fn>;
    runComplianceCheck: ReturnType<typeof vi.fn>;
    getCompliancePolicies: ReturnType<typeof vi.fn>;
    createCompliancePolicy: ReturnType<typeof vi.fn>;
    updateCompliancePolicy: ReturnType<typeof vi.fn>;
    deleteCompliancePolicy: ReturnType<typeof vi.fn>;
    getComplianceStats: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getComplianceChecks: vi.fn(),
      runComplianceCheck: vi.fn(),
      getCompliancePolicies: vi.fn(),
      createCompliancePolicy: vi.fn(),
      updateCompliancePolicy: vi.fn(),
      deleteCompliancePolicy: vi.fn(),
      getComplianceStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createComplianceService(mockRepository as any);
    expect(service).toBeDefined();
    expect(service.getComplianceChecks).toBeInstanceOf(Function);
    expect(service.runComplianceCheck).toBeInstanceOf(Function);
    expect(service.getCompliancePolicies).toBeInstanceOf(Function);
    expect(service.createCompliancePolicy).toBeInstanceOf(Function);
    expect(service.updateCompliancePolicy).toBeInstanceOf(Function);
    expect(service.deleteCompliancePolicy).toBeInstanceOf(Function);
    expect(service.getComplianceStats).toBeInstanceOf(Function);
  });

  describe('getComplianceChecks', () => {
    it('should return compliance checks', async () => {
      const checks = [{ id: 'cc-1', status: 'passed', documentId: 'doc-1' }];
      mockRepository.getComplianceChecks.mockResolvedValue(checks);
      const service = createComplianceService(mockRepository as any);
      const result = await service.getComplianceChecks('school-1', 'user-1');
      expect(result).toEqual(checks);
      expect(mockRepository.getComplianceChecks).toHaveBeenCalledWith('school-1');
    });

    it('should return empty list when no checks', async () => {
      mockRepository.getComplianceChecks.mockResolvedValue([]);
      const service = createComplianceService(mockRepository as any);
      const result = await service.getComplianceChecks('school-1', 'user-1');
      expect(result).toEqual([]);
    });

    it('should return multiple checks', async () => {
      mockRepository.getComplianceChecks.mockResolvedValue([{ id: 'cc-1' }, { id: 'cc-2' }]);
      const service = createComplianceService(mockRepository as any);
      const result = await service.getComplianceChecks('school-1', 'user-1');
      expect(result).toHaveLength(2);
    });

    it('should throw if schoolId missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.getComplianceChecks('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.getComplianceChecks('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.getComplianceChecks('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getComplianceChecks.mockRejectedValue(new Error('DB error'));
      const service = createComplianceService(mockRepository as any);
      await expect(service.getComplianceChecks('school-1', 'user-1')).rejects.toThrow('DB error');
    });

    it('should not swallow errors', async () => {
      mockRepository.getComplianceChecks.mockRejectedValue(new Error('Connection timeout'));
      const service = createComplianceService(mockRepository as any);
      await expect(service.getComplianceChecks('school-1', 'user-1')).rejects.toThrow('Connection timeout');
    });
  });

  describe('runComplianceCheck', () => {
    it('should run a compliance check', async () => {
      const result = { id: 'cc-1', status: 'passed', score: 95 };
      mockRepository.runComplianceCheck.mockResolvedValue(result);
      const service = createComplianceService(mockRepository as any);
      const response = await service.runComplianceCheck('doc-1', 'user-1');
      expect(response).toEqual(result);
      expect(mockRepository.runComplianceCheck).toHaveBeenCalledWith('doc-1', undefined);
    });

    it('should run with options', async () => {
      const options = { policyIds: ['pol-1', 'pol-2'] };
      mockRepository.runComplianceCheck.mockResolvedValue({ status: 'passed' });
      const service = createComplianceService(mockRepository as any);
      await service.runComplianceCheck('doc-1', 'user-1', options);
      expect(mockRepository.runComplianceCheck).toHaveBeenCalledWith('doc-1', options);
    });

    it('should throw if documentId missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.runComplianceCheck('', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.runComplianceCheck('doc-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.runComplianceCheck('', '')).rejects.toThrow('documentId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.runComplianceCheck.mockRejectedValue(new Error('Check failed'));
      const service = createComplianceService(mockRepository as any);
      await expect(service.runComplianceCheck('doc-1', 'user-1')).rejects.toThrow('Check failed');
    });
  });

  describe('getCompliancePolicies', () => {
    it('should return compliance policies', async () => {
      const policies = [{ id: 'pol-1', name: 'GDPR Policy', enabled: true }];
      mockRepository.getCompliancePolicies.mockResolvedValue(policies);
      const service = createComplianceService(mockRepository as any);
      const result = await service.getCompliancePolicies('school-1', 'user-1');
      expect(result).toEqual(policies);
      expect(mockRepository.getCompliancePolicies).toHaveBeenCalledWith('school-1');
    });

    it('should return empty list when no policies', async () => {
      mockRepository.getCompliancePolicies.mockResolvedValue([]);
      const service = createComplianceService(mockRepository as any);
      const result = await service.getCompliancePolicies('school-1', 'user-1');
      expect(result).toEqual([]);
    });

    it('should throw if schoolId missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.getCompliancePolicies('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.getCompliancePolicies('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.getCompliancePolicies('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getCompliancePolicies.mockRejectedValue(new Error('Query failed'));
      const service = createComplianceService(mockRepository as any);
      await expect(service.getCompliancePolicies('school-1', 'user-1')).rejects.toThrow('Query failed');
    });
  });

  describe('createCompliancePolicy', () => {
    it('should create a compliance policy', async () => {
      const data = { name: 'Data Retention Policy', rules: ['encrypt', 'archive'] };
      const created = { id: 'pol-1', ...data, createdBy: 'user-1' };
      mockRepository.createCompliancePolicy.mockResolvedValue(created);
      const service = createComplianceService(mockRepository as any);
      const result = await service.createCompliancePolicy('school-1', 'user-1', data);
      expect(result).toEqual(created);
      expect(mockRepository.createCompliancePolicy).toHaveBeenCalledWith({ ...data, createdBy: 'user-1' }, 'school-1');
    });

    it('should throw if schoolId missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.createCompliancePolicy('', 'user-1', { name: 'Policy' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.createCompliancePolicy('school-1', '', { name: 'Policy' })).rejects.toThrow('userId is required');
    });

    it('should throw if data missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.createCompliancePolicy('school-1', 'user-1', null as any)).rejects.toThrow('policy name is required');
    });

    it('should throw if name missing from data', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.createCompliancePolicy('school-1', 'user-1', {})).rejects.toThrow('policy name is required');
    });

    it('should throw if both schoolId and userId missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.createCompliancePolicy('', '', { name: 'Policy' })).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.createCompliancePolicy.mockRejectedValue(new Error('Create failed'));
      const service = createComplianceService(mockRepository as any);
      await expect(service.createCompliancePolicy('school-1', 'user-1', { name: 'Policy' })).rejects.toThrow('Create failed');
    });
  });

  describe('updateCompliancePolicy', () => {
    it('should update a compliance policy', async () => {
      const updated = { id: 'pol-1', name: 'Updated Policy' };
      mockRepository.updateCompliancePolicy.mockResolvedValue(updated);
      const service = createComplianceService(mockRepository as any);
      const result = await service.updateCompliancePolicy('pol-1', 'user-1', { name: 'Updated Policy' });
      expect(result).toEqual(updated);
      expect(mockRepository.updateCompliancePolicy).toHaveBeenCalledWith('pol-1', { name: 'Updated Policy' });
    });

    it('should throw if policyId missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.updateCompliancePolicy('', 'user-1', { name: 'Policy' })).rejects.toThrow('policyId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.updateCompliancePolicy('pol-1', '', { name: 'Policy' })).rejects.toThrow('userId is required');
    });

    it('should throw if data missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.updateCompliancePolicy('pol-1', 'user-1', null as any)).rejects.toThrow('update data is required');
    });

    it('should throw if both missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.updateCompliancePolicy('', '', { name: 'Policy' })).rejects.toThrow('policyId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.updateCompliancePolicy.mockRejectedValue(new Error('Update failed'));
      const service = createComplianceService(mockRepository as any);
      await expect(service.updateCompliancePolicy('pol-1', 'user-1', { name: 'Policy' })).rejects.toThrow('Update failed');
    });
  });

  describe('deleteCompliancePolicy', () => {
    it('should delete a compliance policy', async () => {
      mockRepository.deleteCompliancePolicy.mockResolvedValue(undefined);
      const service = createComplianceService(mockRepository as any);
      await service.deleteCompliancePolicy('pol-1', 'user-1');
      expect(mockRepository.deleteCompliancePolicy).toHaveBeenCalledWith('pol-1');
    });

    it('should throw if policyId missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.deleteCompliancePolicy('', 'user-1')).rejects.toThrow('policyId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.deleteCompliancePolicy('pol-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.deleteCompliancePolicy('', '')).rejects.toThrow('policyId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.deleteCompliancePolicy.mockRejectedValue(new Error('Delete failed'));
      const service = createComplianceService(mockRepository as any);
      await expect(service.deleteCompliancePolicy('pol-1', 'user-1')).rejects.toThrow('Delete failed');
    });

    it('should not swallow errors', async () => {
      mockRepository.deleteCompliancePolicy.mockRejectedValue(new Error('Permission denied'));
      const service = createComplianceService(mockRepository as any);
      await expect(service.deleteCompliancePolicy('pol-1', 'user-1')).rejects.toThrow('Permission denied');
    });
  });

  describe('getComplianceStats', () => {
    it('should return compliance stats', async () => {
      const stats = { totalChecks: 100, passed: 90, failed: 10 };
      mockRepository.getComplianceStats.mockResolvedValue(stats);
      const service = createComplianceService(mockRepository as any);
      const result = await service.getComplianceStats('school-1', 'user-1');
      expect(result).toEqual(stats);
      expect(mockRepository.getComplianceStats).toHaveBeenCalledWith('school-1', undefined, undefined);
    });

    it('should pass date parameters', async () => {
      mockRepository.getComplianceStats.mockResolvedValue({ totalChecks: 5 });
      const service = createComplianceService(mockRepository as any);
      await service.getComplianceStats('school-1', 'user-1', '2024-01-01', '2024-12-31');
      expect(mockRepository.getComplianceStats).toHaveBeenCalledWith('school-1', '2024-01-01', '2024-12-31');
    });

    it('should throw if schoolId missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.getComplianceStats('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.getComplianceStats('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createComplianceService(mockRepository as any);
      await expect(service.getComplianceStats('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getComplianceStats.mockRejectedValue(new Error('Stats query failed'));
      const service = createComplianceService(mockRepository as any);
      await expect(service.getComplianceStats('school-1', 'user-1')).rejects.toThrow('Stats query failed');
    });

    it('should not swallow errors', async () => {
      mockRepository.getComplianceStats.mockRejectedValue(new Error('ECONNREFUSED'));
      const service = createComplianceService(mockRepository as any);
      await expect(service.getComplianceStats('school-1', 'user-1')).rejects.toThrow('ECONNREFUSED');
    });
  });

  describe('method existence', () => {
    it('should have all 7 methods defined', () => {
      const service = createComplianceService(mockRepository as any);
      const methods = ['getComplianceChecks', 'runComplianceCheck', 'getCompliancePolicies', 'createCompliancePolicy', 'updateCompliancePolicy', 'deleteCompliancePolicy', 'getComplianceStats'];
      methods.forEach((method) => {
        expect(service[method as keyof typeof service]).toBeDefined();
      });
    });

    it('should return object with correct shape', () => {
      const service = createComplianceService(mockRepository as any);
      expect(Object.keys(service)).toHaveLength(7);
    });
  });
});
