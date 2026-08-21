import { useState, useCallback } from 'react';
import { createEmployeeService } from '../services/employee.service';
import { createHRRepository } from '../repositories/hr.repository';

export function useGenerateEmployeeCode(supabase: any) {
  const repo = createHRRepository(supabase);
  const service = createEmployeeService(repo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (schoolId: string, departmentCode: string, year?: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.generateEmployeeCode(schoolId, departmentCode, year);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { generate, loading, error };
}
