import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipScenarioSimulatorService } from '../scenario-simulator.service';

const mockScenarioRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockRunRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockComparisonRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const SCENARIO_ID = '660e8400-e29b-41d4-a716-446655440001';
const RUN_ID = '770e8400-e29b-41d4-a716-446655440002';
const COMP_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockScenario = {
  id: SCENARIO_ID,
  school_id: SCHOOL_ID,
  name: 'Budget increase scenario',
  description: 'What if we increase budget by 20%',
  parameters: { budgetChange: 0.2 },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockRun = {
  id: RUN_ID,
  school_id: SCHOOL_ID,
  scenarioId: SCENARIO_ID,
  status: 'completed',
  completedAt: new Date().toISOString(),
  results: { outcome: 'positive' },
  impacts: {},
  risks: [],
  createdAt: new Date().toISOString(),
};

const mockComparison = {
  id: COMP_ID,
  school_id: SCHOOL_ID,
  scenarioIds: [SCENARIO_ID],
  summary: 'Scenario A is better',
  winnerId: SCENARIO_ID,
  createdAt: new Date().toISOString(),
};

let service: GeaesipScenarioSimulatorService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipScenarioSimulatorService(
    mockScenarioRepo as never,
    mockRunRepo as never,
    mockComparisonRepo as never,
  );
});

describe('GeaesipScenarioSimulatorService', () => {
  describe('listScenarios', () => {
    it('should list scenarios for a school', async () => {
      mockScenarioRepo.findAllBySchool.mockResolvedValue([mockScenario]);

      const result = await service.listScenarios(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listScenarios('')).rejects.toThrow();
    });
  });

  describe('getScenario', () => {
    it('should retrieve a scenario by id', async () => {
      mockScenarioRepo.findById.mockResolvedValue(mockScenario);

      const result = await service.getScenario(SCHOOL_ID, SCENARIO_ID);

      expect(result).toEqual(mockScenario);
    });

    it('should throw if scenario not found', async () => {
      mockScenarioRepo.findById.mockImplementation(() => { throw new Error('Not found'); });

      await expect(service.getScenario(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createScenario', () => {
    it('should create a scenario successfully', async () => {
      mockScenarioRepo.create.mockResolvedValue(mockScenario);

      const result = await service.createScenario(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        name: 'Budget increase scenario',
        description: 'What if we increase budget by 20%',
        parameters: { budgetChange: 0.2 },
      } as never);

      expect(result).toEqual(mockScenario);
    });
  });

  describe('updateScenario', () => {
    it('should update a scenario', async () => {
      mockScenarioRepo.findById.mockResolvedValue(mockScenario);
      mockScenarioRepo.update.mockResolvedValue({ ...mockScenario, name: 'Updated' });

      const result = await service.updateScenario(SCHOOL_ID, SCENARIO_ID, { name: 'Updated' });

      expect(result.name).toBe('Updated');
    });
  });

  describe('deleteScenario', () => {
    it('should delete a scenario', async () => {
      mockScenarioRepo.findById.mockResolvedValue(mockScenario);
      mockScenarioRepo.delete.mockResolvedValue(undefined);

      await service.deleteScenario(SCHOOL_ID, SCENARIO_ID);

      expect(mockScenarioRepo.delete).toHaveBeenCalledWith(SCENARIO_ID);
    });
  });

  describe('listRuns', () => {
    it('should list runs', async () => {
      mockRunRepo.findAllBySchool.mockResolvedValue([mockRun]);

      const result = await service.listRuns(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getRun', () => {
    it('should retrieve a run by id', async () => {
      mockRunRepo.findById.mockResolvedValue(mockRun);

      const result = await service.getRun(SCHOOL_ID, RUN_ID);

      expect(result).toEqual(mockRun);
    });
  });

  describe('completeRun', () => {
    it('should complete a run with results', async () => {
      mockRunRepo.findById.mockResolvedValue(mockRun);
      mockRunRepo.update.mockResolvedValue({ ...mockRun, completedAt: new Date().toISOString() });

      const result = await service.completeRun(SCHOOL_ID, RUN_ID, {
        results: { outcome: 'positive' },
        impacts: {},
        risks: [],
      });

      expect(result.completedAt).toBeDefined();
    });
  });

  describe('listComparisons', () => {
    it('should list comparisons', async () => {
      mockComparisonRepo.findAllBySchool.mockResolvedValue([mockComparison]);

      const result = await service.listComparisons(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getComparison', () => {
    it('should retrieve a comparison by id', async () => {
      mockComparisonRepo.findById.mockResolvedValue(mockComparison);

      const result = await service.getComparison(SCHOOL_ID, COMP_ID);

      expect(result).toEqual(mockComparison);
    });
  });

  describe('getScenarioSimulatorStats', () => {
    it('should return stats', async () => {
      mockScenarioRepo.findAllBySchool.mockResolvedValue([mockScenario]);
      mockRunRepo.findAllBySchool.mockResolvedValue([mockRun]);
      mockComparisonRepo.findAllBySchool.mockResolvedValue([]);

      const result = await service.getScenarioSimulatorStats(SCHOOL_ID);

      expect(result.totalScenarios).toBe(1);
      expect(result.totalRuns).toBe(1);
      expect(result.completedRuns).toBe(1);
      expect(result.totalComparisons).toBe(0);
    });
  });
});
