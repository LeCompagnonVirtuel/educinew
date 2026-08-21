'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSContextEngineService } from '../services/eduos-context-engine.service';
import { createClient } from '@/lib/supabase/client';
import type { ContextEngine } from '@educi/types';

export const useEduOSContextEngineList = (schoolId: string) => {
  const [items, setItems] = useState<ContextEngine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSContextEngineService(supabase);
      const data = await service.listContextEngines(schoolId);
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