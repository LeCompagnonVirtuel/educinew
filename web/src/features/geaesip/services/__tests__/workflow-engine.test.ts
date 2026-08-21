import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipWorkflowEngineService } from '../workflow-engine.service';

const mockWorkflowRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockTaskRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockPlanRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockLogRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const WORKFLOW_ID = '660e8400-e29b-41d4-a716-446655440001';
const TASK_ID = '770e8400-e29b-41d4-a716-446655440002';
const PLAN_ID = '880e8400-e29b-41d4-a716-446655440003';
const LOG_ID = '990e8400-e29b-41d4-a716-446655440004';

const mockWorkflow = {
  id: WORKFLOW_ID,
  school_id: SCHOOL_ID,
  name: 'Enrollment workflow',
  steps: ['collect', 'validate', 'approve'],
  status: 'active',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockTask = {
  id: TASK_ID,
  school_id: SCHOOL_ID,
  workflowId: WORKFLOW_ID,
  name: 'Validate documents',
  status: 'completed',
  completedAt: new Date().toISOString(),
  result: { valid: true },
  retries: 0,
  createdAt: new Date().toISOString(),
};

const mockPlan = {
  id: PLAN_ID,
  school_id: SCHOOL_ID,
  name: 'Q1 action plan',
  objectives: ['Reduce dropout', 'Improve grades'],
  status: 'in_progress',
  created_at: new Date().toISOString(),
};

const mockLog = {
  id: LOG_ID,
  school_id: SCHOOL_ID,
  workflowId: WORKFLOW_ID,
  action: 'STEP_COMPLETED',
  detail: 'Step 1 done',
  timestamp: new Date().toISOString(),
};

let service: GeaesipWorkflowEngineService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipWorkflowEngineService(
    mockWorkflowRepo as never,
    mockTaskRepo as never,
    mockPlanRepo as never,
    mockLogRepo as never,
  );
});

describe('GeaesipWorkflowEngineService', () => {
  describe('listWorkflows', () => {
    it('should list workflows for a school', async () => {
      mockWorkflowRepo.findAllBySchool.mockResolvedValue([mockWorkflow]);

      const result = await service.listWorkflows(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listWorkflows('')).rejects.toThrow();
    });
  });

  describe('getWorkflow', () => {
    it('should retrieve a workflow by id', async () => {
      mockWorkflowRepo.findById.mockResolvedValue(mockWorkflow);

      const result = await service.getWorkflow(SCHOOL_ID, WORKFLOW_ID);

      expect(result).toEqual(mockWorkflow);
    });

    it('should throw if workflow not found', async () => {
      mockWorkflowRepo.findById.mockImplementation(() => { throw new Error('Not found'); });

      await expect(service.getWorkflow(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createWorkflow', () => {
    it('should create a workflow successfully', async () => {
      mockWorkflowRepo.create.mockResolvedValue(mockWorkflow);

      const result = await service.createWorkflow(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        name: 'Enrollment workflow',
        steps: ['collect', 'validate', 'approve'],
        status: 'active',
      } as never);

      expect(result).toEqual(mockWorkflow);
    });
  });

  describe('updateWorkflow', () => {
    it('should update a workflow', async () => {
      mockWorkflowRepo.findById.mockResolvedValue(mockWorkflow);
      mockWorkflowRepo.update.mockResolvedValue({ ...mockWorkflow, name: 'Updated' });

      const result = await service.updateWorkflow(SCHOOL_ID, WORKFLOW_ID, { name: 'Updated' });

      expect(result.name).toBe('Updated');
    });
  });

  describe('deleteWorkflow', () => {
    it('should delete a workflow', async () => {
      mockWorkflowRepo.findById.mockResolvedValue(mockWorkflow);
      mockWorkflowRepo.delete.mockResolvedValue(undefined);

      await service.deleteWorkflow(SCHOOL_ID, WORKFLOW_ID);

      expect(mockWorkflowRepo.delete).toHaveBeenCalledWith(WORKFLOW_ID);
    });
  });

  describe('listTasks', () => {
    it('should list tasks', async () => {
      mockTaskRepo.findAllBySchool.mockResolvedValue([mockTask]);

      const result = await service.listTasks(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('completeTask', () => {
    it('should complete a task with result', async () => {
      mockTaskRepo.findById.mockResolvedValue(mockTask);
      mockTaskRepo.update.mockResolvedValue({ ...mockTask, completedAt: new Date().toISOString() });

      const result = await service.completeTask(SCHOOL_ID, TASK_ID, { valid: true });

      expect(result.completedAt).toBeDefined();
    });
  });

  describe('retryTask', () => {
    it('should retry a task', async () => {
      mockTaskRepo.findById.mockResolvedValue({ ...mockTask, retries: 0, status: 'failed' });
      mockTaskRepo.update.mockResolvedValue({ ...mockTask, retries: 1, status: 'pending' });

      const result = await service.retryTask(SCHOOL_ID, TASK_ID);

      expect(result.retries).toBe(1);
      expect(result.status).toBe('pending');
    });
  });

  describe('listActionPlans', () => {
    it('should list action plans', async () => {
      mockPlanRepo.findAllBySchool.mockResolvedValue([mockPlan]);

      const result = await service.listActionPlans(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('createActionPlan', () => {
    it('should create an action plan', async () => {
      mockPlanRepo.create.mockResolvedValue(mockPlan);

      const result = await service.createActionPlan(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        name: 'Q1 action plan',
        objectives: ['Reduce dropout', 'Improve grades'],
        status: 'in_progress',
      } as never);

      expect(result.name).toBe('Q1 action plan');
    });
  });

  describe('listExecutionLogs', () => {
    it('should list execution logs', async () => {
      mockLogRepo.findAllBySchool.mockResolvedValue([mockLog]);

      const result = await service.listExecutionLogs(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getWorkflowEngineStats', () => {
    it('should return stats', async () => {
      mockWorkflowRepo.findAllBySchool.mockResolvedValue([mockWorkflow]);
      mockTaskRepo.findAllBySchool.mockResolvedValue([mockTask]);
      mockPlanRepo.findAllBySchool.mockResolvedValue([mockPlan]);
      mockLogRepo.findAllBySchool.mockResolvedValue([mockLog]);

      const result = await service.getWorkflowEngineStats(SCHOOL_ID);

      expect(result.totalWorkflows).toBe(1);
      expect(result.totalTasks).toBe(1);
      expect(result.completedTasks).toBe(1);
      expect(result.totalActionPlans).toBe(1);
      expect(result.totalExecutionLogs).toBe(1);
    });
  });
});
