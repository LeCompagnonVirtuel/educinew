'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntConnectorService } from '../services/int-connector.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceConnector } from '@educi/types';

export const useIntConnectorList = (schoolId: string) => {
  const [items, setItems] = useState<IntelligenceConnector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntConnectorService(supabase);
      const data = await service.listConnectors(schoolId);
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