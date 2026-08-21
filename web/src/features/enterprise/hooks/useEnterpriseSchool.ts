import { useState, useEffect, useCallback } from 'react';
import { createSchoolManagementService } from '../services/school-management.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseSchool } from '../types';

export function useEnterpriseSchool(supabase: any, schoolId: string, targetSchoolId: string | null) {
  const repo = createEnterpriseRepository(supabase);
  const service = createSchoolManagementService(repo);
  const [data, setData] = useState<EnterpriseSchool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!targetSchoolId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findSchoolById(schoolId, targetSchoolId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, targetSchoolId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
