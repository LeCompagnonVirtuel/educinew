'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudAPIGatewayService } from '../services/global-cloud-api-gateway.service';
import { createClient } from '@/lib/supabase/client';
import type { APIGateway } from '@educi/types';

export const useGlobalCloudAPIGatewayList = (schoolId: string) => {
  const [items, setItems] = useState<APIGateway[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudAPIGatewayService(supabase);
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