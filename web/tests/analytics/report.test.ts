import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createReportService } from '../../src/features/analytics/services/report.service';

const mockRepository = {
  createReport: vi.fn(),
  updateReport: vi.fn(),
  deleteReport: vi.fn(),
  getReport: vi.fn(),
  listReports: vi.fn(),
  executeReport: vi.fn(),
};

describe('ReportService', () => {
  let service: ReturnType<typeof createReportService>;

  beforeEach(() => {
    vi.clearAllMocks();
    service = createReportService(mockRepository as any);
  });

  it('should call createReport with data', async () => {
    const data = { name: 'Monthly Report', dataSource: 'students' };
    mockRepository.createReport.mockResolvedValue({ id: 'rpt-1', ...data });
    const result = await service.createReport(data);
    expect(mockRepository.createReport).toHaveBeenCalledWith(data);
    expect(result).toHaveProperty('id');
  });

  it('should propagate errors from createReport', async () => {
    mockRepository.createReport.mockRejectedValue(new Error('Create error'));
    await expect(service.createReport({})).rejects.toThrow('Create error');
  });

  it('should call updateReport with id and data', async () => {
    const data = { name: 'Updated Report' };
    mockRepository.updateReport.mockResolvedValue({ id: 'rpt-1', ...data });
    const result = await service.updateReport('rpt-1', data);
    expect(mockRepository.updateReport).toHaveBeenCalledWith('rpt-1', data);
    expect(result).toHaveProperty('id');
  });

  it('should propagate errors from updateReport', async () => {
    mockRepository.updateReport.mockRejectedValue(new Error('Update error'));
    await expect(service.updateReport('rpt-1', {})).rejects.toThrow('Update error');
  });

  it('should call deleteReport with id', async () => {
    mockRepository.deleteReport.mockResolvedValue(undefined);
    await service.deleteReport('rpt-1');
    expect(mockRepository.deleteReport).toHaveBeenCalledWith('rpt-1');
  });

  it('should propagate errors from deleteReport', async () => {
    mockRepository.deleteReport.mockRejectedValue(new Error('Delete error'));
    await expect(service.deleteReport('rpt-1')).rejects.toThrow('Delete error');
  });

  it('should call getReport with id', async () => {
    mockRepository.getReport.mockResolvedValue({ id: 'rpt-1', name: 'Test Report' });
    const result = await service.getReport('rpt-1');
    expect(mockRepository.getReport).toHaveBeenCalledWith('rpt-1');
    expect(result).toHaveProperty('name');
  });

  it('should propagate errors from getReport', async () => {
    mockRepository.getReport.mockRejectedValue(new Error('Get error'));
    await expect(service.getReport('rpt-1')).rejects.toThrow('Get error');
  });

  it('should call listReports with filters', async () => {
    const filters = { createdBy: 'user-1', dataSource: 'students' };
    mockRepository.listReports.mockResolvedValue([]);
    const result = await service.listReports(filters);
    expect(mockRepository.listReports).toHaveBeenCalledWith(filters);
    expect(result).toEqual([]);
  });

  it('should call listReports without filters', async () => {
    mockRepository.listReports.mockResolvedValue([]);
    await service.listReports();
    expect(mockRepository.listReports).toHaveBeenCalledWith(undefined);
  });

  it('should propagate errors from listReports', async () => {
    mockRepository.listReports.mockRejectedValue(new Error('List error'));
    await expect(service.listReports()).rejects.toThrow('List error');
  });

  it('should call executeReport with id and params', async () => {
    const params = { format: 'pdf' };
    mockRepository.executeReport.mockResolvedValue({ reportId: 'rpt-1', format: 'pdf', data: [] });
    const result = await service.executeReport('rpt-1', params);
    expect(mockRepository.executeReport).toHaveBeenCalledWith('rpt-1', params);
    expect(result).toHaveProperty('data');
  });

  it('should call executeReport without params', async () => {
    mockRepository.executeReport.mockResolvedValue({ reportId: 'rpt-1', data: [] });
    await service.executeReport('rpt-1');
    expect(mockRepository.executeReport).toHaveBeenCalledWith('rpt-1', undefined);
  });

  it('should propagate errors from executeReport', async () => {
    mockRepository.executeReport.mockRejectedValue(new Error('Execute error'));
    await expect(service.executeReport('rpt-1')).rejects.toThrow('Execute error');
  });

  it('should create report with columns and charts', async () => {
    const data = { name: 'Detailed Report', columns: [{ key: 'name', label: 'Name', type: 'string' }], charts: [{ type: 'bar', title: 'Chart 1' }] };
    mockRepository.createReport.mockResolvedValue({ id: 'rpt-2', ...data });
    const result = await service.createReport(data);
    expect(result.columns).toHaveLength(1);
    expect(result.charts).toHaveLength(1);
  });

  it('should update report name successfully', async () => {
    mockRepository.updateReport.mockResolvedValue({ id: 'rpt-1', name: 'New Name' });
    const result = await service.updateReport('rpt-1', { name: 'New Name' });
    expect(result.name).toBe('New Name');
  });

  it('should list reports with multiple results', async () => {
    mockRepository.listReports.mockResolvedValue([{ id: 'rpt-1' }, { id: 'rpt-2' }]);
    const result = await service.listReports();
    expect(result).toHaveLength(2);
  });

  it('should execute report returning export format', async () => {
    mockRepository.executeReport.mockResolvedValue({ reportId: 'rpt-1', format: 'excel', generatedAt: '2025-07-24T00:00:00Z', data: [] });
    const result = await service.executeReport('rpt-1', { format: 'excel' });
    expect(result.format).toBe('excel');
  });

  it('should handle report with schedule configuration', async () => {
    const data = { name: 'Scheduled Report', schedule: 'weekly', scheduleConfig: { dayOfWeek: 1 } };
    mockRepository.createReport.mockResolvedValue({ id: 'rpt-3', ...data });
    const result = await service.createReport(data);
    expect(result.schedule).toBe('weekly');
  });

  it('should handle report with recipients', async () => {
    const data = { name: 'Recipient Report', recipients: ['admin@school.com'] };
    mockRepository.createReport.mockResolvedValue({ id: 'rpt-4', ...data });
    const result = await service.createReport(data);
    expect(result.recipients).toHaveLength(1);
  });

  it('should execute report with different formats', async () => {
    mockRepository.executeReport.mockResolvedValue({ reportId: 'rpt-1', format: 'csv', data: [] });
    const result = await service.executeReport('rpt-1', { format: 'csv' });
    expect(result.format).toBe('csv');
  });

  it('should return null for getReport with non-existent id', async () => {
    mockRepository.getReport.mockResolvedValue(null);
    const result = await service.getReport('non-existent');
    expect(result).toBeNull();
  });

  it('should handle updateReport with partial data', async () => {
    mockRepository.updateReport.mockResolvedValue({ id: 'rpt-1', description: 'Updated desc' });
    const result = await service.updateReport('rpt-1', { description: 'Updated desc' });
    expect(result.description).toBe('Updated desc');
  });

  it('should create report with filters', async () => {
    const data = { name: 'Filtered Report', filters: { schoolId: 'sch-1' } };
    mockRepository.createReport.mockResolvedValue({ id: 'rpt-5', ...data });
    const result = await service.createReport(data);
    expect(result.filters).toEqual({ schoolId: 'sch-1' });
  });

  it('should handle listReports with empty results', async () => {
    mockRepository.listReports.mockResolvedValue([]);
    const result = await service.listReports({ createdBy: 'user-1' });
    expect(result).toEqual([]);
  });

  it('should handle deleteReport returning void', async () => {
    mockRepository.deleteReport.mockResolvedValue(undefined);
    const result = await service.deleteReport('rpt-1');
    expect(result).toBeUndefined();
  });

  it('should handle createReport returning complete object', async () => {
    const data = { name: 'Full Report', description: 'A full report', dataSource: 'finance', columns: [] };
    mockRepository.createReport.mockResolvedValue({ id: 'rpt-6', ...data, createdAt: '2025-07-24T00:00:00Z' });
    const result = await service.createReport(data);
    expect(result).toHaveProperty('createdAt');
  });

  it('should propagate error from executeReport when report not found', async () => {
    mockRepository.executeReport.mockRejectedValue(new Error('Report not found'));
    await expect(service.executeReport('missing-id')).rejects.toThrow('Report not found');
  });
});
