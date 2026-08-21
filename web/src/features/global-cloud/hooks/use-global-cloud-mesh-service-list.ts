'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudMeshServiceService } from '../services/global-cloud-mesh-service.service';
import { createClient } from '@/lib/supabase/client';
import type { MeshService } from '@educi/types';

export const useGlobalCloudMeshServiceList = (schoolId: string) => {
  const [items, setItems] = useState<MeshService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudMeshServiceService(supabase);
      const data = await service.list(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};