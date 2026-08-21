'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSIntegrationConnectorService } from '../services/eduos-integration-connector.service';
import { createClient } from '@/lib/supabase/client';
import type { IntegrationConnector } from '@educi/types';

export const useEduOSIntegrationConnectorList = (schoolId: string) => {
  const [items, setItems] = useState<IntegrationConnector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIntegrationConnectorService(supabase);
      const data = await service.listIntegrationConnectors(schoolId);
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