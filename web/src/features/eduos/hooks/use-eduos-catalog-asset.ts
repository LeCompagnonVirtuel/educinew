'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSCatalogAssetService } from '../services/eduos-catalog-asset.service';
import { createClient } from '@/lib/supabase/client';
import type { CatalogAsset } from '@educi/types';

export const useEduOSCatalogAssetList = (schoolId: string) => {
  const [items, setItems] = useState<CatalogAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCatalogAssetService(supabase);
      const data = await service.listCatalogAssets(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};