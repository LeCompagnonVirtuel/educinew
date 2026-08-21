import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ObservatoryService } from '../observatory-service';

const mockIndicatorRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByCategory: vi.fn(),
  findByCountry: vi.fn(),
  findByPeriod: vi.fn(),
};

const mockDashboardRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const INDICATOR_ID = '660e8400-e29b-41d4-a716-446655440001';
const DASHBOARD_ID = '770e8400-e29b-41d4-a716-446655440002';

const mockIndicator = {
  id: INDICATOR_ID,
  school_id: SCHOOL_ID,
  name: 'Enrollment Rate',
  category: 'ENROLLMENT',
  value: 85.5,
  unit: '%',
  frequency: 'ANNUAL',
  country: 'Senegal',
  region: 'Dakar',
  period: '2024',
  source: 'UNESCO',
  methodology: 'Census',
  confidence: 0.95,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockDashboard = {
  id: DASHBOARD_ID,
  school_id: SCHOOL_ID,
  name: 'Education Overview',
  type: 'OVERVIEW',
  indicators: [INDICATOR_ID],
  filters: { country: 'Senegal' },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: ObservatoryService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new ObservatoryService(
    mockIndicatorRepo as never,
    mockDashboardRepo as never,
  );
});

describe('ObservatoryService', () => {
  describe('listIndicators', () => {
    it('should list indicators for a school', async () => {
      mockIndicatorRepo.findAll.mockResolvedValue({ data: [mockIndicator], total: 1, offset: 0, limit: 50 });

      const result = await service.listIndicators(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listIndicators('')).rejects.toThrow();
    });
  });

  describe('getIndicator', () => {
    it('should retrieve an indicator by id', async () => {
      mockIndicatorRepo.exists.mockResolvedValue(true);
      mockIndicatorRepo.findById.mockResolvedValue(mockIndicator);

      const result = await service.getIndicator(SCHOOL_ID, INDICATOR_ID);

      expect(result).toEqual(mockIndicator);
    });

    it('should throw if indicator not found', async () => {
      mockIndicatorRepo.exists.mockResolvedValue(false);

      await expect(service.getIndicator(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createIndicator', () => {
    it('should create an indicator successfully', async () => {
      mockIndicatorRepo.create.mockResolvedValue(mockIndicator);

      const result = await service.createIndicator(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'Enrollment Rate',
        category: 'ENROLLMENT',
        value: 85.5,
        unit: '%',
        frequency: 'ANNUAL',
        country: 'Senegal',
        region: 'Dakar',
        period: '2024',
        source: 'UNESCO',
        methodology: 'Census',
        confidence: 0.95,
      });

      expect(result).toEqual(mockIndicator);
    });
  });

  describe('updateIndicator', () => {
    it('should update an indicator successfully', async () => {
      mockIndicatorRepo.exists.mockResolvedValue(true);
      mockIndicatorRepo.findById.mockResolvedValue(mockIndicator);
      mockIndicatorRepo.update.mockResolvedValue({ ...mockIndicator, value: 90 });

      const result = await service.updateIndicator(SCHOOL_ID, INDICATOR_ID, {
        value: 90,
      });

      expect(result.value).toBe(90);
    });

    it('should throw if indicator not found on update', async () => {
      mockIndicatorRepo.exists.mockResolvedValue(false);

      await expect(service.updateIndicator(SCHOOL_ID, 'nonexistent', { value: 90 })).rejects.toThrow();
    });
  });

  describe('deleteIndicator', () => {
    it('should soft delete an indicator', async () => {
      mockIndicatorRepo.exists.mockResolvedValue(true);
      mockIndicatorRepo.findById.mockResolvedValue(mockIndicator);
      mockIndicatorRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteIndicator(SCHOOL_ID, INDICATOR_ID);

      expect(mockIndicatorRepo.softDelete).toHaveBeenCalledWith(INDICATOR_ID, SCHOOL_ID);
    });
  });

  describe('listByCategory', () => {
    it('should list indicators by category', async () => {
      mockIndicatorRepo.findByCategory.mockResolvedValue({ data: [mockIndicator], total: 1, offset: 0, limit: 50 });

      const result = await service.listByCategory(SCHOOL_ID, 'ENROLLMENT');

      expect(result.data).toHaveLength(1);
    });
  });

  describe('listByCountry', () => {
    it('should list indicators by country', async () => {
      mockIndicatorRepo.findByCountry.mockResolvedValue({ data: [mockIndicator], total: 1, offset: 0, limit: 50 });

      const result = await service.listByCountry(SCHOOL_ID, 'Senegal');

      expect(result.data).toHaveLength(1);
    });
  });

  describe('createDashboard', () => {
    it('should create a dashboard successfully', async () => {
      mockDashboardRepo.create.mockResolvedValue(mockDashboard);

      const result = await service.createDashboard(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'Education Overview',
        type: 'OVERVIEW',
        indicators: [INDICATOR_ID],
        filters: { country: 'Senegal' },
      });

      expect(result).toEqual(mockDashboard);
    });
  });

  describe('getObservatoryStats', () => {
    it('should return observatory statistics', async () => {
      mockIndicatorRepo.findAll.mockResolvedValue({ data: [mockIndicator], total: 1, offset: 0, limit: 1000 });
      mockDashboardRepo.findAll.mockResolvedValue({ data: [mockDashboard], total: 1, offset: 0, limit: 1000 });

      const result = await service.getObservatoryStats(SCHOOL_ID);

      expect(result.totalIndicators).toBe(1);
      expect(result.totalDashboards).toBe(1);
      expect(result.byCategory['ENROLLMENT']).toBe(1);
      expect(result.byCountry['Senegal']).toBe(1);
    });
  });
});
