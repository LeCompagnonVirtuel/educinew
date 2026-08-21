import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createSagaService } from '../../src/features/integration/services/saga.service';

describe('SagaService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getSagas: vi.fn(),
      getSagaById: vi.fn(),
      createSaga: vi.fn(),
      updateSaga: vi.fn(),
      deleteSaga: vi.fn(),
      startSaga: vi.fn(),
      getSagaStatus: vi.fn(),
      compensateSaga: vi.fn(),
      getSagaHistory: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createSagaService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getSagas).toBeInstanceOf(Function);
    expect(service.getSagaById).toBeInstanceOf(Function);
    expect(service.createSaga).toBeInstanceOf(Function);
    expect(service.updateSaga).toBeInstanceOf(Function);
    expect(service.deleteSaga).toBeInstanceOf(Function);
    expect(service.startSaga).toBeInstanceOf(Function);
    expect(service.getSagaStatus).toBeInstanceOf(Function);
    expect(service.compensateSaga).toBeInstanceOf(Function);
    expect(service.getSagaHistory).toBeInstanceOf(Function);
  });

  describe('getSagas', () => {
    it('should return sagas list', async () => {
      mockRepository.getSagas.mockResolvedValue([{ id: 'sg-1', name: 'Document Processing' }]);
      const service = createSagaService(mockRepository);
      const result = await service.getSagas('school-1');
      expect(result).toHaveLength(1);
      expect(mockRepository.getSagas).toHaveBeenCalledWith('school-1', undefined);
    });

    it('should return sagas with filters', async () => {
      mockRepository.getSagas.mockResolvedValue([{ id: 'sg-1' }]);
      const service = createSagaService(mockRepository);
      await service.getSagas('school-1', { status: 'active' });
      expect(mockRepository.getSagas).toHaveBeenCalledWith('school-1', { status: 'active' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createSagaService(mockRepository);
      await expect(service.getSagas('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getSagas.mockResolvedValue([]);
      const service = createSagaService(mockRepository);
      const result = await service.getSagas('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated sagas', async () => {
      mockRepository.getSagas.mockResolvedValue({ data: [{ id: 'sg-1' }], total: 20 });
      const service = createSagaService(mockRepository);
      const result = await service.getSagas('school-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by type', async () => {
      mockRepository.getSagas.mockResolvedValue([{ id: 'sg-1', type: 'document' }]);
      const service = createSagaService(mockRepository);
      const result = await service.getSagas('school-1', { type: 'document' });
      expect(result).toHaveLength(1);
    });

    it('should return sagas with step count', async () => {
      mockRepository.getSagas.mockResolvedValue([{ id: 'sg-1', stepCount: 5 }]);
      const service = createSagaService(mockRepository);
      const result = await service.getSagas('school-1');
      expect(result[0].stepCount).toBe(5);
    });

    it('should return sagas with last run', async () => {
      mockRepository.getSagas.mockResolvedValue([{ id: 'sg-1', lastRunAt: '2024-01-01', lastRunStatus: 'success' }]);
      const service = createSagaService(mockRepository);
      const result = await service.getSagas('school-1');
      expect(result[0].lastRunStatus).toBe('success');
    });

    it('should handle repository errors', async () => {
      mockRepository.getSagas.mockRejectedValue(new Error('DB error'));
      const service = createSagaService(mockRepository);
      await expect(service.getSagas('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getSagaById', () => {
    it('should return a single saga', async () => {
      mockRepository.getSagaById.mockResolvedValue({ id: 'sg-1', name: 'Document Processing' });
      const service = createSagaService(mockRepository);
      const result = await service.getSagaById('sg-1');
      expect(result.id).toBe('sg-1');
    });

    it('should throw if saga not found', async () => {
      mockRepository.getSagaById.mockResolvedValue(null);
      const service = createSagaService(mockRepository);
      await expect(service.getSagaById('nonexistent')).rejects.toThrow('Saga not found');
    });

    it('should throw if id is missing', async () => {
      const service = createSagaService(mockRepository);
      await expect(service.getSagaById('')).rejects.toThrow('Saga ID is required');
    });

    it('should return saga with steps', async () => {
      mockRepository.getSagaById.mockResolvedValue({ id: 'sg-1', steps: [{ name: 'step1' }, { name: 'step2' }] });
      const service = createSagaService(mockRepository);
      const result = await service.getSagaById('sg-1');
      expect(result.steps).toHaveLength(2);
    });

    it('should return saga with compensation steps', async () => {
      mockRepository.getSagaById.mockResolvedValue({ id: 'sg-1', compensationSteps: [{ name: 'comp1' }] });
      const service = createSagaService(mockRepository);
      const result = await service.getSagaById('sg-1');
      expect(result.compensationSteps).toHaveLength(1);
    });

    it('should return saga with config', async () => {
      mockRepository.getSagaById.mockResolvedValue({ id: 'sg-1', config: { timeout: 3600 } });
      const service = createSagaService(mockRepository);
      const result = await service.getSagaById('sg-1');
      expect(result.config.timeout).toBe(3600);
    });

    it('should return saga with version', async () => {
      mockRepository.getSagaById.mockResolvedValue({ id: 'sg-1', version: 3 });
      const service = createSagaService(mockRepository);
      const result = await service.getSagaById('sg-1');
      expect(result.version).toBe(3);
    });

    it('should handle repository errors', async () => {
      mockRepository.getSagaById.mockRejectedValue(new Error('Query timeout'));
      const service = createSagaService(mockRepository);
      await expect(service.getSagaById('sg-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createSaga', () => {
    it('should create a saga', async () => {
      mockRepository.createSaga.mockResolvedValue({ id: 'sg-1', name: 'Test Saga' });
      const service = createSagaService(mockRepository);
      const result = await service.createSaga('school-1', 'user-1', { name: 'Test Saga', steps: [] });
      expect(result.id).toBe('sg-1');
      expect(mockRepository.createSaga).toHaveBeenCalled();
    });

    it('should throw if schoolId is missing', async () => {
      const service = createSagaService(mockRepository);
      await expect(service.createSaga('', 'user-1', { name: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createSagaService(mockRepository);
      await expect(service.createSaga('school-1', '', { name: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if data is missing', async () => {
      const service = createSagaService(mockRepository);
      await expect(service.createSaga('school-1', 'user-1', null)).rejects.toThrow('Saga data is required');
    });

    it('should throw if name is missing', async () => {
      const service = createSagaService(mockRepository);
      await expect(service.createSaga('school-1', 'user-1', { name: '' })).rejects.toThrow('Saga name is required');
    });

    it('should create saga with steps', async () => {
      mockRepository.createSaga.mockResolvedValue({ id: 'sg-1', steps: [{ name: 'step1' }] });
      const service = createSagaService(mockRepository);
      const result = await service.createSaga('school-1', 'user-1', { name: 'T', steps: [{ name: 'step1' }] });
      expect(result.steps).toHaveLength(1);
    });

    it('should create saga with compensation', async () => {
      mockRepository.createSaga.mockResolvedValue({ id: 'sg-1', compensationSteps: [{ name: 'comp1' }] });
      const service = createSagaService(mockRepository);
      const result = await service.createSaga('school-1', 'user-1', { name: 'T', compensationSteps: [{ name: 'comp1' }] });
      expect(result.compensationSteps).toHaveLength(1);
    });

    it('should create saga with config', async () => {
      mockRepository.createSaga.mockResolvedValue({ id: 'sg-1', config: { retryPolicy: 'exponential' } });
      const service = createSagaService(mockRepository);
      const result = await service.createSaga('school-1', 'user-1', { name: 'T', config: { retryPolicy: 'exponential' } });
      expect(result.config.retryPolicy).toBe('exponential');
    });

    it('should handle creation failure', async () => {
      mockRepository.createSaga.mockRejectedValue(new Error('Invalid steps'));
      const service = createSagaService(mockRepository);
      await expect(service.createSaga('school-1', 'user-1', { name: 'T', steps: [] })).rejects.toThrow('Invalid steps');
    });
  });

  describe('updateSaga', () => {
    it('should update a saga', async () => {
      mockRepository.getSagaById.mockResolvedValue({ id: 'sg-1', name: 'Old' });
      mockRepository.updateSaga.mockResolvedValue({ id: 'sg-1', name: 'Updated' });
      const service = createSagaService(mockRepository);
      const result = await service.updateSaga('sg-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if saga not found', async () => {
      mockRepository.getSagaById.mockResolvedValue(null);
      const service = createSagaService(mockRepository);
      await expect(service.updateSaga('nonexistent', 'user-1', { name: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createSagaService(mockRepository);
      await expect(service.updateSaga('', 'user-1', { name: 'New' })).rejects.toThrow('Saga ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createSagaService(mockRepository);
      await expect(service.updateSaga('sg-1', '', { name: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update saga steps', async () => {
      mockRepository.getSagaById.mockResolvedValue({ id: 'sg-1' });
      mockRepository.updateSaga.mockResolvedValue({ id: 'sg-1', steps: [{ name: 'new' }] });
      const service = createSagaService(mockRepository);
      const result = await service.updateSaga('sg-1', 'user-1', { steps: [{ name: 'new' }] });
      expect(result.steps).toHaveLength(1);
    });

    it('should update saga config', async () => {
      mockRepository.getSagaById.mockResolvedValue({ id: 'sg-1' });
      mockRepository.updateSaga.mockResolvedValue({ id: 'sg-1', config: { timeout: 7200 } });
      const service = createSagaService(mockRepository);
      const result = await service.updateSaga('sg-1', 'user-1', { config: { timeout: 7200 } });
      expect(result.config.timeout).toBe(7200);
    });

    it('should handle update failure', async () => {
      mockRepository.getSagaById.mockResolvedValue({ id: 'sg-1' });
      mockRepository.updateSaga.mockRejectedValue(new Error('Cannot update running saga'));
      const service = createSagaService(mockRepository);
      await expect(service.updateSaga('sg-1', 'user-1', { name: 'New' })).rejects.toThrow('Cannot update running saga');
    });
  });

  describe('deleteSaga', () => {
    it('should delete a saga', async () => {
      mockRepository.getSagaById.mockResolvedValue({ id: 'sg-1' });
      mockRepository.deleteSaga.mockResolvedValue({ success: true });
      const service = createSagaService(mockRepository);
      await service.deleteSaga('sg-1', 'user-1');
      expect(mockRepository.deleteSaga).toHaveBeenCalledWith('sg-1');
    });

    it('should throw if saga not found', async () => {
      mockRepository.getSagaById.mockResolvedValue(null);
      const service = createSagaService(mockRepository);
      await expect(service.deleteSaga('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createSagaService(mockRepository);
      await expect(service.deleteSaga('', 'user-1')).rejects.toThrow('Saga ID is required');
    });

    it('should handle deletion with active runs', async () => {
      mockRepository.getSagaById.mockResolvedValue({ id: 'sg-1' });
      mockRepository.deleteSaga.mockRejectedValue(new Error('Saga has active runs'));
      const service = createSagaService(mockRepository);
      await expect(service.deleteSaga('sg-1', 'user-1')).rejects.toThrow('Saga has active runs');
    });

    it('should force delete saga', async () => {
      mockRepository.getSagaById.mockResolvedValue({ id: 'sg-1' });
      mockRepository.deleteSaga.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createSagaService(mockRepository);
      const result = await service.deleteSaga('sg-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('startSaga', () => {
    it('should start a saga', async () => {
      mockRepository.startSaga.mockResolvedValue({ id: 'sg-1', executionId: 'exec-1', status: 'running' });
      const service = createSagaService(mockRepository);
      const result = await service.startSaga('sg-1', 'user-1', { documentId: 'doc-1' });
      expect(result.status).toBe('running');
    });

    it('should throw if sagaId is missing', async () => {
      const service = createSagaService(mockRepository);
      await expect(service.startSaga('', 'user-1', {})).rejects.toThrow('Saga ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createSagaService(mockRepository);
      await expect(service.startSaga('sg-1', '', {})).rejects.toThrow('userId is required');
    });

    it('should handle start failure', async () => {
      mockRepository.startSaga.mockResolvedValue({ status: 'failed', error: 'Invalid input' });
      const service = createSagaService(mockRepository);
      const result = await service.startSaga('sg-1', 'user-1', {});
      expect(result.status).toBe('failed');
    });

    it('should return execution ID', async () => {
      mockRepository.startSaga.mockResolvedValue({ executionId: 'exec-123' });
      const service = createSagaService(mockRepository);
      const result = await service.startSaga('sg-1', 'user-1', {});
      expect(result.executionId).toBe('exec-123');
    });

    it('should handle saga not found', async () => {
      mockRepository.startSaga.mockRejectedValue(new Error('Saga not found'));
      const service = createSagaService(mockRepository);
      await expect(service.startSaga('nonexistent', 'user-1', {})).rejects.toThrow('Saga not found');
    });
  });

  describe('getSagaStatus', () => {
    it('should return saga execution status', async () => {
      mockRepository.getSagaStatus.mockResolvedValue({ executionId: 'exec-1', status: 'running', currentStep: 2 });
      const service = createSagaService(mockRepository);
      const result = await service.getSagaStatus('sg-1', 'exec-1');
      expect(result.status).toBe('running');
    });

    it('should throw if executionId is missing', async () => {
      const service = createSagaService(mockRepository);
      await expect(service.getSagaStatus('sg-1', '')).rejects.toThrow('Execution ID is required');
    });

    it('should return completed status', async () => {
      mockRepository.getSagaStatus.mockResolvedValue({ executionId: 'exec-1', status: 'completed' });
      const service = createSagaService(mockRepository);
      const result = await service.getSagaStatus('sg-1', 'exec-1');
      expect(result.status).toBe('completed');
    });

    it('should return failed status', async () => {
      mockRepository.getSagaStatus.mockResolvedValue({ executionId: 'exec-1', status: 'failed', error: 'Step 2 failed' });
      const service = createSagaService(mockRepository);
      const result = await service.getSagaStatus('sg-1', 'exec-1');
      expect(result.error).toBe('Step 2 failed');
    });

    it('should return compensated status', async () => {
      mockRepository.getSagaStatus.mockResolvedValue({ executionId: 'exec-1', status: 'compensated' });
      const service = createSagaService(mockRepository);
      const result = await service.getSagaStatus('sg-1', 'exec-1');
      expect(result.status).toBe('compensated');
    });

    it('should return step progress', async () => {
      mockRepository.getSagaStatus.mockResolvedValue({ executionId: 'exec-1', steps: [{ name: 'step1', status: 'completed' }, { name: 'step2', status: 'running' }] });
      const service = createSagaService(mockRepository);
      const result = await service.getSagaStatus('sg-1', 'exec-1');
      expect(result.steps).toHaveLength(2);
    });
  });

  describe('compensateSaga', () => {
    it('should compensate a saga', async () => {
      mockRepository.compensateSaga.mockResolvedValue({ executionId: 'exec-1', status: 'compensating', compensatedSteps: ['step1'] });
      const service = createSagaService(mockRepository);
      const result = await service.compensateSaga('sg-1', 'exec-1', 'user-1');
      expect(result.status).toBe('compensating');
      expect(result.compensatedSteps).toHaveLength(1);
    });

    it('should throw if executionId is missing', async () => {
      const service = createSagaService(mockRepository);
      await expect(service.compensateSaga('sg-1', '', 'user-1')).rejects.toThrow('Execution ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createSagaService(mockRepository);
      await expect(service.compensateSaga('sg-1', 'exec-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle compensation failure', async () => {
      mockRepository.compensateSaga.mockRejectedValue(new Error('Cannot compensate completed saga'));
      const service = createSagaService(mockRepository);
      await expect(service.compensateSaga('sg-1', 'exec-1', 'user-1')).rejects.toThrow('Cannot compensate completed saga');
    });

    it('should return compensated status', async () => {
      mockRepository.compensateSaga.mockResolvedValue({ executionId: 'exec-1', status: 'compensated' });
      const service = createSagaService(mockRepository);
      const result = await service.compensateSaga('sg-1', 'exec-1', 'user-1');
      expect(result.status).toBe('compensated');
    });

    it('should return compensation details', async () => {
      mockRepository.compensateSaga.mockResolvedValue({ executionId: 'exec-1', compensatedSteps: ['step1', 'step2'], compensationTime: 5000 });
      const service = createSagaService(mockRepository);
      const result = await service.compensateSaga('sg-1', 'exec-1', 'user-1');
      expect(result.compensatedSteps).toHaveLength(2);
    });
  });

  describe('getSagaHistory', () => {
    it('should return saga execution history', async () => {
      mockRepository.getSagaHistory.mockResolvedValue([{ executionId: 'exec-1', status: 'completed', startedAt: '2024-01-01' }]);
      const service = createSagaService(mockRepository);
      const result = await service.getSagaHistory('sg-1');
      expect(result).toHaveLength(1);
    });

    it('should return history with filters', async () => {
      mockRepository.getSagaHistory.mockResolvedValue([{ executionId: 'exec-1', status: 'failed' }]);
      const service = createSagaService(mockRepository);
      await service.getSagaHistory('sg-1', { status: 'failed' });
      expect(mockRepository.getSagaHistory).toHaveBeenCalledWith('sg-1', { status: 'failed' });
    });

    it('should throw if sagaId is missing', async () => {
      const service = createSagaService(mockRepository);
      await expect(service.getSagaHistory('')).rejects.toThrow('Saga ID is required');
    });

    it('should return paginated history', async () => {
      mockRepository.getSagaHistory.mockResolvedValue({ data: [{ executionId: 'exec-1' }], total: 50 });
      const service = createSagaService(mockRepository);
      const result = await service.getSagaHistory('sg-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should return empty history', async () => {
      mockRepository.getSagaHistory.mockResolvedValue([]);
      const service = createSagaService(mockRepository);
      const result = await service.getSagaHistory('sg-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getSagaHistory.mockRejectedValue(new Error('DB error'));
      const service = createSagaService(mockRepository);
      await expect(service.getSagaHistory('sg-1')).rejects.toThrow('DB error');
    });
  });
});
