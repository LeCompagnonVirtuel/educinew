'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntServiceMeshService } from '../services/service-mesh.service';
import { createClient } from '@/lib/supabase/client';
import type { ServiceMesh } from '@educi/types';

export const useEntServiceMeshList = (schoolId: string) => {
  const [items, setItems] = useState<ServiceMesh[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntServiceMeshService(supabase);
      const data = await service.listServiceMeshs(schoolId);
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
