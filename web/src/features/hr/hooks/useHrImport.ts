import { useState, useCallback } from 'react';
import { createImportService } from '../services/import.service';
import { createHRRepository } from '../repositories/hr.repository';

export function useHrImport(supabase: any) {
  const repo = createHRRepository(supabase);
  const service = createImportService(repo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const importEmployees = useCallback(async (schoolId: string, employees: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.importEmployees(schoolId, employees);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { importEmployees, loading, error };
}
