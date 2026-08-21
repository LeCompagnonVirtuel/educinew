'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScAssetTransferService } from '../services/sc-asset-transfer.service';
import { createClient } from '@/lib/supabase/client';
import type { AssetTransfer } from '@educi/types';

export const useScAssetTransferList = (schoolId: string) => {
  const [transfers, setTransfers] = useState<AssetTransfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransfers = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScAssetTransferService(createClient());
      const data = await service.listTransfers(schoolId);
      setTransfers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchTransfers();
  }, [fetchTransfers]);

  return { transfers, loading, error, refresh: fetchTransfers };
};
