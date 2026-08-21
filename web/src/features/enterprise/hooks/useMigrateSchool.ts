import { useState, useCallback } from 'react';
import { createSchoolManagementService } from '../services/school-management.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseSchool } from '../types';

export function useMigrateSchool(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createSchoolManagementService(repo);
  const [data, setData] = useState<EnterpriseSchool | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const migrateSchool = useCallback(async (targetSchoolId: string, targetPlan: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.migrateSchool(schoolId, targetSchoolId, targetPlan);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { data, loading, error, migrateSchool };
}
