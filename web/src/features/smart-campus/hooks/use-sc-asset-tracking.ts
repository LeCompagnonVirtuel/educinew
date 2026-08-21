'use client';
import { useState, useCallback } from 'react';
import { ScAssetTransferService } from '../services/sc-asset-transfer.service';
import { createClient } from '@/lib/supabase/client';
import type { AssetTransfer, AssetTransferCreate } from '@educi/types';

export const useScAssetTracking = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const track = useCallback(async (assetId: string): Promise<AssetTransfer | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScAssetTransferService(createClient());
      const transfers = await service.listTransfers(schoolId, { assetId });
      return transfers.length > 0 ? transfers[transfers.length - 1] : null;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const transfer = useCallback(async (data: AssetTransferCreate): Promise<AssetTransfer | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScAssetTransferService(createClient());
      return await service.createTransfer(schoolId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getHistory = useCallback(async (assetId: string): Promise<AssetTransfer[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScAssetTransferService(createClient());
      return await service.listTransfers(schoolId, { assetId });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, track, transfer, getHistory };
};
