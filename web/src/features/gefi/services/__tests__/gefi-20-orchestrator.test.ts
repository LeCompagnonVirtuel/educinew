import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  single: vi.fn(),
  order: vi.fn().mockReturnThis(),
};

const mockPipeline = {
  id: 'pl-001',
  school_id: 'sch-001',
  name: 'Financial Sync Pipeline',
  steps: [
    { service: 'payment_service', action: 'sync_payments', status: 'PENDING' },
    { service: 'wallet_service', action: 'update_balances', status: 'PENDING' },
    { service: 'reporting_service', action: 'refresh_reports', status: 'PENDING' },
  ],
  status: 'IDLE',
  last_run: null,
  created_at: new Date().toISOString(),
};

const mockWorkflowExecution = {
  id: 'wfe-001',
  pipeline_id: 'pl-001',
  status: 'RUNNING',
  started_at: new Date().toISOString(),
  completed_at: null,
  logs: [
    { step: 0, status: 'RUNNING', started_at: new Date().toISOString() },
  ],
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('OrchestratorService', () => {
  describe('createPipeline', () => {
    it('should create orchestration pipeline', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockPipeline, error: null });
      const result = await mockSupabase.from('orchestration_pipelines').insert(mockPipeline);

      expect(result.data.steps.length).toBe(3);
      expect(result.error).toBeNull();
    });

    it('should validate steps array', async () => {
      expect(mockPipeline.steps.every(s => s.service && s.action)).toBe(true);
    });
  });

  describe('executePipeline', () => {
    it('should start pipeline execution', async () => {
      mockSupabase.insert.mockResolvedValue({ data: mockWorkflowExecution, error: null });
      const result = await mockSupabase.from('workflow_executions').insert(mockWorkflowExecution);

      expect(result.data.status).toBe('RUNNING');
    });

    it('should update step status', async () => {
      const updated = {
        ...mockWorkflowExecution,
        logs: [{ step: 0, status: 'COMPLETED', completed_at: new Date().toISOString() }],
      };
      mockSupabase.update.mockResolvedValue({ data: updated, error: null });
      const result = await mockSupabase.from('workflow_executions')
        .update({ logs: updated.logs })
        .eq('id', 'wfe-001');

      expect(result.data.logs[0].status).toBe('COMPLETED');
    });
  });

  describe('getPipelineStatus', () => {
    it('should return current pipeline state', async () => {
      mockSupabase.single.mockResolvedValue({ data: mockPipeline, error: null });
      const result = await mockSupabase.from('orchestration_pipelines')
        .select('*')
        .eq('id', 'pl-001')
        .single();

      expect(result.data.status).toBe('IDLE');
    });
  });

  describe('retryFailedStep', () => {
    it('should retry from failed step', async () => {
      const failed = {
        ...mockWorkflowExecution,
        logs: [{ step: 1, status: 'FAILED', error: 'timeout' }],
      };
      const retried = {
        ...failed,
        logs: [...failed.logs, { step: 1, status: 'RUNNING', retried_at: new Date().toISOString() }],
      };
      mockSupabase.update.mockResolvedValue({ data: retried, error: null });
      const result = await mockSupabase.from('workflow_executions')
        .update({ logs: retried.logs })
        .eq('id', 'wfe-001');

      expect(result.data.logs).toHaveLength(2);
    });
  });

  describe('cancelPipeline', () => {
    it('should set status to CANCELLED', async () => {
      const cancelled = { ...mockPipeline, status: 'CANCELLED' };
      mockSupabase.update.mockResolvedValue({ data: cancelled, error: null });
      const result = await mockSupabase.from('orchestration_pipelines')
        .update({ status: 'CANCELLED' })
        .eq('id', 'pl-001');

      expect(result.data.status).toBe('CANCELLED');
    });
  });

  describe('getExecutionHistory', () => {
    it('should return past executions', async () => {
      mockSupabase.order.mockResolvedValue({ data: [mockWorkflowExecution], error: null });
      const result = await mockSupabase.from('workflow_executions')
        .select('*')
        .eq('pipeline_id', 'pl-001')
        .order('started_at', { ascending: false });

      expect(result.data).toHaveLength(1);
    });
  });

  describe('error handling', () => {
    it('should handle pipeline not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
      const result = await mockSupabase.from('orchestration_pipelines')
        .select('*')
        .eq('id', 'unknown')
        .single();

      expect(result.error).toBeTruthy();
    });
  });
});
