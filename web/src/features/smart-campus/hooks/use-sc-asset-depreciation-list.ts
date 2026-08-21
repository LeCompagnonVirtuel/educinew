'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScAssetDepreciationService } from '../services/sc-asset-depreciation.service';
import { createClient } from '@/lib/supabase/client';
import type { AssetDepreciation } from '@educi/types';

export const useScAssetDepreciationList = (schoolId: string) => {
  const [depreciations, setDepreciations] = useState<AssetDepreciation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDepreciations = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScAssetDepreciationService(createClient());
      const data = await service.listDepreciations(schoolId);
      setDepreciations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchDepreciations();
  }, [fetchDepreciations]);

  return { depreciations, loading, error, refresh: fetchDepreciations };
};
