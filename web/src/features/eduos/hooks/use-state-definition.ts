'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSStateDefinitionService } from '../services/eduos-state-definition.service';
import { createClient } from '@/lib/supabase/client';
import type { StateDefinition } from '@educi/types';

export const useEduOSStateDefinitionList = (schoolId: string) => {
  const [items, setItems] = useState<StateDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSStateDefinitionService(supabase);
      const data = await service.listStateDefinitions(schoolId);
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
