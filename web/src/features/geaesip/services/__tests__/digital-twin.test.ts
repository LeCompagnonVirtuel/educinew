import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipDigitalTwinService } from '../digital-twin.service';

const mockTwinRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockStateRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockSimulationRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const TWIN_ID = '660e8400-e29b-41d4-a716-446655440001';
const STATE_ID = '770e8400-e29b-41d4-a716-446655440002';
const SIM_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockTwin = {
  id: TWIN_ID,
  school_id: SCHOOL_ID,
  name: 'Campus Digital Twin',
  type: 'INFRASTRUCTURE',
  status: 'active',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockState = {
  id: STATE_ID,
  school_id: SCHOOL_ID,
  twinId: TWIN_ID,
  snapshot: { rooms: 20, occupancy: 0.75 },
  lastUpdated: new Date().toISOString(),
};

const mockSimulation = {
  id: SIM_ID,
  school_id: SCHOOL_ID,
  twinId: TWIN_ID,
  scenario: 'Capacity expansion',
  status: 'completed',
  completedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
};

let service: GeaesipDigitalTwinService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipDigitalTwinService(
    mockTwinRepo as never,
    mockStateRepo as never,
    mockSimulationRepo as never,
  );
});

describe('GeaesipDigitalTwinService', () => {
  describe('listTwins', () => {
    it('should list twins for a school', async () => {
      mockTwinRepo.findAllBySchool.mockResolvedValue([mockTwin]);

      const result = await service.listTwins(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listTwins('')).rejects.toThrow();
    });
  });

  describe('getTwin', () => {
    it('should retrieve a twin by id', async () => {
      mockTwinRepo.findById.mockResolvedValue(mockTwin);

      const result = await service.getTwin(SCHOOL_ID, TWIN_ID);

      expect(result).toEqual(mockTwin);
    });

    it('should throw if twin not found', async () => {
      mockTwinRepo.findById.mockImplementation(() => { throw new Error('Not found'); });

      await expect(service.getTwin(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createTwin', () => {
    it('should create a twin successfully', async () => {
      mockTwinRepo.create.mockResolvedValue(mockTwin);

      const result = await service.createTwin(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        name: 'Campus Digital Twin',
        type: 'INFRASTRUCTURE',
        status: 'active',
      } as never);

      expect(result).toEqual(mockTwin);
    });
  });

  describe('updateTwin', () => {
    it('should update a twin', async () => {
      mockTwinRepo.findById.mockResolvedValue(mockTwin);
      mockTwinRepo.update.mockResolvedValue({ ...mockTwin, name: 'Updated' });

      const result = await service.updateTwin(SCHOOL_ID, TWIN_ID, { name: 'Updated' });

      expect(result.name).toBe('Updated');
    });
  });

  describe('deleteTwin', () => {
    it('should delete a twin', async () => {
      mockTwinRepo.findById.mockResolvedValue(mockTwin);
      mockTwinRepo.delete.mockResolvedValue(undefined);

      await service.deleteTwin(SCHOOL_ID, TWIN_ID);

      expect(mockTwinRepo.delete).toHaveBeenCalledWith(TWIN_ID);
    });
  });

  describe('listStates', () => {
    it('should list states', async () => {
      mockStateRepo.findAllBySchool.mockResolvedValue([mockState]);

      const result = await service.listStates(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getState', () => {
    it('should retrieve a state by id', async () => {
      mockStateRepo.findById.mockResolvedValue(mockState);

      const result = await service.getState(SCHOOL_ID, STATE_ID);

      expect(result).toEqual(mockState);
    });
  });

  describe('listSimulations', () => {
    it('should list simulations', async () => {
      mockSimulationRepo.findAllBySchool.mockResolvedValue([mockSimulation]);

      const result = await service.listSimulations(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getSimulation', () => {
    it('should retrieve a simulation by id', async () => {
      mockSimulationRepo.findById.mockResolvedValue(mockSimulation);

      const result = await service.getSimulation(SCHOOL_ID, SIM_ID);

      expect(result).toEqual(mockSimulation);
    });

    it('should throw if simulation school_id mismatch', async () => {
      mockSimulationRepo.findById.mockResolvedValue({ ...mockSimulation, school_id: 'other' });

      await expect(service.getSimulation(SCHOOL_ID, SIM_ID)).rejects.toThrow();
    });
  });

  describe('getDigitalTwinStats', () => {
    it('should return stats', async () => {
      mockTwinRepo.findAllBySchool.mockResolvedValue([mockTwin]);
      mockStateRepo.findAllBySchool.mockResolvedValue([mockState]);
      mockSimulationRepo.findAllBySchool.mockResolvedValue([mockSimulation]);

      const result = await service.getDigitalTwinStats(SCHOOL_ID);

      expect(result.totalTwins).toBe(1);
      expect(result.totalStates).toBe(1);
      expect(result.totalSimulations).toBe(1);
      expect(result.completedSimulations).toBe(1);
    });
  });
});
