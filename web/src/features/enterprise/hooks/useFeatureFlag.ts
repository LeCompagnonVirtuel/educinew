import { useState, useEffect, useCallback } from 'react';
import { createFeatureFlagService } from '../services/feature-flag.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { FeatureFlag } from '../types';

export function useFeatureFlag(supabase: any, schoolId: string, flagId: string | null) {
  const repo = createEnterpriseRepository(supabase);
  const service = createFeatureFlagService(repo);
  const [data, setData] = useState<FeatureFlag | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!flagId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findFlagById(schoolId, flagId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, flagId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
