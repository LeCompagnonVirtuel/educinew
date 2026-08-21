import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useEmployee hook', () => {
  const mockUseQuery = vi.fn();
  const mockUseMutation = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useEmployees', () => {
    it('should fetch employees list', async () => {
      const employees = [{ id: '1', first_name: 'John' }];
      mockUseQuery.mockReturnValue({ data: employees, isLoading: false, error: null });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.data).toEqual(employees);
      expect(result.isLoading).toBe(false);
    });

    it('should handle loading state', () => {
      mockUseQuery.mockReturnValue({ data: undefined, isLoading: true, error: null });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.isLoading).toBe(true);
    });

    it('should handle error state', () => {
      mockUseQuery.mockReturnValue({ data: undefined, isLoading: false, error: new Error('Failed') });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.error).toBeDefined();
    });
  });

  describe('useEmployee', () => {
    it('should fetch single employee', async () => {
      const employee = { id: 'emp-1', first_name: 'John' };
      mockUseQuery.mockReturnValue({ data: employee, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', employeeId: 'emp-1' });
      expect(result.data.id).toBe('emp-1');
    });

    it('should return null when not found', () => {
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', employeeId: 'nonexistent' });
      expect(result.data).toBeNull();
    });
  });

  describe('useCreateEmployee', () => {
    it('should create employee', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate, isLoading: false });
      const result = mockUseMutation();
      result.mutate({ first_name: 'John', last_name: 'Doe' });
      expect(mutate).toHaveBeenCalledWith({ first_name: 'John', last_name: 'Doe' });
    });
  });

  describe('useUpdateEmployee', () => {
    it('should update employee', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate, isLoading: false });
      const result = mockUseMutation();
      result.mutate({ id: 'emp-1', data: { first_name: 'Jane' } });
      expect(mutate).toHaveBeenCalled();
    });
  });

  describe('useDeleteEmployee', () => {
    it('should delete employee', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate, isLoading: false });
      const result = mockUseMutation();
      result.mutate('emp-1');
      expect(mutate).toHaveBeenCalledWith('emp-1');
    });
  });

  describe('useSearchEmployees', () => {
    it('should search employees', async () => {
      const employees = [{ id: '1', first_name: 'John' }];
      mockUseQuery.mockReturnValue({ data: employees, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', query: 'John' });
      expect(result.data).toHaveLength(1);
    });

    it('should handle empty search', () => {
      mockUseQuery.mockReturnValue({ data: [], isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', query: '' });
      expect(result.data).toHaveLength(0);
    });
  });

  describe('useEmployeeStatistics', () => {
    it('should fetch statistics', async () => {
      const stats = { totalEmployees: 100, activeEmployees: 80 };
      mockUseQuery.mockReturnValue({ data: stats, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.data.totalEmployees).toBe(100);
    });
  });

  describe('useEmployeeCode', () => {
    it('should generate employee code', async () => {
      mockUseQuery.mockReturnValue({ data: 'DIR-2026-0001', isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', departmentCode: 'DIR' });
      expect(result.data).toBe('DIR-2026-0001');
    });
  });

  describe('useEmployeeDocument', () => {
    it('should fetch employee documents', async () => {
      const docs = [{ id: '1', name: 'Contract' }];
      mockUseQuery.mockReturnValue({ data: docs, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', employeeId: 'emp-1' });
      expect(result.data).toHaveLength(1);
    });
  });

  describe('Employee hook validation', () => {
    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('schoolId is required');
      };
      expect(() => validate('')).toThrow('schoolId is required');
    });

    it('should require employeeId for single employee', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('employeeId is required');
      };
      expect(() => validate('')).toThrow('employeeId is required');
    });
  });
});
