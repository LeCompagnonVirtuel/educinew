import { useState, useCallback } from 'react';
import { createExportService } from '../services/export.service';
import { createHRRepository } from '../repositories/hr.repository';

export function useHrExport(supabase: any) {
  const repo = createHRRepository(supabase);
  const service = createExportService(repo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportEmployees = useCallback(async (schoolId: string, filters?: any) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.exportEmployees(schoolId, filters);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const exportEmployeesCSV = useCallback(async (schoolId: string, filters?: any) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.exportEmployeesCSV(schoolId, filters);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { exportEmployees, exportEmployeesCSV, loading, error };
}
