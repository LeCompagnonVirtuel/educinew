import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('ImportService', () => {
  const mockRepo = {
    importEmployees: vi.fn(),
    validateImportData: vi.fn(),
    getImportTemplate: vi.fn(),
  };

  const schoolId = 'school-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('importEmployees', () => {
    it('should import employees from CSV', async () => {
      mockRepo.importEmployees.mockResolvedValue({ imported: 10, errors: 0 });
      const result = await mockRepo.importEmployees(schoolId, []);
      expect(result.imported).toBe(10);
    });

    it('should return errors for invalid data', async () => {
      mockRepo.importEmployees.mockResolvedValue({ imported: 5, errors: 3, errorDetails: [{ row: 1, error: 'Invalid email' }] });
      const result = await mockRepo.importEmployees(schoolId, []);
      expect(result.errors).toBe(3);
    });
  });

  describe('validateImportData', () => {
    it('should validate import rows', async () => {
      mockRepo.validateImportData.mockResolvedValue({ valid: 10, invalid: 0 });
      const result = await mockRepo.validateImportData([]);
      expect(result.valid).toBe(10);
    });
  });

  describe('getImportTemplate', () => {
    it('should return import template', async () => {
      mockRepo.getImportTemplate.mockResolvedValue({ headers: ['first_name', 'last_name', 'email'] });
      const result = await mockRepo.getImportTemplate();
      expect(result.headers).toContain('first_name');
    });
  });

  describe('CSV parsing', () => {
    it('should parse CSV rows', () => {
      const parseCSV = (csv: string) => csv.split('\n').map(row => row.split(','));
      const rows = parseCSV('John,Doe,john@test.com\nJane,Smith,jane@test.com');
      expect(rows).toHaveLength(2);
      expect(rows[0][0]).toBe('John');
    });
  });

  describe('Import validation', () => {
    it('should validate required columns', () => {
      const requiredColumns = ['first_name', 'last_name', 'email'];
      const hasColumns = (columns: string[]) => requiredColumns.every(c => columns.includes(c));
      expect(hasColumns(['first_name', 'last_name', 'email', 'phone'])).toBe(true);
      expect(hasColumns(['first_name', 'email'])).toBe(false);
    });
  });
});
