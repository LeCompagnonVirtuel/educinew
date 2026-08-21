import { useState, useCallback } from 'react';
import { createEnterpriseSearchService } from '../services/enterprise-search.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';

export function useEnterpriseSearch(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseSearchService(repo);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchSchools = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.searchSchools(schoolId, query);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const searchUsers = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.searchUsers(schoolId, query);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { data, loading, error, searchSchools, searchUsers };
}
