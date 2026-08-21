'use client';

import { useState, useCallback } from 'react';
import { EduOSCatalogAssetService } from '../services/eduos-catalog-asset.service';
import { createClient } from '@/lib/supabase/client';
import type { CatalogAsset } from '@educi/types';

export const useEduOSCatalogAssetActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CatalogAsset): Promise<CatalogAsset | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCatalogAssetService(supabase);
      return await service.createCatalogAsset(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CatalogAsset>): Promise<CatalogAsset | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCatalogAssetService(supabase);
      return await service.updateCatalogAsset(schoolId, id, data);
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
      const service = new EduOSCatalogAssetService(supabase);
      await service.deleteCatalogAsset(schoolId, id);
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