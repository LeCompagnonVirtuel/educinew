import { useState, useCallback } from 'react';
import { createFeatureFlagService } from '../services/feature-flag.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { FeatureFlag } from '../types';

export function useToggleFeatureFlag(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createFeatureFlagService(repo);
  const [data, setData] = useState<FeatureFlag | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleFlag = useCallback(async (flagId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.toggleFlag(schoolId, flagId);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { data, loading, error, toggleFlag };
}
