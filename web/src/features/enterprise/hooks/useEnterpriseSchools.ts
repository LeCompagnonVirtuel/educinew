import { useState, useEffect, useCallback } from 'react';
import { createSchoolManagementService } from '../services/school-management.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseSchool } from '../types';

export function useEnterpriseSchools(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createSchoolManagementService(repo);
  const [data, setData] = useState<EnterpriseSchool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findSchools(schoolId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
