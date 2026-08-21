import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createApprovalService } from '../../src/features/documents/services/approval.service';

describe('ApprovalService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getApprovals: vi.fn(),
      getApproval: vi.fn(),
      createApprovalWorkflow: vi.fn(),
      updateApprovalWorkflow: vi.fn(),
      deleteApprovalWorkflow: vi.fn(),
      approveStep: vi.fn(),
      rejectStep: vi.fn(),
      getWorkflowStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createApprovalService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getApprovals).toBeInstanceOf(Function);
    expect(service.getApproval).toBeInstanceOf(Function);
    expect(service.createApprovalWorkflow).toBeInstanceOf(Function);
    expect(service.updateApprovalWorkflow).toBeInstanceOf(Function);
    expect(service.deleteApprovalWorkflow).toBeInstanceOf(Function);
    expect(service.approveStep).toBeInstanceOf(Function);
    expect(service.rejectStep).toBeInstanceOf(Function);
    expect(service.getApprovalStats).toBeInstanceOf(Function);
  });

  describe('getApprovals', () => {
    it('should return approvals list', async () => {
      const approvals = [{ id: 'appr-1', status: 'pending' }];
      mockRepository.getApprovals.mockResolvedValue(approvals);
      const service = createApprovalService(mockRepository);
      const result = await service.getApprovals('school-1', 'user-1');
      expect(result).toEqual(approvals);
      expect(mockRepository.getApprovals).toHaveBeenCalledWith('school-1');
    });
  });

  describe('getApproval', () => {
    it('should return a single approval', async () => {
      const approval = { id: 'appr-1', status: 'approved' };
      mockRepository.getApproval.mockResolvedValue(approval);
      const service = createApprovalService(mockRepository);
      const result = await service.getApproval('appr-1', 'user-1');
      expect(result).toEqual(approval);
      expect(mockRepository.getApproval).toHaveBeenCalledWith('appr-1');
    });
  });

  describe('createApprovalWorkflow', () => {
    it('should create an approval workflow', async () => {
      const data = { name: 'Contract Approval', steps: ['manager', 'director'] };
      mockRepository.createApprovalWorkflow.mockResolvedValue({ id: 'wf-1', ...data });
      const service = createApprovalService(mockRepository);
      const result = await service.createApprovalWorkflow('school-1', 'user-1', data);
      expect(result).toEqual({ id: 'wf-1', ...data });
      expect(mockRepository.createApprovalWorkflow).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Contract Approval', createdBy: 'user-1' }),
        'school-1'
      );
    });
  });

  describe('updateApprovalWorkflow', () => {
    it('should update an approval workflow', async () => {
      mockRepository.getApproval.mockResolvedValue({ id: 'wf-1' });
      mockRepository.updateApprovalWorkflow.mockResolvedValue({ id: 'wf-1', name: 'Updated Approval' });
      const service = createApprovalService(mockRepository);
      const result = await service.updateApprovalWorkflow('wf-1', 'user-1', { name: 'Updated Approval' });
      expect(result).toEqual({ id: 'wf-1', name: 'Updated Approval' });
      expect(mockRepository.updateApprovalWorkflow).toHaveBeenCalledWith('wf-1', { name: 'Updated Approval' });
    });
  });

  describe('deleteApprovalWorkflow', () => {
    it('should delete an approval workflow', async () => {
      mockRepository.getApproval.mockResolvedValue({ id: 'wf-1' });
      mockRepository.deleteApprovalWorkflow.mockResolvedValue({ success: true });
      const service = createApprovalService(mockRepository);
      await service.deleteApprovalWorkflow('wf-1', 'user-1');
      expect(mockRepository.deleteApprovalWorkflow).toHaveBeenCalledWith('wf-1');
    });
  });

  describe('approveStep', () => {
    it('should approve a step', async () => {
      mockRepository.approveStep.mockResolvedValue({ id: 'appr-1', stepApproved: true });
      const service = createApprovalService(mockRepository);
      const result = await service.approveStep('step-1', 'user-1', 'Looks good');
      expect(result).toEqual({ id: 'appr-1', stepApproved: true });
      expect(mockRepository.approveStep).toHaveBeenCalledWith('step-1', 'user-1', 'Looks good');
    });
  });

  describe('rejectStep', () => {
    it('should reject a step', async () => {
      mockRepository.rejectStep.mockResolvedValue({ id: 'appr-1', stepRejected: true });
      const service = createApprovalService(mockRepository);
      const result = await service.rejectStep('step-1', 'user-1', 'Not ready');
      expect(result).toEqual({ id: 'appr-1', stepRejected: true });
      expect(mockRepository.rejectStep).toHaveBeenCalledWith('step-1', 'user-1', 'Not ready');
    });
  });

  describe('getApprovalStats', () => {
    it('should return approval statistics', async () => {
      const stats = { total: 50, pending: 10, approved: 35, rejected: 5 };
      mockRepository.getWorkflowStats.mockResolvedValue(stats);
      const service = createApprovalService(mockRepository);
      const result = await service.getApprovalStats('school-1', 'user-1');
      expect(result).toEqual(stats);
      expect(mockRepository.getWorkflowStats).toHaveBeenCalledWith('school-1', undefined, undefined);
    });
  });

  describe('missing required parameters', () => {
    it('should throw on missing approvalId for getApproval', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.getApproval('', 'user-1')).rejects.toThrow('approvalId is required');
    });

    it('should throw on missing userId for getApproval', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.getApproval('appr-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw on missing schoolId for createApprovalWorkflow', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.createApprovalWorkflow('', 'user-1', { name: 'WF' })).rejects.toThrow('schoolId is required');
    });

    it('should throw on missing name for createApprovalWorkflow', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.createApprovalWorkflow('school-1', 'user-1', {})).rejects.toThrow('workflow name is required');
    });

    it('should throw on missing workflowId for updateApprovalWorkflow', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.updateApprovalWorkflow('', 'user-1', { name: 'WF' })).rejects.toThrow('workflowId is required');
    });

    it('should throw on missing workflowId for deleteApprovalWorkflow', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.deleteApprovalWorkflow('', 'user-1')).rejects.toThrow('workflowId is required');
    });

    it('should throw on missing stepId for approveStep', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.approveStep('', 'user-1')).rejects.toThrow('stepId is required');
    });

    it('should throw on missing approverId for approveStep', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.approveStep('step-1', '')).rejects.toThrow('approverId is required');
    });

    it('should throw on missing stepId for rejectStep', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.rejectStep('', 'user-1')).rejects.toThrow('stepId is required');
    });

    it('should throw on missing schoolId for getApprovalStats', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.getApprovalStats('', 'user-1')).rejects.toThrow('schoolId is required');
    });
  });

  describe('repository errors', () => {
    it('should handle repository errors in getApprovals', async () => {
      mockRepository.getApprovals.mockRejectedValue(new Error('DB error'));
      const service = createApprovalService(mockRepository);
      await expect(service.getApprovals('school-1', 'user-1')).rejects.toThrow('DB error');
    });

    it('should handle repository errors in getApproval', async () => {
      mockRepository.getApproval.mockRejectedValue(new Error('Not found'));
      const service = createApprovalService(mockRepository);
      await expect(service.getApproval('appr-1', 'user-1')).rejects.toThrow('Not found');
    });

    it('should handle repository errors in createApprovalWorkflow', async () => {
      mockRepository.createApprovalWorkflow.mockRejectedValue(new Error('Create failed'));
      const service = createApprovalService(mockRepository);
      await expect(service.createApprovalWorkflow('school-1', 'user-1', { name: 'WF' })).rejects.toThrow('Create failed');
    });

    it('should handle repository errors in updateApprovalWorkflow', async () => {
      mockRepository.getApproval.mockResolvedValue({ id: 'wf-1' });
      mockRepository.updateApprovalWorkflow.mockRejectedValue(new Error('Update failed'));
      const service = createApprovalService(mockRepository);
      await expect(service.updateApprovalWorkflow('wf-1', 'user-1', { name: 'Updated' })).rejects.toThrow('Update failed');
    });

    it('should handle repository errors in deleteApprovalWorkflow', async () => {
      mockRepository.getApproval.mockResolvedValue({ id: 'wf-1' });
      mockRepository.deleteApprovalWorkflow.mockRejectedValue(new Error('Delete failed'));
      const service = createApprovalService(mockRepository);
      await expect(service.deleteApprovalWorkflow('wf-1', 'user-1')).rejects.toThrow('Delete failed');
    });

    it('should handle repository errors in approveStep', async () => {
      mockRepository.approveStep.mockRejectedValue(new Error('Approve failed'));
      const service = createApprovalService(mockRepository);
      await expect(service.approveStep('step-1', 'user-1')).rejects.toThrow('Approve failed');
    });

    it('should handle repository errors in rejectStep', async () => {
      mockRepository.rejectStep.mockRejectedValue(new Error('Reject failed'));
      const service = createApprovalService(mockRepository);
      await expect(service.rejectStep('step-1', 'user-1', 'reason')).rejects.toThrow('Reject failed');
    });

    it('should handle repository errors in getApprovalStats', async () => {
      mockRepository.getWorkflowStats.mockRejectedValue(new Error('Stats query failed'));
      const service = createApprovalService(mockRepository);
      await expect(service.getApprovalStats('school-1', 'user-1')).rejects.toThrow('Stats query failed');
    });
  });
});
