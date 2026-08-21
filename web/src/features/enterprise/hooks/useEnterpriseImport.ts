import { useState, useCallback } from 'react';
import { createEnterpriseImportService } from '../services/enterprise-import.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';

export function useEnterpriseImport(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseImportService(repo);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const importData = useCallback(async (type: string, importPayload: any) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.importData(schoolId, type, importPayload);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { data, loading, error, importData };
}
