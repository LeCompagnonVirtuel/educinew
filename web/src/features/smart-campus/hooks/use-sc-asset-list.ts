'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScAssetService } from '../services/sc-asset.service';
import { createClient } from '@/lib/supabase/client';
import type { Asset } from '@educi/types';

export const useScAssetList = (schoolId: string) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssets = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScAssetService(createClient());
      const data = await service.listAssets(schoolId);
      setAssets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  return { assets, loading, error, refresh: fetchAssets };
};
