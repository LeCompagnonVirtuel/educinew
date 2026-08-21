import { useState, useCallback } from 'react';
import { createPermissionService } from '../services/permission.service';
import { createHRRepository } from '../repositories/hr.repository';

export function useHrPermission(supabase: any) {
  const repo = createHRRepository(supabase);
  const service = createPermissionService(repo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canViewEmployee = useCallback(async (userId: string, schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.canViewEmployee(userId, schoolId);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const canEditEmployee = useCallback(async (userId: string, schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.canEditEmployee(userId, schoolId);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const canDeleteEmployee = useCallback(async (userId: string, schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.canDeleteEmployee(userId, schoolId);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const canApproveLeave = useCallback(async (userId: string, schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.canApproveLeave(userId, schoolId);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const canManageDepartment = useCallback(async (userId: string, schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.canManageDepartment(userId, schoolId);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const canManageRecruitment = useCallback(async (userId: string, schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.canManageRecruitment(userId, schoolId);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const canViewReports = useCallback(async (userId: string, schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.canViewReports(userId, schoolId);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const canManageSettings = useCallback(async (userId: string, schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.canManageSettings(userId, schoolId);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    canViewEmployee,
    canEditEmployee,
    canDeleteEmployee,
    canApproveLeave,
    canManageDepartment,
    canManageRecruitment,
    canViewReports,
    canManageSettings,
  };
}
