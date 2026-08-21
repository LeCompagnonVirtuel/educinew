import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createExportService } from '../../src/features/analytics/services/export.service';

const mockRepository = {
  exportData: vi.fn(),
  importData: vi.fn(),
};

describe('ImportService', () => {
  let service: ReturnType<typeof createExportService>;

  beforeEach(() => {
    vi.clearAllMocks();
    service = createExportService(mockRepository as any);
  });

  it('should import CSV data successfully', async () => {
    const file = { name: 'students.csv', content: 'name,score\nJohn,90\nJane,85' };
    mockRepository.importData.mockResolvedValue({ imported: 2, errors: 0 });
    const result = await service.importData('students', file);
    expect(result.imported).toBe(2);
    expect(result.errors).toBe(0);
  });

  it('should import JSON data successfully', async () => {
    const file = { name: 'data.json', content: '[{"name":"John"}]' };
    mockRepository.importData.mockResolvedValue({ imported: 1, errors: 0 });
    const result = await service.importData('students', file);
    expect(result.imported).toBe(1);
  });

  it('should import Excel data successfully', async () => {
    const file = { name: 'data.xlsx', content: 'binary' };
    mockRepository.importData.mockResolvedValue({ imported: 50, errors: 0 });
    const result = await service.importData('teachers', file);
    expect(result.imported).toBe(50);
  });

  it('should import with validateOnly flag', async () => {
    const file = { name: 'data.csv', content: '' };
    mockRepository.importData.mockResolvedValue({ imported: 0, errors: 0 });
    const result = await service.importData('students', file, { validateOnly: true });
    expect(result.imported).toBe(0);
    expect(result.errors).toBe(0);
  });

  it('should handle import with validation errors', async () => {
    const file = { name: 'bad.csv', content: 'invalid' };
    mockRepository.importData.mockResolvedValue({ imported: 0, errors: 10 });
    const result = await service.importData('students', file);
    expect(result.errors).toBe(10);
  });

  it('should handle import with mixed results', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 85, errors: 15 });
    const result = await service.importData('students', { name: 'mixed.csv' });
    expect(result.imported).toBe(85);
    expect(result.errors).toBe(15);
  });

  it('should import different data sources', async () => {
    const sources = ['students', 'teachers', 'finance', 'hr', 'attendance'];
    for (const source of sources) {
      mockRepository.importData.mockResolvedValue({ imported: 10, errors: 0 });
      const result = await service.importData(source, { name: 'data.csv' });
      expect(result.imported).toBe(10);
    }
  });

  it('should import with format parameter', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 5, errors: 0 });
    const result = await service.importData('students', { name: 'data.csv' }, { format: 'csv' });
    expect(result.imported).toBe(5);
  });

  it('should handle import returning zero imported', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 0, errors: 0 });
    const result = await service.importData('students', { name: 'empty.csv' });
    expect(result.imported).toBe(0);
  });

  it('should handle import with large dataset', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 10000, errors: 0 });
    const result = await service.importData('students', { name: 'huge.csv' });
    expect(result.imported).toBe(10000);
  });

  it('should propagate errors from importData', async () => {
    mockRepository.importData.mockRejectedValue(new Error('File read error'));
    await expect(service.importData('students', { name: 'corrupt.csv' })).rejects.toThrow('File read error');
  });

  it('should import with XML format', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 15, errors: 0 });
    const result = await service.importData('students', { name: 'data.xml' }, { format: 'xml' });
    expect(result.imported).toBe(15);
  });

  it('should import with PowerPoint format', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 3, errors: 0 });
    const result = await service.importData('reports', { name: 'data.pptx' }, { format: 'powerpoint' });
    expect(result.imported).toBe(3);
  });

  it('should handle import returning all errors', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 0, errors: 100 });
    const result = await service.importData('students', { name: 'allbad.csv' });
    expect(result.imported).toBe(0);
    expect(result.errors).toBe(100);
  });

  it('should import with options containing schoolId', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 10, errors: 0 });
    const result = await service.importData('students', { name: 'data.csv' }, { schoolId: 'sch-1' });
    expect(result.imported).toBe(10);
  });

  it('should handle import with overwrite option', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 25, errors: 0 });
    const result = await service.importData('students', { name: 'data.csv' }, { overwrite: true });
    expect(result.imported).toBe(25);
  });

  it('should import students data', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 200, errors: 5 });
    const result = await service.importData('students', { name: 'students.csv' });
    expect(result.imported).toBe(200);
  });

  it('should import finance data', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 500, errors: 2 });
    const result = await service.importData('finance', { name: 'payments.csv' });
    expect(result.imported).toBe(500);
  });

  it('should import attendance data', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 1000, errors: 0 });
    const result = await service.importData('attendance', { name: 'attendance.csv' });
    expect(result.imported).toBe(1000);
  });

  it('should import HR data', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 50, errors: 0 });
    const result = await service.importData('hr', { name: 'employees.csv' });
    expect(result.imported).toBe(50);
  });

  it('should handle import with duplicate detection', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 15, errors: 5, duplicates: 5 });
    const result = await service.importData('students', { name: 'dupes.csv' });
    expect(result.imported).toBe(15);
  });

  it('should import with data source validation', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 10, errors: 0 });
    const result = await service.importData('classes', { name: 'classes.csv' });
    expect(result.imported).toBe(10);
  });

  it('should handle import returning summary', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 42, errors: 3, summary: { total: 45, processed: 42, failed: 3 } });
    const result = await service.importData('students', { name: 'summary.csv' });
    expect(result.imported).toBe(42);
  });

  it('should import with encoding option', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 10, errors: 0 });
    const result = await service.importData('students', { name: 'utf8.csv' }, { encoding: 'utf-8' });
    expect(result.imported).toBe(10);
  });

  it('should handle import with partial file corruption', async () => {
    mockRepository.importData.mockResolvedValue({ imported: 80, errors: 20 });
    const result = await service.importData('students', { name: 'corrupt_partial.csv' });
    expect(result.imported + result.errors).toBe(100);
  });
});
