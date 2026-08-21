'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudServiceMeshPolicyService } from '../services/global-cloud-service-mesh-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { ServiceMeshPolicy } from '@educi/types';

export const useGlobalCloudServiceMeshPolicyList = (schoolId: string) => {
  const [items, setItems] = useState<ServiceMeshPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudServiceMeshPolicyService(supabase);
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