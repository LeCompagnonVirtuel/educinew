import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ExperimentService } from '../experiment-service';

const mockExperimentRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByStatus: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const EXPERIMENT_ID = '660e8400-e29b-41d4-a716-446655440001';

const mockExperiment = {
  id: EXPERIMENT_ID,
  school_id: SCHOOL_ID,
  name: 'ML Model Comparison',
  description: 'Comparing ML models for student prediction',
  status: 'RUNNING',
  hypothesis: 'LSTM outperforms ARIMA',
  methodology: 'Cross-validation',
  datasetIds: ['ds-1'],
  modelIds: ['ml-1'],
  results: {},
  startedAt: new Date().toISOString(),
  completedAt: '',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: ExperimentService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new ExperimentService(mockExperimentRepo as never);
});

describe('ExperimentService', () => {
  describe('listExperiments', () => {
    it('should list experiments for a school', async () => {
      mockExperimentRepo.findAll.mockResolvedValue({ data: [mockExperiment], total: 1, offset: 0, limit: 50 });

      const result = await service.listExperiments(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listExperiments('')).rejects.toThrow();
    });
  });

  describe('getExperiment', () => {
    it('should retrieve an experiment by id', async () => {
      mockExperimentRepo.exists.mockResolvedValue(true);
      mockExperimentRepo.findById.mockResolvedValue(mockExperiment);

      const result = await service.getExperiment(SCHOOL_ID, EXPERIMENT_ID);

      expect(result).toEqual(mockExperiment);
    });

    it('should throw if experiment not found', async () => {
      mockExperimentRepo.exists.mockResolvedValue(false);

      await expect(service.getExperiment(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createExperiment', () => {
    it('should create an experiment successfully', async () => {
      mockExperimentRepo.create.mockResolvedValue(mockExperiment);

      const result = await service.createExperiment(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'ML Model Comparison',
        description: 'Comparing ML models for student prediction',
        status: 'RUNNING',
        hypothesis: 'LSTM outperforms ARIMA',
        methodology: 'Cross-validation',
        datasetIds: ['ds-1'],
        modelIds: ['ml-1'],
        results: {},
      });

      expect(result).toEqual(mockExperiment);
    });
  });

  describe('deleteExperiment', () => {
    it('should soft delete an experiment', async () => {
      mockExperimentRepo.exists.mockResolvedValue(true);
      mockExperimentRepo.findById.mockResolvedValue(mockExperiment);
      mockExperimentRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteExperiment(SCHOOL_ID, EXPERIMENT_ID);

      expect(mockExperimentRepo.softDelete).toHaveBeenCalledWith(EXPERIMENT_ID, SCHOOL_ID);
    });
  });

  describe('listByStatus', () => {
    it('should list experiments by status', async () => {
      mockExperimentRepo.findByStatus.mockResolvedValue({ data: [mockExperiment], total: 1, offset: 0, limit: 50 });

      const result = await service.listByStatus(SCHOOL_ID, 'RUNNING');

      expect(result.data).toHaveLength(1);
    });
  });

  describe('startExperiment', () => {
    it('should start an experiment', async () => {
      mockExperimentRepo.exists.mockResolvedValue(true);
      mockExperimentRepo.findById.mockResolvedValue(mockExperiment);
      mockExperimentRepo.update.mockResolvedValue({ ...mockExperiment, status: 'RUNNING' });

      const result = await service.startExperiment(SCHOOL_ID, EXPERIMENT_ID);

      expect(result.status).toBe('RUNNING');
    });
  });

  describe('completeExperiment', () => {
    it('should complete an experiment with results', async () => {
      mockExperimentRepo.exists.mockResolvedValue(true);
      mockExperimentRepo.findById.mockResolvedValue(mockExperiment);
      mockExperimentRepo.update.mockResolvedValue({
        ...mockExperiment,
        status: 'COMPLETED',
        results: { accuracy: 0.95 },
      });

      const result = await service.completeExperiment(SCHOOL_ID, EXPERIMENT_ID, { accuracy: 0.95 });

      expect(result.status).toBe('COMPLETED');
      expect(result.results).toEqual({ accuracy: 0.95 });
    });
  });

  describe('failExperiment', () => {
    it('should mark an experiment as failed', async () => {
      mockExperimentRepo.exists.mockResolvedValue(true);
      mockExperimentRepo.findById.mockResolvedValue(mockExperiment);
      mockExperimentRepo.update.mockResolvedValue({ ...mockExperiment, status: 'FAILED' });

      const result = await service.failExperiment(SCHOOL_ID, EXPERIMENT_ID);

      expect(result.status).toBe('FAILED');
    });
  });

  describe('getExperimentStats', () => {
    it('should return experiment statistics', async () => {
      mockExperimentRepo.findAll.mockResolvedValue({ data: [mockExperiment], total: 1, offset: 0, limit: 1000 });

      const result = await service.getExperimentStats(SCHOOL_ID);

      expect(result.totalExperiments).toBe(1);
      expect(result.byStatus['RUNNING']).toBe(1);
    });
  });
});
