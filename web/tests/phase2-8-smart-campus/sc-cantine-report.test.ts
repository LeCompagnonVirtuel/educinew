import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScCantineReportService } from '@/features/smart-campus/services/sc-cantine-report.service';

describe('ScCantineReportService', () => {
  let service: ScCantineReportService;
  const mockSupabase = {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
          then: vi.fn()
        })),
        then: vi.fn()
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn()
        }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn()
          }))
        }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn()
      }))
    }))
  } as any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new ScCantineReportService(mockSupabase);
  });

  it('should get cantine report by id', async () => {
    const result = await service.getCantineReport('school-1', 'report-1');
    expect(result).toBeDefined();
  });

  it('should return cantine report with correct data', async () => {
    const mockReport = { id: 'report-1', report_type: 'daily', date: '2026-08-03', total_meals: 50 };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockReport, error: null });
    const result = await service.getCantineReport('school-1', 'report-1');
    expect(result).toEqual(mockReport);
  });

  it('should handle error when getting cantine report', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getCantineReport('school-1', 'report-1');
    expect(result).toBeNull();
  });

  it('should get all cantine reports for a school', async () => {
    const mockReports = [{ id: 'report-1' }, { id: 'report-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockReports, error: null });
    const result = await service.getCantineReports('school-1');
    expect(result).toEqual(mockReports);
  });

  it('should create a new cantine report', async () => {
    const newReport = { report_type: 'daily', date: '2026-08-03', total_meals: 50 };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'report-3', ...newReport }, error: null });
    const result = await service.createCantineReport('school-1', newReport);
    expect(result).toBeDefined();
  });

  it('should update a cantine report', async () => {
    const updates = { total_meals: 55 };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'report-1', ...updates }, error: null });
    const result = await service.updateCantineReport('school-1', 'report-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a cantine report', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteCantineReport('school-1', 'report-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteCantineReport('school-1', 'report-1');
    expect(result).toBe(false);
  });

  it('should get daily report', async () => {
    const mockReport = { id: 'report-1', report_type: 'daily', date: '2026-08-03' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockReport, error: null });
    const result = await service.getDailyReport('school-1', '2026-08-03');
    expect(result).toEqual(mockReport);
  });

  it('should get weekly report', async () => {
    const mockReport = { id: 'report-1', report_type: 'weekly', week: '2026-08-03' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockReport, error: null });
    const result = await service.getWeeklyReport('school-1', '2026-08-03');
    expect(result).toEqual(mockReport);
  });

  it('should get monthly report', async () => {
    const mockReport = { id: 'report-1', report_type: 'monthly', month: '2026-08' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockReport, error: null });
    const result = await service.getMonthlyReport('school-1', '2026-08');
    expect(result).toEqual(mockReport);
  });

  it('should generate report', async () => {
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'report-1' }, error: null });
    const result = await service.generateReport('school-1', 'daily', '2026-08-03');
    expect(result).toBeDefined();
  });

  it('should get revenue report', async () => {
    const mockReport = { total_revenue: 25000, total_orders: 100 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockReport, error: null });
    const result = await service.getRevenueReport('school-1', '2026-08-01', '2026-08-03');
    expect(result).toBeDefined();
  });

  it('should get consumption report', async () => {
    const mockReport = { total_meals: 300, unique_students: 150 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockReport, error: null });
    const result = await service.getConsumptionReport('school-1', '2026-08-01', '2026-08-03');
    expect(result).toBeDefined();
  });

  it('should validate report data', () => {
    const result = service.validateReportData({ report_type: 'daily', date: '2026-08-03' });
    expect(result).toBe(true);
  });

  it('should reject invalid report data', () => {
    const result = service.validateReportData({ report_type: '', date: '' });
    expect(result).toBe(false);
  });

  it('should export report to CSV', async () => {
    const mockReport = [{ date: '2026-08-03', total_meals: 50 }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockReport, error: null });
    const result = await service.exportToCsv('school-1', 'report-1');
    expect(result).toBeDefined();
  });
});
