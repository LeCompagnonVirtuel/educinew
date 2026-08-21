import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createApprovalService } from '../../src/features/integration/services/approval.service';

describe('ApprovalService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getApprovals: vi.fn(),
      getApprovalById: vi.fn(),
      createApproval: vi.fn(),
      updateApproval: vi.fn(),
      deleteApproval: vi.fn(),
      approveRequest: vi.fn(),
      rejectRequest: vi.fn(),
      getApprovalHistory: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createApprovalService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getApprovals).toBeInstanceOf(Function);
    expect(service.getApprovalById).toBeInstanceOf(Function);
    expect(service.createApproval).toBeInstanceOf(Function);
    expect(service.updateApproval).toBeInstanceOf(Function);
    expect(service.deleteApproval).toBeInstanceOf(Function);
    expect(service.approveRequest).toBeInstanceOf(Function);
    expect(service.rejectRequest).toBeInstanceOf(Function);
    expect(service.getApprovalHistory).toBeInstanceOf(Function);
  });

  describe('getApprovals', () => {
    it('should return approvals list', async () => {
      mockRepository.getApprovals.mockResolvedValue([{ id: 'ap-1', title: 'Document Approval', status: 'pending' }]);
      const service = createApprovalService(mockRepository);
      const result = await service.getApprovals('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return approvals with filters', async () => {
      mockRepository.getApprovals.mockResolvedValue([{ id: 'ap-1' }]);
      const service = createApprovalService(mockRepository);
      await service.getApprovals('school-1', { status: 'pending' });
      expect(mockRepository.getApprovals).toHaveBeenCalledWith('school-1', { status: 'pending' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.getApprovals('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getApprovals.mockResolvedValue([]);
      const service = createApprovalService(mockRepository);
      const result = await service.getApprovals('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated approvals', async () => {
      mockRepository.getApprovals.mockResolvedValue({ data: [{ id: 'ap-1' }], total: 50 });
      const service = createApprovalService(mockRepository);
      const result = await service.getApprovals('school-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by type', async () => {
      mockRepository.getApprovals.mockResolvedValue([{ id: 'ap-1', type: 'document' }]);
      const service = createApprovalService(mockRepository);
      const result = await service.getApprovals('school-1', { type: 'document' });
      expect(result).toHaveLength(1);
    });

    it('should filter by requester', async () => {
      mockRepository.getApprovals.mockResolvedValue([{ id: 'ap-1', requesterId: 'user-1' }]);
      const service = createApprovalService(mockRepository);
      const result = await service.getApprovals('school-1', { requesterId: 'user-1' });
      expect(result).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getApprovals.mockRejectedValue(new Error('DB error'));
      const service = createApprovalService(mockRepository);
      await expect(service.getApprovals('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getApprovalById', () => {
    it('should return a single approval', async () => {
      mockRepository.getApprovalById.mockResolvedValue({ id: 'ap-1', title: 'Document Approval', status: 'pending' });
      const service = createApprovalService(mockRepository);
      const result = await service.getApprovalById('ap-1');
      expect(result.id).toBe('ap-1');
    });

    it('should throw if approval not found', async () => {
      mockRepository.getApprovalById.mockResolvedValue(null);
      const service = createApprovalService(mockRepository);
      await expect(service.getApprovalById('nonexistent')).rejects.toThrow('Approval not found');
    });

    it('should throw if id is missing', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.getApprovalById('')).rejects.toThrow('Approval ID is required');
    });

    it('should return approval with steps', async () => {
      mockRepository.getApprovalById.mockResolvedValue({ id: 'ap-1', steps: [{ name: 'Manager Review', status: 'completed' }, { name: 'Director Review', status: 'pending' }] });
      const service = createApprovalService(mockRepository);
      const result = await service.getApprovalById('ap-1');
      expect(result.steps).toHaveLength(2);
    });

    it('should return approval with comments', async () => {
      mockRepository.getApprovalById.mockResolvedValue({ id: 'ap-1', comments: [{ userId: 'user-1', text: 'Looks good', timestamp: '2024-01-01' }] });
      const service = createApprovalService(mockRepository);
      const result = await service.getApprovalById('ap-1');
      expect(result.comments).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getApprovalById.mockRejectedValue(new Error('Query timeout'));
      const service = createApprovalService(mockRepository);
      await expect(service.getApprovalById('ap-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createApproval', () => {
    it('should create an approval', async () => {
      mockRepository.createApproval.mockResolvedValue({ id: 'ap-1', title: 'Document Approval', status: 'pending' });
      const service = createApprovalService(mockRepository);
      const result = await service.createApproval('school-1', 'user-1', { title: 'Document Approval', type: 'document', documentId: 'doc-1' });
      expect(result.id).toBe('ap-1');
    });

    it('should throw if schoolId is missing', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.createApproval('', 'user-1', { title: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.createApproval('school-1', '', { title: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if title is missing', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.createApproval('school-1', 'user-1', { title: '' })).rejects.toThrow('Approval title is required');
    });

    it('should create approval with steps', async () => {
      mockRepository.createApproval.mockResolvedValue({ id: 'ap-1', steps: [{ name: 'Manager Review' }, { name: 'Director Review' }] });
      const service = createApprovalService(mockRepository);
      const result = await service.createApproval('school-1', 'user-1', { title: 'T', type: 'document', steps: [{ name: 'Manager Review' }, { name: 'Director Review' }] });
      expect(result.steps).toHaveLength(2);
    });

    it('should create approval with assignees', async () => {
      mockRepository.createApproval.mockResolvedValue({ id: 'ap-1', assignees: ['user-2', 'user-3'] });
      const service = createApprovalService(mockRepository);
      const result = await service.createApproval('school-1', 'user-1', { title: 'T', type: 'document', assignees: ['user-2', 'user-3'] });
      expect(result.assignees).toHaveLength(2);
    });

    it('should handle creation failure', async () => {
      mockRepository.createApproval.mockRejectedValue(new Error('Invalid approval'));
      const service = createApprovalService(mockRepository);
      await expect(service.createApproval('school-1', 'user-1', { title: 'T', type: 'document' })).rejects.toThrow('Invalid approval');
    });
  });

  describe('updateApproval', () => {
    it('should update an approval', async () => {
      mockRepository.getApprovalById.mockResolvedValue({ id: 'ap-1', title: 'Old' });
      mockRepository.updateApproval.mockResolvedValue({ id: 'ap-1', title: 'Updated' });
      const service = createApprovalService(mockRepository);
      const result = await service.updateApproval('ap-1', 'user-1', { title: 'Updated' });
      expect(result.title).toBe('Updated');
    });

    it('should throw if approval not found', async () => {
      mockRepository.getApprovalById.mockResolvedValue(null);
      const service = createApprovalService(mockRepository);
      await expect(service.updateApproval('nonexistent', 'user-1', { title: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.updateApproval('', 'user-1', { title: 'New' })).rejects.toThrow('Approval ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.updateApproval('ap-1', '', { title: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update approval steps', async () => {
      mockRepository.getApprovalById.mockResolvedValue({ id: 'ap-1' });
      mockRepository.updateApproval.mockResolvedValue({ id: 'ap-1', steps: [{ name: 'New Step' }] });
      const service = createApprovalService(mockRepository);
      const result = await service.updateApproval('ap-1', 'user-1', { steps: [{ name: 'New Step' }] });
      expect(result.steps).toHaveLength(1);
    });

    it('should handle update failure', async () => {
      mockRepository.getApprovalById.mockResolvedValue({ id: 'ap-1' });
      mockRepository.updateApproval.mockRejectedValue(new Error('Cannot update'));
      const service = createApprovalService(mockRepository);
      await expect(service.updateApproval('ap-1', 'user-1', { title: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteApproval', () => {
    it('should delete an approval', async () => {
      mockRepository.getApprovalById.mockResolvedValue({ id: 'ap-1' });
      mockRepository.deleteApproval.mockResolvedValue({ success: true });
      const service = createApprovalService(mockRepository);
      await service.deleteApproval('ap-1', 'user-1');
      expect(mockRepository.deleteApproval).toHaveBeenCalledWith('ap-1');
    });

    it('should throw if approval not found', async () => {
      mockRepository.getApprovalById.mockResolvedValue(null);
      const service = createApprovalService(mockRepository);
      await expect(service.deleteApproval('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.deleteApproval('', 'user-1')).rejects.toThrow('Approval ID is required');
    });

    it('should handle deletion with active approvals', async () => {
      mockRepository.getApprovalById.mockResolvedValue({ id: 'ap-1' });
      mockRepository.deleteApproval.mockRejectedValue(new Error('Approval has active steps'));
      const service = createApprovalService(mockRepository);
      await expect(service.deleteApproval('ap-1', 'user-1')).rejects.toThrow('Approval has active steps');
    });

    it('should force delete approval', async () => {
      mockRepository.getApprovalById.mockResolvedValue({ id: 'ap-1' });
      mockRepository.deleteApproval.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createApprovalService(mockRepository);
      const result = await service.deleteApproval('ap-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('approveRequest', () => {
    it('should approve a request', async () => {
      mockRepository.approveRequest.mockResolvedValue({ approvalId: 'ap-1', status: 'approved', approvedBy: 'user-1', approvedAt: '2024-01-01' });
      const service = createApprovalService(mockRepository);
      const result = await service.approveRequest('ap-1', 'user-1', { comments: 'Looks good' });
      expect(result.status).toBe('approved');
    });

    it('should throw if approvalId is missing', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.approveRequest('', 'user-1', {})).rejects.toThrow('Approval ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.approveRequest('ap-1', '', {})).rejects.toThrow('userId is required');
    });

    it('should handle approval failure', async () => {
      mockRepository.approveRequest.mockRejectedValue(new Error('Not authorized'));
      const service = createApprovalService(mockRepository);
      await expect(service.approveRequest('ap-1', 'user-1', {})).rejects.toThrow('Not authorized');
    });

    it('should return approval details', async () => {
      mockRepository.approveRequest.mockResolvedValue({ approvalId: 'ap-1', status: 'approved', stepIndex: 0, nextStep: 'Director Review' });
      const service = createApprovalService(mockRepository);
      const result = await service.approveRequest('ap-1', 'user-1', {});
      expect(result.nextStep).toBe('Director Review');
    });
  });

  describe('rejectRequest', () => {
    it('should reject a request', async () => {
      mockRepository.rejectRequest.mockResolvedValue({ approvalId: 'ap-1', status: 'rejected', rejectedBy: 'user-1', rejectedAt: '2024-01-01' });
      const service = createApprovalService(mockRepository);
      const result = await service.rejectRequest('ap-1', 'user-1', { reason: 'Needs revision' });
      expect(result.status).toBe('rejected');
    });

    it('should throw if approvalId is missing', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.rejectRequest('', 'user-1', {})).rejects.toThrow('Approval ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.rejectRequest('ap-1', '', {})).rejects.toThrow('userId is required');
    });

    it('should throw if reason is missing', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.rejectRequest('ap-1', 'user-1', {})).rejects.toThrow('Rejection reason is required');
    });

    it('should handle rejection failure', async () => {
      mockRepository.rejectRequest.mockRejectedValue(new Error('Cannot reject'));
      const service = createApprovalService(mockRepository);
      await expect(service.rejectRequest('ap-1', 'user-1', { reason: 'Bad' })).rejects.toThrow('Cannot reject');
    });

    it('should return rejection details', async () => {
      mockRepository.rejectRequest.mockResolvedValue({ approvalId: 'ap-1', status: 'rejected', reason: 'Needs revision', rejectedBy: 'user-1' });
      const service = createApprovalService(mockRepository);
      const result = await service.rejectRequest('ap-1', 'user-1', { reason: 'Needs revision' });
      expect(result.reason).toBe('Needs revision');
    });
  });

  describe('getApprovalHistory', () => {
    it('should return approval history', async () => {
      mockRepository.getApprovalHistory.mockResolvedValue([{ action: 'created', userId: 'user-1', timestamp: '2024-01-01' }]);
      const service = createApprovalService(mockRepository);
      const result = await service.getApprovalHistory('ap-1');
      expect(result).toHaveLength(1);
    });

    it('should return history with filters', async () => {
      mockRepository.getApprovalHistory.mockResolvedValue([{ action: 'approved' }]);
      const service = createApprovalService(mockRepository);
      await service.getApprovalHistory('ap-1', { action: 'approved' });
      expect(mockRepository.getApprovalHistory).toHaveBeenCalledWith('ap-1', { action: 'approved' });
    });

    it('should throw if approvalId is missing', async () => {
      const service = createApprovalService(mockRepository);
      await expect(service.getApprovalHistory('')).rejects.toThrow('Approval ID is required');
    });

    it('should return paginated history', async () => {
      mockRepository.getApprovalHistory.mockResolvedValue({ data: [{ action: 'created' }], total: 20 });
      const service = createApprovalService(mockRepository);
      const result = await service.getApprovalHistory('ap-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should return empty history', async () => {
      mockRepository.getApprovalHistory.mockResolvedValue([]);
      const service = createApprovalService(mockRepository);
      const result = await service.getApprovalHistory('ap-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getApprovalHistory.mockRejectedValue(new Error('DB error'));
      const service = createApprovalService(mockRepository);
      await expect(service.getApprovalHistory('ap-1')).rejects.toThrow('DB error');
    });
  });
});
