import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LxpDataImportService } from '@/features/lxp/services/lxp-data-import.service';

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

describe('LxpDataImportService', () => {
  let service: LxpDataImportService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
    service = new LxpDataImportService(mockSupabase as never);
  });

  describe('GetDataImport', () => {
    it('should getDataImport data import successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetDataImport('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when data import not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetDataImport('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getDataImport', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetDataImport('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getDataImport', async () => {
      await expect(service.GetDataImport('')).rejects.toThrow();
    });
  });
  describe('CreateDataImport', () => {
    it('should createDataImport data import successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.CreateDataImport('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when data import not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.CreateDataImport('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during createDataImport', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.CreateDataImport('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for createDataImport', async () => {
      await expect(service.CreateDataImport('')).rejects.toThrow();
    });
  });
  describe('UpdateDataImport', () => {
    it('should updateDataImport data import successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.UpdateDataImport('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when data import not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.UpdateDataImport('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during updateDataImport', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.UpdateDataImport('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for updateDataImport', async () => {
      await expect(service.UpdateDataImport('')).rejects.toThrow();
    });
  });
  describe('DeleteDataImport', () => {
    it('should deleteDataImport data import successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.DeleteDataImport('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when data import not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.DeleteDataImport('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during deleteDataImport', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.DeleteDataImport('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for deleteDataImport', async () => {
      await expect(service.DeleteDataImport('')).rejects.toThrow();
    });
  });
  describe('StartImport', () => {
    it('should startImport data import successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.StartImport('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when data import not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.StartImport('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during startImport', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.StartImport('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for startImport', async () => {
      await expect(service.StartImport('')).rejects.toThrow();
    });
  });
  describe('GetImportStatus', () => {
    it('should getImportStatus data import successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetImportStatus('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when data import not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetImportStatus('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getImportStatus', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetImportStatus('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getImportStatus', async () => {
      await expect(service.GetImportStatus('')).rejects.toThrow();
    });
  });
  describe('GetImportErrors', () => {
    it('should getImportErrors data import successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetImportErrors('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when data import not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetImportErrors('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getImportErrors', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetImportErrors('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getImportErrors', async () => {
      await expect(service.GetImportErrors('')).rejects.toThrow();
    });
  });
  describe('GetImportHistory', () => {
    it('should getImportHistory data import successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetImportHistory('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when data import not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetImportHistory('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getImportHistory', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetImportHistory('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getImportHistory', async () => {
      await expect(service.GetImportHistory('')).rejects.toThrow();
    });
  });
  describe('GetImportFormats', () => {
    it('should getImportFormats data import successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetImportFormats('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when data import not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetImportFormats('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getImportFormats', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetImportFormats('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getImportFormats', async () => {
      await expect(service.GetImportFormats('')).rejects.toThrow();
    });
  });
  describe('GetImportTemplates', () => {
    it('should getImportTemplates data import successfully', async () => {
      mockSupabase.data = { id: 'test-1' };
      mockSupabase.single.mockResolvedValue({ data: mockSupabase.data, error: null });
      const result = await service.GetImportTemplates('test-1');
      expect(result).toBeDefined();
    });

    it('should return null when data import not found', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: null });
      const result = await service.GetImportTemplates('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle database errors during getImportTemplates', async () => {
      mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'db error' } });
      await expect(service.GetImportTemplates('test-1')).rejects.toThrow();
    });

    it('should validate input parameters for getImportTemplates', async () => {
      await expect(service.GetImportTemplates('')).rejects.toThrow();
    });
  });

});
