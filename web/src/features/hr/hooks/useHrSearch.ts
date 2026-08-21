import { useState, useCallback } from 'react';
import { createSearchService } from '../services/search.service';
import { createHRRepository } from '../repositories/hr.repository';

export function useHrSearch(supabase: any) {
  const repo = createHRRepository(supabase);
  const service = createSearchService(repo);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (schoolId: string, query: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.searchEmployees(schoolId, query);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, search };
}
