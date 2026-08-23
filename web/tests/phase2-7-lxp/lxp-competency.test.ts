import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpCompetencyService } from '@/features/lxp/services/lxp-competency.service';

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  in: vi.fn().mockReturnThis(),
  single: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  range: vi.fn().mockReturnThis(),
  maybeSingle: vi.fn().mockReturnThis(),
  data: null as Record<string, unknown> | null,
  error: null as { message: string } | null,
};

describe('LxpCompetencyService', () => {
  let service: LxpCompetencyService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpCompetencyService(mockSupabase as never);
  });

  describe('GetCompetency', () => {
    it('should getCompetency competency successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetCompetency('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when competency not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetCompetency('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getCompetency', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetCompetency('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getCompetency', async () => {
      await expect(service.GetCompetency('')).rejects.toThrow();
    });
  });
  describe('CreateCompetency', () => {
    it('should createCompetency competency successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.CreateCompetency('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when competency not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.CreateCompetency('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during createCompetency', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.CreateCompetency('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for createCompetency', async () => {
      await expect(service.CreateCompetency('')).rejects.toThrow();
    });
  });
  describe('UpdateCompetency', () => {
    it('should updateCompetency competency successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.UpdateCompetency('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when competency not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.UpdateCompetency('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during updateCompetency', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.UpdateCompetency('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for updateCompetency', async () => {
      await expect(service.UpdateCompetency('')).rejects.toThrow();
    });
  });
  describe('DeleteCompetency', () => {
    it('should deleteCompetency competency successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.DeleteCompetency('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when competency not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.DeleteCompetency('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during deleteCompetency', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.DeleteCompetency('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for deleteCompetency', async () => {
      await expect(service.DeleteCompetency('')).rejects.toThrow();
    });
  });
  describe('AssessCompetency', () => {
    it('should assessCompetency competency successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.AssessCompetency('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when competency not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.AssessCompetency('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during assessCompetency', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.AssessCompetency('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for assessCompetency', async () => {
      await expect(service.AssessCompetency('')).rejects.toThrow();
    });
  });
  describe('GetCompetencyFramework', () => {
    it('should getCompetencyFramework competency successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetCompetencyFramework('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when competency not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetCompetencyFramework('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getCompetencyFramework', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetCompetencyFramework('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getCompetencyFramework', async () => {
      await expect(service.GetCompetencyFramework('')).rejects.toThrow();
    });
  });
  describe('AddFramework', () => {
    it('should addFramework competency successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.AddFramework('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when competency not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.AddFramework('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during addFramework', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.AddFramework('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for addFramework', async () => {
      await expect(service.AddFramework('')).rejects.toThrow();
    });
  });
  describe('GetProficiencyLevels', () => {
    it('should getProficiencyLevels competency successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetProficiencyLevels('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when competency not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetProficiencyLevels('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getProficiencyLevels', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetProficiencyLevels('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getProficiencyLevels', async () => {
      await expect(service.GetProficiencyLevels('')).rejects.toThrow();
    });
  });
  describe('GetGapAnalysis', () => {
    it('should getGapAnalysis competency successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetGapAnalysis('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when competency not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetGapAnalysis('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getGapAnalysis', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetGapAnalysis('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getGapAnalysis', async () => {
      await expect(service.GetGapAnalysis('')).rejects.toThrow();
    });
  });
  describe('GetCompetencyPath', () => {
    it('should getCompetencyPath competency successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetCompetencyPath('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when competency not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetCompetencyPath('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getCompetencyPath', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetCompetencyPath('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getCompetencyPath', async () => {
      await expect(service.GetCompetencyPath('')).rejects.toThrow();
    });
  });

});
