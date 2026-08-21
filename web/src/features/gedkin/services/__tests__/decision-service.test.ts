import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DecisionService } from '../decision-service';

const mockRecommendationRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByAnalysisType: vi.fn(),
};

const mockImpactRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByPolicyId: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const RECOMMENDATION_ID = '660e8400-e29b-41d4-a716-446655440001';
const IMPACT_ID = '770e8400-e29b-41d4-a716-446655440002';
const POLICY_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockRecommendation = {
  id: RECOMMENDATION_ID,
  school_id: SCHOOL_ID,
  title: 'Increase teacher training budget',
  description: 'Analysis shows teacher training improves outcomes',
  options: ['Increase by 10%', 'Increase by 20%', 'Maintain current'],
  analysisType: 'COST_BENEFIT',
  confidence: 0.87,
  evidence: ['Training correlation data', 'Budget allocation history'],
  risks: ['Budget overrun', 'Low participation'],
  benefits: ['Improved outcomes', 'Higher retention'],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockImpact = {
  id: IMPACT_ID,
  school_id: SCHOOL_ID,
  policyId: POLICY_ID,
  dimension: 'Enrollment',
  baselineValue: 80,
  projectedValue: 88,
  impactScore: 0.1,
  confidence: 0.9,
  timeframe: '2024-2026',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: DecisionService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new DecisionService(
    mockRecommendationRepo as never,
    mockImpactRepo as never,
  );
});

describe('DecisionService', () => {
  describe('listRecommendations', () => {
    it('should list recommendations for a school', async () => {
      mockRecommendationRepo.findAll.mockResolvedValue({ data: [mockRecommendation], total: 1, offset: 0, limit: 50 });

      const result = await service.listRecommendations(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listRecommendations('')).rejects.toThrow();
    });
  });

  describe('getRecommendation', () => {
    it('should retrieve a recommendation by id', async () => {
      mockRecommendationRepo.exists.mockResolvedValue(true);
      mockRecommendationRepo.findById.mockResolvedValue(mockRecommendation);

      const result = await service.getRecommendation(SCHOOL_ID, RECOMMENDATION_ID);

      expect(result).toEqual(mockRecommendation);
    });

    it('should throw if recommendation not found', async () => {
      mockRecommendationRepo.exists.mockResolvedValue(false);

      await expect(service.getRecommendation(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createRecommendation', () => {
    it('should create a recommendation successfully', async () => {
      mockRecommendationRepo.create.mockResolvedValue(mockRecommendation);

      const result = await service.createRecommendation(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        title: 'Increase teacher training budget',
        description: 'Analysis shows teacher training improves outcomes',
        options: ['Increase by 10%', 'Increase by 20%', 'Maintain current'],
        analysisType: 'COST_BENEFIT',
        confidence: 0.87,
        evidence: ['Training correlation data', 'Budget allocation history'],
        risks: ['Budget overrun', 'Low participation'],
        benefits: ['Improved outcomes', 'Higher retention'],
      });

      expect(result).toEqual(mockRecommendation);
    });
  });

  describe('deleteRecommendation', () => {
    it('should soft delete a recommendation', async () => {
      mockRecommendationRepo.exists.mockResolvedValue(true);
      mockRecommendationRepo.findById.mockResolvedValue(mockRecommendation);
      mockRecommendationRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteRecommendation(SCHOOL_ID, RECOMMENDATION_ID);

      expect(mockRecommendationRepo.softDelete).toHaveBeenCalledWith(RECOMMENDATION_ID, SCHOOL_ID);
    });
  });

  describe('listByAnalysisType', () => {
    it('should list recommendations by analysis type', async () => {
      mockRecommendationRepo.findByAnalysisType.mockResolvedValue({ data: [mockRecommendation], total: 1, offset: 0, limit: 50 });

      const result = await service.listByAnalysisType(SCHOOL_ID, 'COST_BENEFIT');

      expect(result.data).toHaveLength(1);
    });
  });

  describe('createImpactAnalysis', () => {
    it('should create an impact analysis successfully', async () => {
      mockImpactRepo.create.mockResolvedValue(mockImpact);

      const result = await service.createImpactAnalysis(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        policyId: POLICY_ID,
        dimension: 'Enrollment',
        baselineValue: 80,
        projectedValue: 88,
        impactScore: 0.1,
        confidence: 0.9,
        timeframe: '2024-2026',
      });

      expect(result).toEqual(mockImpact);
    });
  });

  describe('listByPolicy', () => {
    it('should list impact analyses by policy', async () => {
      mockImpactRepo.findByPolicyId.mockResolvedValue({ data: [mockImpact], total: 1, offset: 0, limit: 50 });

      const result = await service.listByPolicy(SCHOOL_ID, POLICY_ID);

      expect(result.data).toHaveLength(1);
    });
  });

  describe('getDecisionStats', () => {
    it('should return decision statistics', async () => {
      mockRecommendationRepo.findAll.mockResolvedValue({ data: [mockRecommendation], total: 1, offset: 0, limit: 1000 });
      mockImpactRepo.findAll.mockResolvedValue({ data: [mockImpact], total: 1, offset: 0, limit: 1000 });

      const result = await service.getDecisionStats(SCHOOL_ID);

      expect(result.totalRecommendations).toBe(1);
      expect(result.totalImpactAnalyses).toBe(1);
      expect(result.byAnalysisType['COST_BENEFIT']).toBe(1);
      expect(result.averageConfidence).toBe(0.87);
    });
  });
});
