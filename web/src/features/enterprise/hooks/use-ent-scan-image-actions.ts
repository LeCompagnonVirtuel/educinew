'use client';

import { useState, useCallback } from 'react';
import { EntScanImageService } from '../services/scan-image.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanImage, ScanImageCreate } from '@educi/types';

export const useEntScanImageActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanImageCreate): Promise<ScanImage | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanImageService(supabase);
      return await service.createScanImage(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanImageCreate>): Promise<ScanImage | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanImageService(supabase);
      return await service.updateScanImage(schoolId, id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanImageService(supabase);
      await service.deleteScanImage(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};
