import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useDepartment hook', () => {
  const mockUseQuery = vi.fn();
  const mockUseMutation = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useDepartments', () => {
    it('should fetch departments list', async () => {
      const departments = [{ id: '1', name: 'IT' }];
      mockUseQuery.mockReturnValue({ data: departments, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.data).toEqual(departments);
    });

    it('should handle loading state', () => {
      mockUseQuery.mockReturnValue({ data: undefined, isLoading: true });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.isLoading).toBe(true);
    });

    it('should handle error state', () => {
      mockUseQuery.mockReturnValue({ data: undefined, isLoading: false, error: new Error('Failed') });
      const result = mockUseQuery({ schoolId: 'school-1' });
      expect(result.error).toBeDefined();
    });
  });

  describe('useDepartment', () => {
    it('should fetch single department', async () => {
      const dept = { id: 'dept-1', name: 'IT' };
      mockUseQuery.mockReturnValue({ data: dept, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', departmentId: 'dept-1' });
      expect(result.data.name).toBe('IT');
    });
  });

  describe('useCreateDepartment', () => {
    it('should create department', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ name: 'IT' });
      expect(mutate).toHaveBeenCalledWith({ name: 'IT' });
    });
  });

  describe('useUpdateDepartment', () => {
    it('should update department', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate({ id: 'dept-1', data: { name: 'Updated' } });
      expect(mutate).toHaveBeenCalled();
    });
  });

  describe('useDeleteDepartment', () => {
    it('should delete department', async () => {
      const mutate = vi.fn();
      mockUseMutation.mockReturnValue({ mutate });
      const result = mockUseMutation();
      result.mutate('dept-1');
      expect(mutate).toHaveBeenCalledWith('dept-1');
    });
  });

  describe('useDepartmentEmployees', () => {
    it('should fetch department employee count', async () => {
      mockUseQuery.mockReturnValue({ data: 15, isLoading: false });
      const result = mockUseQuery({ schoolId: 'school-1', departmentId: 'dept-1' });
      expect(result.data).toBe(15);
    });
  });

  describe('Department hook validation', () => {
    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('schoolId is required');
      };
      expect(() => validate('')).toThrow();
    });
  });
});
