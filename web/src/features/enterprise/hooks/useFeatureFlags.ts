import { useState, useEffect, useCallback } from 'react';
import { createFeatureFlagService } from '../services/feature-flag.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { FeatureFlag } from '../types';

export function useFeatureFlags(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createFeatureFlagService(repo);
  const [data, setData] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findFlags(schoolId);
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
