'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScAssetWarrantyService } from '../services/sc-asset-warranty.service';
import { createClient } from '@/lib/supabase/client';
import type { AssetWarranty } from '@educi/types';

export const useScAssetWarrantyList = (schoolId: string) => {
  const [warranties, setWarranties] = useState<AssetWarranty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWarranties = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScAssetWarrantyService(createClient());
      const data = await service.listWarranties(schoolId);
      setWarranties(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchWarranties();
  }, [fetchWarranties]);

  return { warranties, loading, error, refresh: fetchWarranties };
};
