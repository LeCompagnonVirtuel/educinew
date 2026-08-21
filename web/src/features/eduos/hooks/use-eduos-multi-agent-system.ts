'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSMultiAgentSystemService } from '../services/eduos-multi-agent-system.service';
import { createClient } from '@/lib/supabase/client';
import type { MultiAgentSystem } from '@educi/types';

export const useEduOSMultiAgentSystemList = (schoolId: string) => {
  const [items, setItems] = useState<MultiAgentSystem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMultiAgentSystemService(supabase);
      const data = await service.listMultiAgentSystems(schoolId);
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