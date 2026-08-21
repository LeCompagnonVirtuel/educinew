import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipApiEventFabricService } from '../api-event-fabric.service';

const mockApiRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockBusRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockSubRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockUsageRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const API_ID = '660e8400-e29b-41d4-a716-446655440001';
const BUS_ID = '770e8400-e29b-41d4-a716-446655440002';
const SUB_ID = '880e8400-e29b-41d4-a716-446655440003';
const USAGE_ID = '990e8400-e29b-41d4-a716-446655440004';

const mockApi = {
  id: API_ID,
  school_id: SCHOOL_ID,
  name: 'Enrollment API',
  endpoint: '/api/enrollment',
  method: 'GET',
  status: 'active',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockBus = {
  id: BUS_ID,
  school_id: SCHOOL_ID,
  name: 'Main Event Bus',
  status: 'active',
  throughput: 1500,
  created_at: new Date().toISOString(),
};

const mockSub = {
  id: SUB_ID,
  school_id: SCHOOL_ID,
  busId: BUS_ID,
  topic: 'enrollment.updated',
  endpoint: '/webhook/enrollment',
  active: true,
  created_at: new Date().toISOString(),
};

const mockUsage = {
  id: USAGE_ID,
  school_id: SCHOOL_ID,
  apiId: API_ID,
  calls: 5200,
  avgLatency: 120,
  errorRate: 0.02,
  timestamp: new Date().toISOString(),
};

let service: GeaesipApiEventFabricService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipApiEventFabricService(
    mockApiRepo as never,
    mockBusRepo as never,
    mockSubRepo as never,
    mockUsageRepo as never,
  );
});

describe('GeaesipApiEventFabricService', () => {
  describe('listAPIs', () => {
    it('should list APIs for a school', async () => {
      mockApiRepo.findAllBySchool.mockResolvedValue([mockApi]);
      const result = await service.listAPIs(SCHOOL_ID);
      expect(result).toHaveLength(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listAPIs('')).rejects.toThrow();
    });
  });

  describe('getAPI', () => {
    it('should retrieve an API by id', async () => {
      mockApiRepo.findById.mockResolvedValue(mockApi);
      const result = await service.getAPI(SCHOOL_ID, API_ID);
      expect(result).toEqual(mockApi);
    });

    it('should throw if API not found', async () => {
      mockApiRepo.findById.mockImplementation(() => { throw new Error('Not found'); });
      await expect(service.getAPI(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createAPI', () => {
    it('should create an API successfully', async () => {
      mockApiRepo.create.mockResolvedValue(mockApi);
      const result = await service.createAPI(SCHOOL_ID, {
        school_id: SCHOOL_ID, name: 'Enrollment API', endpoint: '/api/enrollment',
        method: 'GET', status: 'active',
      } as never);
      expect(result).toEqual(mockApi);
    });
  });

  describe('updateAPI', () => {
    it('should update an API', async () => {
      mockApiRepo.findById.mockResolvedValue(mockApi);
      mockApiRepo.update.mockResolvedValue({ ...mockApi, name: 'Updated' });
      const result = await service.updateAPI(SCHOOL_ID, API_ID, { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });
  });

  describe('deleteAPI', () => {
    it('should delete an API', async () => {
      mockApiRepo.findById.mockResolvedValue(mockApi);
      mockApiRepo.delete.mockResolvedValue(undefined);
      await service.deleteAPI(SCHOOL_ID, API_ID);
      expect(mockApiRepo.delete).toHaveBeenCalledWith(API_ID);
    });
  });

  describe('listEventBuses', () => {
    it('should list event buses', async () => {
      mockBusRepo.findAllBySchool.mockResolvedValue([mockBus]);
      const result = await service.listEventBuses(SCHOOL_ID);
      expect(result).toHaveLength(1);
    });
  });

  describe('getEventBus', () => {
    it('should retrieve an event bus by id', async () => {
      mockBusRepo.findById.mockResolvedValue(mockBus);
      const result = await service.getEventBus(SCHOOL_ID, BUS_ID);
      expect(result).toEqual(mockBus);
    });
  });

  describe('listSubscriptions', () => {
    it('should list subscriptions', async () => {
      mockSubRepo.findAllBySchool.mockResolvedValue([mockSub]);
      const result = await service.listSubscriptions(SCHOOL_ID);
      expect(result).toHaveLength(1);
    });
  });

  describe('createSubscription', () => {
    it('should create a subscription', async () => {
      mockSubRepo.create.mockResolvedValue(mockSub);
      const result = await service.createSubscription(SCHOOL_ID, {
        school_id: SCHOOL_ID, busId: BUS_ID, topic: 'enrollment.updated',
        endpoint: '/webhook/enrollment', active: true,
      } as never);
      expect(result.topic).toBe('enrollment.updated');
    });
  });

  describe('listUsages', () => {
    it('should list API usages', async () => {
      mockUsageRepo.findAllBySchool.mockResolvedValue([mockUsage]);
      const result = await service.listUsages(SCHOOL_ID);
      expect(result).toHaveLength(1);
    });
  });

  describe('getUsage', () => {
    it('should retrieve a usage by id', async () => {
      mockUsageRepo.findById.mockResolvedValue(mockUsage);
      const result = await service.getUsage(SCHOOL_ID, USAGE_ID);
      expect(result).toEqual(mockUsage);
    });
  });

  describe('getApiEventFabricStats', () => {
    it('should return stats', async () => {
      mockApiRepo.findAllBySchool.mockResolvedValue([mockApi]);
      mockBusRepo.findAllBySchool.mockResolvedValue([mockBus]);
      mockSubRepo.findAllBySchool.mockResolvedValue([mockSub]);
      mockUsageRepo.findAllBySchool.mockResolvedValue([mockUsage]);
      const result = await service.getApiEventFabricStats(SCHOOL_ID);
      expect(result.totalAPIs).toBe(1);
      expect(result.totalEventBuses).toBe(1);
      expect(result.totalSubscriptions).toBe(1);
      expect(result.totalUsages).toBe(1);
    });
  });
});
