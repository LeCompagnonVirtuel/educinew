import { useState, useCallback } from 'react';
import { createSchoolManagementService } from '../services/school-management.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseSchool } from '../types';

export function useActivateSchool(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createSchoolManagementService(repo);
  const [data, setData] = useState<EnterpriseSchool | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activateSchool = useCallback(async (targetSchoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.activateSchool(schoolId, targetSchoolId);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { data, loading, error, activateSchool };
}
