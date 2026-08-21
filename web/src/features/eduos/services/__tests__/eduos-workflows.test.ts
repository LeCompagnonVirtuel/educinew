import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as repoModule from '../../repositories/eduos.repository';

vi.mock('../../repositories/eduos.repository', () => ({
  createEduOSRepository: vi.fn(),
}));

describe('EduOS Workflow Services', () => {
  let mockRepo: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    mockRepo = {
      getWorkflowNode: vi.fn(),
      listWorkflowNodes: vi.fn(),
      createWorkflowNode: vi.fn(),
      updateWorkflowNode: vi.fn(),
      deleteWorkflowNode: vi.fn(),
      getBpmnEngine: vi.fn(),
      listBpmnEngines: vi.fn(),
      createBpmnEngine: vi.fn(),
      updateBpmnEngine: vi.fn(),
      deleteBpmnEngine: vi.fn(),
      getStateMachine: vi.fn(),
      listStateMachines: vi.fn(),
      createStateMachine: vi.fn(),
      updateStateMachine: vi.fn(),
      deleteStateMachine: vi.fn(),
    };
    (repoModule.createEduOSRepository as any).mockReturnValue(mockRepo);
  });

  describe('WorkflowNodeService', () => {
    it('should create service', async () => {
      const { EduOSWorkflowNodeService } = await import('../eduos-workflow-node.service');
      const service = new EduOSWorkflowNodeService({} as any);
      expect(service).toBeDefined();
    });

    it('should get workflow node', async () => {
      mockRepo.getWorkflowNode.mockResolvedValue({ id: 'wn-1', type: 'task' });
      const { EduOSWorkflowNodeService } = await import('../eduos-workflow-node.service');
      const service = new EduOSWorkflowNodeService({} as any);
      const result = await service.getWorkflowNode('school-1', 'wn-1');
      expect(result.id).toBe('wn-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getWorkflowNode.mockResolvedValue(null);
      const { EduOSWorkflowNodeService } = await import('../eduos-workflow-node.service');
      const service = new EduOSWorkflowNodeService({} as any);
      await expect(service.getWorkflowNode('school-1', 'wn-1')).rejects.toThrow();
    });

    it('should list workflow nodes', async () => {
      mockRepo.listWorkflowNodes.mockResolvedValue([{ id: 'wn-1' }]);
      const { EduOSWorkflowNodeService } = await import('../eduos-workflow-node.service');
      const service = new EduOSWorkflowNodeService({} as any);
      const result = await service.listWorkflowNodes('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create workflow node', async () => {
      mockRepo.createWorkflowNode.mockResolvedValue({ id: 'wn-1' });
      const { EduOSWorkflowNodeService } = await import('../eduos-workflow-node.service');
      const service = new EduOSWorkflowNodeService({} as any);
      const result = await service.createWorkflowNode('school-1', { type: 'task' });
      expect(result.id).toBe('wn-1');
    });

    it('should update workflow node', async () => {
      mockRepo.getWorkflowNode.mockResolvedValue({ id: 'wn-1' });
      mockRepo.updateWorkflowNode.mockResolvedValue({ id: 'wn-1', type: 'gateway' });
      const { EduOSWorkflowNodeService } = await import('../eduos-workflow-node.service');
      const service = new EduOSWorkflowNodeService({} as any);
      const result = await service.updateWorkflowNode('school-1', 'wn-1', { type: 'gateway' });
      expect(result.type).toBe('gateway');
    });

    it('should delete workflow node', async () => {
      mockRepo.getWorkflowNode.mockResolvedValue({ id: 'wn-1' });
      mockRepo.deleteWorkflowNode.mockResolvedValue(undefined);
      const { EduOSWorkflowNodeService } = await import('../eduos-workflow-node.service');
      const service = new EduOSWorkflowNodeService({} as any);
      await service.deleteWorkflowNode('school-1', 'wn-1');
      expect(mockRepo.deleteWorkflowNode).toHaveBeenCalledWith('school-1', 'wn-1');
    });
  });
});
