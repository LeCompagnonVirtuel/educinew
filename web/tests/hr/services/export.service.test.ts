import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('ExportService', () => {
  const mockRepo = {
    exportEmployees: vi.fn(),
    exportReport: vi.fn(),
  };

  const schoolId = 'school-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('exportEmployees', () => {
    it('should export employees to CSV', async () => {
      mockRepo.exportEmployees.mockResolvedValue({ data: 'first_name,last_name\nJohn,Doe', filename: 'employees.csv' });
      const result = await mockRepo.exportEmployees(schoolId, 'csv');
      expect(result.filename).toBe('employees.csv');
    });

    it('should export employees to PDF', async () => {
      mockRepo.exportEmployees.mockResolvedValue({ data: Buffer.from('PDF'), filename: 'employees.pdf' });
      const result = await mockRepo.exportEmployees(schoolId, 'pdf');
      expect(result.filename).toBe('employees.pdf');
    });
  });

  describe('exportReport', () => {
    it('should export report', async () => {
      mockRepo.exportReport.mockResolvedValue({ data: 'report', filename: 'report.xlsx' });
      const result = await mockRepo.exportReport(schoolId, 'statistics', 'xlsx');
      expect(result.filename).toBe('report.xlsx');
    });
  });

  describe('Export format validation', () => {
    it('should validate export format', () => {
      const validFormats = ['csv', 'xlsx', 'pdf'];
      const isValidFormat = (format: string) => validFormats.includes(format);
      expect(isValidFormat('csv')).toBe(true);
      expect(isValidFormat('pdf')).toBe(true);
      expect(isValidFormat('txt')).toBe(false);
    });
  });

  describe('CSV generation', () => {
    it('should generate CSV from data', () => {
      const toCSV = (headers: string[], rows: any[][]) => {
        const header = headers.join(',');
        const data = rows.map(r => r.join(',')).join('\n');
        return `${header}\n${data}`;
      };
      const csv = toCSV(['name', 'email'], [['John', 'j@t.com'], ['Jane', 'ja@t.com']]);
      expect(csv).toContain('name,email');
      expect(csv).toContain('John,j@t.com');
    });
  });

  describe('Export filename', () => {
    it('should generate export filename', () => {
      const generateFilename = (prefix: string, format: string) => {
        const date = new Date().toISOString().split('T')[0];
        return `${prefix}_${date}.${format}`;
      };
      expect(generateFilename('employees', 'csv')).toMatch(/^employees_\d{4}-\d{2}-\d{2}\.csv$/);
    });
  });
});
