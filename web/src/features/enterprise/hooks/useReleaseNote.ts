import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseReleaseNotesService } from '../services/enterprise-release-notes.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { ReleaseNote } from '../types';

export function useReleaseNote(supabase: any, schoolId: string, releaseNoteId: string | null) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseReleaseNotesService(repo);
  const [data, setData] = useState<ReleaseNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!releaseNoteId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findReleaseNoteById(schoolId, releaseNoteId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, releaseNoteId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
