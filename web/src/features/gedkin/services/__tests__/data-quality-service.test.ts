import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DataQualityService } from '../data-quality-service';

const mockQualityRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByDomainId: vi.fn(),
  findByProductId: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const QUALITY_ID = '660e8400-e29b-41d4-a716-446655440001';
const DOMAIN_ID = '770e8400-e29b-41d4-a716-446655440002';
const PRODUCT_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockQuality = {
  id: QUALITY_ID,
  school_id: SCHOOL_ID,
  domainId: DOMAIN_ID,
  productId: PRODUCT_ID,
  completeness: 95,
  consistency: 90,
  freshness: 85,
  accuracy: 92,
  overallScore: 90.5,
  issues: ['Missing email for 3 records'],
  checkedAt: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: DataQualityService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new DataQualityService(mockQualityRepo as never);
});

describe('DataQualityService', () => {
  describe('listQualityChecks', () => {
    it('should list quality checks for a school', async () => {
      mockQualityRepo.findAll.mockResolvedValue({ data: [mockQuality], total: 1, offset: 0, limit: 50 });

      const result = await service.listQualityChecks(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listQualityChecks('')).rejects.toThrow();
    });
  });

  describe('getQualityCheck', () => {
    it('should retrieve a quality check by id', async () => {
      mockQualityRepo.exists.mockResolvedValue(true);
      mockQualityRepo.findById.mockResolvedValue(mockQuality);

      const result = await service.getQualityCheck(SCHOOL_ID, QUALITY_ID);

      expect(result).toEqual(mockQuality);
    });

    it('should throw if quality check not found', async () => {
      mockQualityRepo.exists.mockResolvedValue(false);

      await expect(service.getQualityCheck(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createQualityCheck', () => {
    it('should create a quality check successfully', async () => {
      mockQualityRepo.create.mockResolvedValue(mockQuality);

      const result = await service.createQualityCheck(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        domainId: DOMAIN_ID,
        productId: PRODUCT_ID,
        completeness: 95,
        consistency: 90,
        freshness: 85,
        accuracy: 92,
        overallScore: 90.5,
        issues: ['Missing email for 3 records'],
      });

      expect(result).toEqual(mockQuality);
    });
  });

  describe('updateQualityCheck', () => {
    it('should update a quality check successfully', async () => {
      mockQualityRepo.exists.mockResolvedValue(true);
      mockQualityRepo.findById.mockResolvedValue(mockQuality);
      mockQualityRepo.update.mockResolvedValue({ ...mockQuality, overallScore: 95 });

      const result = await service.updateQualityCheck(SCHOOL_ID, QUALITY_ID, {
        overallScore: 95,
      });

      expect(result.overallScore).toBe(95);
    });

    it('should throw if quality check not found on update', async () => {
      mockQualityRepo.exists.mockResolvedValue(false);

      await expect(service.updateQualityCheck(SCHOOL_ID, 'nonexistent', { overallScore: 95 })).rejects.toThrow();
    });
  });

  describe('deleteQualityCheck', () => {
    it('should soft delete a quality check', async () => {
      mockQualityRepo.exists.mockResolvedValue(true);
      mockQualityRepo.findById.mockResolvedValue(mockQuality);
      mockQualityRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteQualityCheck(SCHOOL_ID, QUALITY_ID);

      expect(mockQualityRepo.softDelete).toHaveBeenCalledWith(QUALITY_ID, SCHOOL_ID);
    });
  });

  describe('listByDomain', () => {
    it('should list quality checks by domain', async () => {
      mockQualityRepo.findByDomainId.mockResolvedValue({ data: [mockQuality], total: 1, offset: 0, limit: 50 });

      const result = await service.listByDomain(SCHOOL_ID, DOMAIN_ID);

      expect(result.data).toHaveLength(1);
    });
  });

  describe('listByProduct', () => {
    it('should list quality checks by product', async () => {
      mockQualityRepo.findByProductId.mockResolvedValue({ data: [mockQuality], total: 1, offset: 0, limit: 50 });

      const result = await service.listByProduct(SCHOOL_ID, PRODUCT_ID);

      expect(result.data).toHaveLength(1);
    });
  });

  describe('getOverallQualityScore', () => {
    it('should return overall quality score', async () => {
      mockQualityRepo.findByDomainId.mockResolvedValue({ data: [mockQuality], total: 1, offset: 0, limit: 1000 });

      const result = await service.getOverallQualityScore(SCHOOL_ID, DOMAIN_ID);

      expect(result).toBe(90.5);
    });

    it('should return 0 when no quality checks exist', async () => {
      mockQualityRepo.findByDomainId.mockResolvedValue({ data: [], total: 0, offset: 0, limit: 1000 });

      const result = await service.getOverallQualityScore(SCHOOL_ID, DOMAIN_ID);

      expect(result).toBe(0);
    });
  });

  describe('getQualityTrends', () => {
    it('should return quality trends', async () => {
      mockQualityRepo.findByProductId.mockResolvedValue({ data: [mockQuality], total: 1, offset: 0, limit: 100 });

      const result = await service.getQualityTrends(SCHOOL_ID, PRODUCT_ID);

      expect(result).toHaveLength(1);
      expect(result[0].score).toBe(90.5);
    });
  });
});
