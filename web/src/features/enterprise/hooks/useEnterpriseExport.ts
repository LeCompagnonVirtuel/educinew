import { useState, useCallback } from 'react';
import { createEnterpriseExportService } from '../services/enterprise-export.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';

export function useEnterpriseExport(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseExportService(repo);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportData = useCallback(async (type: string, filters?: any) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.exportData(schoolId, type, filters);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { data, loading, error, exportData };
}
