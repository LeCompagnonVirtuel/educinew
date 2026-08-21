'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntLogEnrichmentService } from '../services/log-enrichment.service';
import { createClient } from '@/lib/supabase/client';
import type { LogEnrichment } from '@educi/types';

export const useEntLogEnrichmentList = (schoolId: string) => {
  const [items, setItems] = useState<LogEnrichment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogEnrichmentService(supabase);
      const data = await service.listLogEnrichments(schoolId);
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
