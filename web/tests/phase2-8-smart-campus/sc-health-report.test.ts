import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScHealthReportService } from '@/features/smart-campus/services/sc-health-report.service';

describe('ScHealthReportService', () => {
  let service: ScHealthReportService;
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
    service = new ScHealthReportService(mockSupabase);
  });

  it('should get health report by id', async () => {
    const result = await service.getHealthReport('school-1', 'report-1');
    expect(result).toBeDefined();
  });

  it('should return health report with correct data', async () => {
    const mockReport = { id: 'report-1', student_id: 'student-1', report_type: 'annual', date: '2026-08-03' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockReport, error: null });
    const result = await service.getHealthReport('school-1', 'report-1');
    expect(result).toEqual(mockReport);
  });

  it('should handle error when getting health report', async () => {
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    const result = await service.getHealthReport('school-1', 'report-1');
    expect(result).toBeNull();
  });

  it('should get all health reports for a school', async () => {
    const mockReports = [{ id: 'report-1' }, { id: 'report-2' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockReports, error: null });
    const result = await service.getHealthReports('school-1');
    expect(result).toEqual(mockReports);
  });

  it('should create a new health report', async () => {
    const newReport = { student_id: 'student-1', report_type: 'annual', date: '2026-08-03', height: 150, weight: 45 };
    mockSupabase.from().insert().select().single.mockResolvedValue({ data: { id: 'report-3', ...newReport }, error: null });
    const result = await service.createHealthReport('school-1', newReport);
    expect(result).toBeDefined();
  });

  it('should update a health report', async () => {
    const updates = { bmi: 20.0 };
    mockSupabase.from().update().eq().select().single.mockResolvedValue({ data: { id: 'report-1', ...updates }, error: null });
    const result = await service.updateHealthReport('school-1', 'report-1', updates);
    expect(result).toBeDefined();
  });

  it('should delete a health report', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: null });
    const result = await service.deleteHealthReport('school-1', 'report-1');
    expect(result).toBe(true);
  });

  it('should handle delete error', async () => {
    mockSupabase.from().delete().eq.mockResolvedValue({ error: { message: 'Delete failed' } });
    const result = await service.deleteHealthReport('school-1', 'report-1');
    expect(result).toBe(false);
  });

  it('should get reports by student', async () => {
    const mockReports = [{ id: 'report-1', student_id: 'student-1' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockReports, error: null });
    const result = await service.getReportsByStudent('school-1', 'student-1');
    expect(result).toEqual(mockReports);
  });

  it('should get reports by type', async () => {
    const mockReports = [{ id: 'report-1', report_type: 'annual' }];
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockReports, error: null });
    const result = await service.getReportsByType('school-1', 'annual');
    expect(result).toEqual(mockReports);
  });

  it('should get latest report for student', async () => {
    const mockReport = { id: 'report-1', student_id: 'student-1', date: '2026-08-03' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockReport, error: null });
    const result = await service.getLatestReport('school-1', 'student-1');
    expect(result).toEqual(mockReport);
  });

  it('should calculate BMI', () => {
    const bmi = service.calculateBMI(150, 45);
    expect(bmi).toBeCloseTo(20.0, 1);
  });

  it('should validate report data', () => {
    const result = service.validateReportData({ student_id: 'student-1', report_type: 'annual', date: '2026-08-03', height: 150, weight: 45 });
    expect(result).toBe(true);
  });

  it('should reject invalid report data', () => {
    const result = service.validateReportData({ student_id: '', report_type: '', date: '', height: -1, weight: -1 });
    expect(result).toBe(false);
  });

  it('should get health report statistics', async () => {
    const mockStats = { total: 200, annual: 150, special: 50 };
    mockSupabase.from().select().eq().then.mockResolvedValue({ data: mockStats, error: null });
    const result = await service.getHealthReportStatistics('school-1');
    expect(result).toBeDefined();
  });

  it('should generate health summary', async () => {
    const mockSummary = { student_id: 'student-1', bmi: 20.0, status: 'Normal' };
    mockSupabase.from().select().eq().single.mockResolvedValue({ data: mockSummary, error: null });
    const result = await service.generateHealthSummary('school-1', 'student-1');
    expect(result).toBeDefined();
  });
});
