import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipAIEvaluationService } from '../ai-evaluation.service';

const mockEvalRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockModelEvalRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

const mockAgentEvalRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const EVAL_ID = '660e8400-e29b-41d4-a716-446655440001';
const MODEL_EVAL_ID = '770e8400-e29b-41d4-a716-446655440002';
const AGENT_EVAL_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockEval = {
  id: EVAL_ID,
  school_id: SCHOOL_ID,
  name: 'Enrollment prediction evaluation',
  type: 'REGRESSION',
  score: 0.89,
  metrics: { rmse: 0.12, r2: 0.89 },
  created_at: new Date().toISOString(),
};

const mockModelEval = {
  id: MODEL_EVAL_ID,
  school_id: SCHOOL_ID,
  modelName: 'Enrollment Predictor',
  accuracy: 0.92,
  precision: 0.91,
  recall: 0.88,
  f1Score: 0.895,
  evaluatedAt: new Date().toISOString(),
};

const mockAgentEval = {
  id: AGENT_EVAL_ID,
  school_id: SCHOOL_ID,
  agentId: 'agent-1',
  agentName: 'Analytics Agent',
  missionSuccessRate: 0.87,
  averageScore: 0.91,
  evaluatedAt: new Date().toISOString(),
};

let service: GeaesipAIEvaluationService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipAIEvaluationService(
    mockEvalRepo as never,
    mockModelEvalRepo as never,
    mockAgentEvalRepo as never,
  );
});

describe('GeaesipAIEvaluationService', () => {
  describe('listEvaluations', () => {
    it('should list evaluations for a school', async () => {
      mockEvalRepo.findAllBySchool.mockResolvedValue([mockEval]);

      const result = await service.listEvaluations(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listEvaluations('')).rejects.toThrow();
    });
  });

  describe('getEvaluation', () => {
    it('should retrieve an evaluation by id', async () => {
      mockEvalRepo.findById.mockResolvedValue(mockEval);

      const result = await service.getEvaluation(SCHOOL_ID, EVAL_ID);

      expect(result).toEqual(mockEval);
    });

    it('should throw if evaluation not found', async () => {
      mockEvalRepo.findById.mockImplementation(() => { throw new Error('Not found'); });

      await expect(service.getEvaluation(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createEvaluation', () => {
    it('should create an evaluation successfully', async () => {
      mockEvalRepo.create.mockResolvedValue(mockEval);

      const result = await service.createEvaluation(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        name: 'Enrollment prediction evaluation',
        type: 'REGRESSION',
        score: 0.89,
        metrics: { rmse: 0.12, r2: 0.89 },
      } as never);

      expect(result).toEqual(mockEval);
    });
  });

  describe('updateEvaluation', () => {
    it('should update an evaluation', async () => {
      mockEvalRepo.findById.mockResolvedValue(mockEval);
      mockEvalRepo.update.mockResolvedValue({ ...mockEval, score: 0.95 });

      const result = await service.updateEvaluation(SCHOOL_ID, EVAL_ID, { score: 0.95 });

      expect(result.score).toBe(0.95);
    });
  });

  describe('deleteEvaluation', () => {
    it('should delete an evaluation', async () => {
      mockEvalRepo.findById.mockResolvedValue(mockEval);
      mockEvalRepo.delete.mockResolvedValue(undefined);

      await service.deleteEvaluation(SCHOOL_ID, EVAL_ID);

      expect(mockEvalRepo.delete).toHaveBeenCalledWith(EVAL_ID);
    });
  });

  describe('listModelEvaluations', () => {
    it('should list model evaluations', async () => {
      mockModelEvalRepo.findAllBySchool.mockResolvedValue([mockModelEval]);

      const result = await service.listModelEvaluations(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getModelEvaluation', () => {
    it('should retrieve a model evaluation by id', async () => {
      mockModelEvalRepo.findById.mockResolvedValue(mockModelEval);

      const result = await service.getModelEvaluation(SCHOOL_ID, MODEL_EVAL_ID);

      expect(result).toEqual(mockModelEval);
    });
  });

  describe('createModelEvaluation', () => {
    it('should create a model evaluation', async () => {
      mockModelEvalRepo.create.mockResolvedValue(mockModelEval);

      const result = await service.createModelEvaluation(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        modelName: 'Enrollment Predictor',
        accuracy: 0.92,
        precision: 0.91,
        recall: 0.88,
        f1Score: 0.895,
      } as never);

      expect(result.accuracy).toBe(0.92);
    });
  });

  describe('listAgentEvaluations', () => {
    it('should list agent evaluations', async () => {
      mockAgentEvalRepo.findAllBySchool.mockResolvedValue([mockAgentEval]);

      const result = await service.listAgentEvaluations(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getAgentEvaluation', () => {
    it('should retrieve an agent evaluation by id', async () => {
      mockAgentEvalRepo.findById.mockResolvedValue(mockAgentEval);

      const result = await service.getAgentEvaluation(SCHOOL_ID, AGENT_EVAL_ID);

      expect(result).toEqual(mockAgentEval);
    });
  });

  describe('createAgentEvaluation', () => {
    it('should create an agent evaluation', async () => {
      mockAgentEvalRepo.create.mockResolvedValue(mockAgentEval);

      const result = await service.createAgentEvaluation(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        agentId: 'agent-1',
        agentName: 'Analytics Agent',
        missionSuccessRate: 0.87,
        averageScore: 0.91,
      } as never);

      expect(result.agentName).toBe('Analytics Agent');
    });
  });

  describe('getAIEvaluationStats', () => {
    it('should return stats', async () => {
      mockEvalRepo.findAllBySchool.mockResolvedValue([mockEval]);
      mockModelEvalRepo.findAllBySchool.mockResolvedValue([mockModelEval]);
      mockAgentEvalRepo.findAllBySchool.mockResolvedValue([mockAgentEval]);

      const result = await service.getAIEvaluationStats(SCHOOL_ID);

      expect(result.totalEvaluations).toBe(1);
      expect(result.totalModelEvaluations).toBe(1);
      expect(result.totalAgentEvaluations).toBe(1);
    });
  });
});
