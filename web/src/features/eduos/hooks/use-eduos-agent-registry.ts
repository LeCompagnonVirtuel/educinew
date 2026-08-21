'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSAgentRegistryService } from '../services/eduos-agent-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { AgentRegistry } from '@educi/types';

export const useEduOSAgentRegistryList = (schoolId: string) => {
  const [items, setItems] = useState<AgentRegistry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAgentRegistryService(supabase);
      const data = await service.listAgentRegistries(schoolId);
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