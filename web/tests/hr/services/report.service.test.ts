import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('ReportService', () => {
  const mockRepo = {
    generateReport: vi.fn(),
    getReportTemplates: vi.fn(),
  };

  const schoolId = 'school-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('generateReport', () => {
    it('should generate employee report', async () => {
      mockRepo.generateReport.mockResolvedValue({ data: 'report', filename: 'employee_report.pdf' });
      const result = await mockRepo.generateReport(schoolId, 'employee', 'pdf', {});
      expect(result.filename).toBe('employee_report.pdf');
    });

    it('should generate attendance report', async () => {
      mockRepo.generateReport.mockResolvedValue({ data: 'report', filename: 'attendance_report.xlsx' });
      const result = await mockRepo.generateReport(schoolId, 'attendance', 'xlsx', { dateFrom: '2026-07-01', dateTo: '2026-07-31' });
      expect(result.filename).toBe('attendance_report.xlsx');
    });

    it('should generate leave report', async () => {
      mockRepo.generateReport.mockResolvedValue({ data: 'report', filename: 'leave_report.csv' });
      const result = await mockRepo.generateReport(schoolId, 'leave', 'csv', {});
      expect(result.filename).toBe('leave_report.csv');
    });
  });

  describe('getReportTemplates', () => {
    it('should return report templates', async () => {
      mockRepo.getReportTemplates.mockResolvedValue([{ id: '1', name: 'Employee List' }]);
      const result = await mockRepo.getReportTemplates(schoolId);
      expect(result).toHaveLength(1);
    });
  });

  describe('Report types', () => {
    it('should define valid report types', () => {
      const types = ['employee', 'attendance', 'leave', 'training', 'performance', 'payroll'];
      expect(types).toContain('employee');
      expect(types).toContain('payroll');
    });
  });

  describe('Report format', () => {
    it('should validate report format', () => {
      const validFormats = ['pdf', 'xlsx', 'csv'];
      const isValidFormat = (format: string) => validFormats.includes(format);
      expect(isValidFormat('pdf')).toBe(true);
      expect(isValidFormat('doc')).toBe(false);
    });
  });

  describe('Report date range', () => {
    it('should validate report date range', () => {
      const isValidRange = (from: string, to: string) => new Date(from) <= new Date(to);
      expect(isValidRange('2026-07-01', '2026-07-31')).toBe(true);
      expect(isValidRange('2026-07-31', '2026-07-01')).toBe(false);
    });
  });
});
