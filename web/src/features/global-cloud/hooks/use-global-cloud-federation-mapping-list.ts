'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudFederationMappingService } from '../services/global-cloud-federation-mapping.service';
import { createClient } from '@/lib/supabase/client';
import type { FederationMapping } from '@educi/types';

export const useGlobalCloudFederationMappingList = (schoolId: string) => {
  const [items, setItems] = useState<FederationMapping[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudFederationMappingService(supabase);
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