import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createExportService } from '../../src/features/analytics/services/export.service';

const mockRepository = {
  exportData: vi.fn(),
  importData: vi.fn(),
};

describe('ExportService', () => {
  let service: ReturnType<typeof createExportService>;

  beforeEach(() => {
    vi.clearAllMocks();
    service = createExportService(mockRepository as any);
  });

  it('should call exportData with dataType, filters, and format', async () => {
    const filters = { schoolId: 'sch-1' };
    mockRepository.exportData.mockResolvedValue({ format: 'pdf', data: [] });
    const result = await service.exportData('students', filters, 'pdf');
    expect(mockRepository.exportData).toHaveBeenCalledWith('students', filters, 'pdf');
    expect(result).toHaveProperty('format');
  });

  it('should call exportData without format', async () => {
    mockRepository.exportData.mockResolvedValue({ format: 'csv', data: [] });
    await service.exportData('teachers');
    expect(mockRepository.exportData).toHaveBeenCalledWith('teachers', undefined, undefined);
  });

  it('should propagate errors from exportData', async () => {
    mockRepository.exportData.mockRejectedValue(new Error('Export error'));
    await expect(service.exportData('students')).rejects.toThrow('Export error');
  });

  it('should call importData with dataType, file, and options', async () => {
    const file = { name: 'data.csv', content: 'name,score\nJohn,90' };
    const options = { validateOnly: false };
    mockRepository.importData.mockResolvedValue({ imported: 10, errors: 0 });
    const result = await service.importData('students', file, options);
    expect(mockRepository.importData).toHaveBeenCalledWith('students', file, options);
    expect(result.imported).toBe(10);
  });

  it('should call importData without options', async () => {
    const file = { name: 'data.csv', content: '' };
    mockRepository.importData.mockResolvedValue({ imported: 0, errors: 0 });
    await service.importData('students', file);
    expect(mockRepository.importData).toHaveBeenCalledWith('students', file, undefined);
  });

  it('should propagate errors from importData', async () => {
    mockRepository.importData.mockRejectedValue(new Error('Import error'));
    await expect(service.importData('students', {})).rejects.toThrow('Import error');
  });

  it('should export data as PDF', async () => {
    mockRepository.exportData.mockResolvedValue({ format: 'pdf', dataSource: 'students', exportedAt: '2025-07-24T00:00:00Z', data: [] });
    const result = await service.exportData('students', {}, 'pdf');
    expect(result.format).toBe('pdf');
  });

  it('should export data as Excel', async () => {
    mockRepository.exportData.mockResolvedValue({ format: 'excel', data: [] });
    const result = await service.exportData('finance', {}, 'excel');
    expect(result.format).toBe('excel');
  });

  it('should export data as CSV', async () => {
    mockRepository.exportData.mockResolvedValue({ format: 'csv', data: [] });
    const result = await service.exportData('teachers', {}, 'csv');
    expect(result.format).toBe('csv');
  });

  it('should export data as JSON', async () => {
    mockRepository.exportData.mockResolvedValue({ format: 'json', data: [] });
    const result = await service.exportData('attendance', {}, 'json');
    expect(result.format).toBe('json');
  });

  it('should export data as PowerPoint', async () => {
    mockRepository.exportData.mockResolvedValue({ format: 'powerpoint', data: [] });
    const result = await service.exportData('classes', {}, 'powerpoint');
    expect(result.format).toBe('powerpoint');
  });

  it('should import data with validation errors', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 5, errors: 3 });
    const result = await service.importData('students', { name: 'bad.csv' });
    expect(result.errors).toBe(3);
  });

  it('should import data with validateOnly option', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 0, errors: 0 });
    const result = await service.importData('students', { name: 'data.csv' }, { validateOnly: true });
    expect(result.imported).toBe(0);
  });

  it('should export data with filters applied', async () => {
    const filters = { dateFrom: '2025-01-01', dateTo: '2025-12-31' };
    mockRepository.exportData.mockResolvedValue({ format: 'pdf', data: [] });
    await service.exportData('students', filters, 'pdf');
    expect(mockRepository.exportData).toHaveBeenCalledWith('students', filters, 'pdf');
  });

  it('should import large dataset', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 1000, errors: 0 });
    const result = await service.importData('students', { name: 'large.csv' });
    expect(result.imported).toBe(1000);
  });

  it('should handle export returning empty data', async () => {
    mockRepository.exportData.mockResolvedValue({ format: 'csv', data: [] });
    const result = await service.exportData('students');
    expect(result.data).toEqual([]);
  });

  it('should handle import with all errors', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 0, errors: 100 });
    const result = await service.importData('students', { name: 'bad.csv' });
    expect(result.imported).toBe(0);
    expect(result.errors).toBe(100);
  });

  it('should export different data sources', async () => {
    const sources = ['students', 'teachers', 'classes', 'subjects', 'exams', 'attendance', 'finance', 'hr', 'messages', 'schools', 'users', 'payments', 'enrollments'];
    for (const source of sources) {
      mockRepository.exportData.mockResolvedValue({ format: 'csv', data: [] });
      await service.exportData(source);
      expect(mockRepository.exportData).toHaveBeenCalledWith(source, undefined, undefined);
    }
  });

  it('should export with XML format', async () => {
    mockRepository.exportData.mockResolvedValue({ format: 'xml', data: [] });
    const result = await service.exportData('students', {}, 'xml');
    expect(result.format).toBe('xml');
  });

  it('should handle export with columns parameter', async () => {
    const filters = { columns: ['name', 'score', 'grade'] };
    mockRepository.exportData.mockResolvedValue({ format: 'pdf', data: [] });
    await service.exportData('students', filters, 'pdf');
    expect(mockRepository.exportData).toHaveBeenCalledWith('students', filters, 'pdf');
  });

  it('should handle import returning zero for both metrics', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 0, errors: 0 });
    const result = await service.importData('students', { name: 'empty.csv' });
    expect(result.imported).toBe(0);
    expect(result.errors).toBe(0);
  });

  it('should export data as JSON format', async () => {
    mockRepository.exportData.mockResolvedValue({ format: 'json', exportedAt: new Date().toISOString(), data: [{ id: 1 }] });
    const result = await service.exportData('students', {}, 'json');
    expect(result.format).toBe('json');
    expect(result.data).toHaveLength(1);
  });

  it('should handle export returning metadata', async () => {
    mockRepository.exportData.mockResolvedValue({ format: 'pdf', data: [], metadata: { totalRows: 500, generatedBy: 'admin' } });
    const result = await service.exportData('students');
    expect(result).toHaveProperty('metadata');
  });

  it('should handle import with partial success', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 80, errors: 20 });
    const result = await service.importData('students', { name: 'partial.csv' });
    expect(result.imported + result.errors).toBe(100);
  });

  it('should export with date range filters', async () => {
    const filters = { dateFrom: '2025-01-01', dateTo: '2025-06-30' };
    mockRepository.exportData.mockResolvedValue({ format: 'csv', data: [] });
    await service.exportData('finance', filters, 'csv');
    expect(mockRepository.exportData).toHaveBeenCalledWith('finance', filters, 'csv');
  });
});
