import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseReleaseNotesService } from '../services/enterprise-release-notes.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { ReleaseNote } from '../types';

export function useReleaseNotes(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseReleaseNotesService(repo);
  const [data, setData] = useState<ReleaseNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findReleaseNotes(schoolId);
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
