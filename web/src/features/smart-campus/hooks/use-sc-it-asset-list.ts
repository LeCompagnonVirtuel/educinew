'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScITAssetService } from '../services/sc-it-asset.service';
import { createClient } from '@/lib/supabase/client';
import type { ITAsset } from '@educi/types';

export const useScItAssetList = (schoolId: string) => {
  const [itAssets, setItAssets] = useState<ITAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItAssets = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScITAssetService(createClient());
      const data = await service.listITAssets(schoolId);
      setItAssets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItAssets();
  }, [fetchItAssets]);

  return { itAssets, loading, error, refresh: fetchItAssets };
};
