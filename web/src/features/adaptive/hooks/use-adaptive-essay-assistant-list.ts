'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveEssayAssistantService } from '../services/adaptive-essay-assistant.service';
import { createClient } from '@/lib/supabase/client';
import type { EssayAssistant } from '@educi/types';

export const useAdaptiveEssayAssistantList = (schoolId: string) => {
  const [items, setItems] = useState<EssayAssistant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveEssayAssistantService(supabase);
      const data = await service.listAssistants(schoolId);
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
