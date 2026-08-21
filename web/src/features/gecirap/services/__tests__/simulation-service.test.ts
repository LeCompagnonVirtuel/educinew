import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SimulationService } from '../simulation-service';
import { GecirapNotFoundError } from '@educi/errors';

const mockSimulationRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByTwinId: vi.fn(),
};

const mockScenarioRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByTwinId: vi.fn(),
  findDefaults: vi.fn(),
};

const mockResultRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findBySimulationId: vi.fn(),
  findByScenarioId: vi.fn(),
  findLatest: vi.fn(),
};

const mockTwinRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const TWIN_ID = '660e8400-e29b-41d4-a716-446655440001';
const SIM_ID = '770e8400-e29b-41d4-a716-446655440002';
const SCENARIO_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockSimulation = {
  id: SIM_ID,
  school_id: SCHOOL_ID,
  twin_id: TWIN_ID,
  simulation_name: 'capacity-planning-aug-2026',
  simulation_type: 'CAPACITY',
  status: 'COMPLETED',
  parameters: { cpu_target: 80, ram_target: 75 },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockScenario = {
  id: SCENARIO_ID,
  school_id: SCHOOL_ID,
  twin_id: TWIN_ID,
  scenario_name: 'baseline',
  description: 'Baseline scenario',
  scenario_type: 'CUSTOM',
  variables: { node_count: 5, node_type: 'MEDIUM' },
  is_default: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockResult = {
  id: 'sres-001',
  school_id: SCHOOL_ID,
  simulation_id: SIM_ID,
  scenario_id: SCENARIO_ID,
  result_data: { total_cost: 5000, coverage_score: 0.92 },
  metrics: { cost: 5000, availability: 99.5, score: 85 },
  insights: ['Optimize CPU allocation'],
  generated_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: SimulationService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new SimulationService(
    mockSimulationRepo as never,
    mockScenarioRepo as never,
    mockResultRepo as never,
    mockTwinRepo as never,
  );
});

describe('SimulationService', () => {
  describe('listSimulations', () => {
    it('should list simulations for a school', async () => {
      mockSimulationRepo.findAll.mockResolvedValue({ data: [mockSimulation], total: 1 });

      const result = await service.listSimulations(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listSimulations('')).rejects.toThrow();
    });
  });

  describe('getSimulation', () => {
    it('should retrieve a simulation by id', async () => {
      mockSimulationRepo.exists.mockResolvedValue(true);
      mockSimulationRepo.findById.mockResolvedValue(mockSimulation);

      const result = await service.getSimulation(SCHOOL_ID, SIM_ID);

      expect(result).toEqual(mockSimulation);
    });

    it('should throw if simulation not found', async () => {
      mockSimulationRepo.exists.mockResolvedValue(false);

      await expect(service.getSimulation(SCHOOL_ID, 'nonexistent')).rejects.toThrow(GecirapNotFoundError);
    });
  });

  describe('createSimulation', () => {
    it('should create a simulation successfully', async () => {
      mockTwinRepo.exists.mockResolvedValue(true);
      mockSimulationRepo.create.mockResolvedValue(mockSimulation);

      const result = await service.createSimulation(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        twinId: TWIN_ID,
        name: 'capacity-planning-aug-2026',
        type: 'CAPACITY',
        parameters: { cpu_target: 80, ram_target: 75 },
      });

      expect(result).toEqual(mockSimulation);
    });
  });

  describe('createScenario', () => {
    it('should create a scenario', async () => {
      mockTwinRepo.exists.mockResolvedValue(true);
      mockScenarioRepo.create.mockResolvedValue(mockScenario);

      const result = await service.createScenario(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        twinId: TWIN_ID,
        name: 'baseline',
        description: 'Baseline scenario',
        assumptions: { node_count: 5, node_type: 'MEDIUM' },
      });

      expect(result).toEqual(mockScenario);
    });
  });

  describe('createResult', () => {
    it('should create a simulation result', async () => {
      mockResultRepo.create.mockResolvedValue(mockResult);

      const result = await service.createResult(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        simulationId: SIM_ID,
        scenarioId: SCENARIO_ID,
        cost: 5000,
        availability: 99.5,
        impact: { total_cost: 5000, coverage_score: 0.92 },
        risks: [],
        recommendations: ['Optimize CPU allocation'],
      });

      expect(result).toEqual(mockResult);
    });
  });

  describe('createTemplate', () => {
    it('should create a simulation template', async () => {
      const result = await service.createTemplate(SCHOOL_ID, {
        name: 'standard-capacity',
        simulation_type: 'CAPACITY',
        description: 'Standard capacity planning template',
        is_public: true,
        template_parameters: { cpu_target: 80 },
      });

      expect(result.name).toBe('standard-capacity');
      expect(result.simulation_type).toBe('CAPACITY');
    });
  });

  describe('deleteSimulation', () => {
    it('should soft delete a simulation', async () => {
      mockSimulationRepo.exists.mockResolvedValue(true);
      mockSimulationRepo.findById.mockResolvedValue(mockSimulation);
      mockSimulationRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteSimulation(SCHOOL_ID, SIM_ID);

      expect(mockSimulationRepo.softDelete).toHaveBeenCalledWith(SIM_ID, SCHOOL_ID);
    });
  });

  describe('getSimulationOverview', () => {
    it('should return simulation overview stats', async () => {
      mockSimulationRepo.findAll.mockImplementation((_schoolId: string, params?: Record<string, unknown>) => {
        if (params?.status === 'RUNNING') {
          return Promise.resolve({ data: [], total: 0 });
        }
        return Promise.resolve({ data: [mockSimulation], total: 1 });
      });
      mockResultRepo.findAll.mockResolvedValue({ data: [mockResult], total: 1 });

      const result = await service.getSimulationOverview(SCHOOL_ID);

      expect(result.totalSimulations).toBe(1);
      expect(result.activeSimulations).toBe(0);
      expect(result.avgScore).toBe(85);
    });
  });
});
