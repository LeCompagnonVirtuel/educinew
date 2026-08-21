import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SimulationService } from '../simulation-service';

const mockSimulationRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByType: vi.fn(),
  findByStatus: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const SIMULATION_ID = '660e8400-e29b-41d4-a716-446655440001';

const mockSimulation = {
  id: SIMULATION_ID,
  school_id: SCHOOL_ID,
  name: 'Population Growth Simulation',
  description: 'Simulating population growth scenarios',
  type: 'POPULATION',
  status: 'RUNNING',
  parameters: { growthRate: 0.02, horizon: 10 },
  startedAt: new Date().toISOString(),
  completedAt: '',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: SimulationService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new SimulationService(mockSimulationRepo as never);
});

describe('SimulationService', () => {
  describe('listSimulations', () => {
    it('should list simulations for a school', async () => {
      mockSimulationRepo.findAll.mockResolvedValue({ data: [mockSimulation], total: 1, offset: 0, limit: 50 });

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

      const result = await service.getSimulation(SCHOOL_ID, SIMULATION_ID);

      expect(result).toEqual(mockSimulation);
    });

    it('should throw if simulation not found', async () => {
      mockSimulationRepo.exists.mockResolvedValue(false);

      await expect(service.getSimulation(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createSimulation', () => {
    it('should create a simulation successfully', async () => {
      mockSimulationRepo.create.mockResolvedValue(mockSimulation);

      const result = await service.createSimulation(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'Population Growth Simulation',
        description: 'Simulating population growth scenarios',
        type: 'POPULATION',
        status: 'RUNNING',
        parameters: { growthRate: 0.02, horizon: 10 },
      });

      expect(result).toEqual(mockSimulation);
    });
  });

  describe('deleteSimulation', () => {
    it('should soft delete a simulation', async () => {
      mockSimulationRepo.exists.mockResolvedValue(true);
      mockSimulationRepo.findById.mockResolvedValue(mockSimulation);
      mockSimulationRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteSimulation(SCHOOL_ID, SIMULATION_ID);

      expect(mockSimulationRepo.softDelete).toHaveBeenCalledWith(SIMULATION_ID, SCHOOL_ID);
    });
  });

  describe('listByType', () => {
    it('should list simulations by type', async () => {
      mockSimulationRepo.findByType.mockResolvedValue({ data: [mockSimulation], total: 1, offset: 0, limit: 50 });

      const result = await service.listByType(SCHOOL_ID, 'POPULATION');

      expect(result.data).toHaveLength(1);
    });
  });

  describe('listByStatus', () => {
    it('should list simulations by status', async () => {
      mockSimulationRepo.findByStatus.mockResolvedValue({ data: [mockSimulation], total: 1, offset: 0, limit: 50 });

      const result = await service.listByStatus(SCHOOL_ID, 'RUNNING');

      expect(result.data).toHaveLength(1);
    });
  });

  describe('startSimulation', () => {
    it('should start a simulation', async () => {
      mockSimulationRepo.exists.mockResolvedValue(true);
      mockSimulationRepo.findById.mockResolvedValue(mockSimulation);
      mockSimulationRepo.update.mockResolvedValue({ ...mockSimulation, status: 'RUNNING' });

      const result = await service.startSimulation(SCHOOL_ID, SIMULATION_ID);

      expect(result.status).toBe('RUNNING');
    });
  });

  describe('completeSimulation', () => {
    it('should complete a simulation', async () => {
      mockSimulationRepo.exists.mockResolvedValue(true);
      mockSimulationRepo.findById.mockResolvedValue(mockSimulation);
      mockSimulationRepo.update.mockResolvedValue({ ...mockSimulation, status: 'COMPLETED' });

      const result = await service.completeSimulation(SCHOOL_ID, SIMULATION_ID);

      expect(result.status).toBe('COMPLETED');
    });
  });

  describe('failSimulation', () => {
    it('should mark a simulation as failed', async () => {
      mockSimulationRepo.exists.mockResolvedValue(true);
      mockSimulationRepo.findById.mockResolvedValue(mockSimulation);
      mockSimulationRepo.update.mockResolvedValue({ ...mockSimulation, status: 'FAILED' });

      const result = await service.failSimulation(SCHOOL_ID, SIMULATION_ID);

      expect(result.status).toBe('FAILED');
    });
  });

  describe('getSimulationStats', () => {
    it('should return simulation statistics', async () => {
      mockSimulationRepo.findAll.mockResolvedValue({ data: [mockSimulation], total: 1, offset: 0, limit: 1000 });

      const result = await service.getSimulationStats(SCHOOL_ID);

      expect(result.totalSimulations).toBe(1);
      expect(result.byType['POPULATION']).toBe(1);
      expect(result.byStatus['RUNNING']).toBe(1);
    });
  });
});
