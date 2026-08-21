'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSAIModelRegistryService } from '../services/eduos-ai-model-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { AIModelRegistry } from '@educi/types';

export const useEduOSAIModelRegistryList = (schoolId: string) => {
  const [items, setItems] = useState<AIModelRegistry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAIModelRegistryService(supabase);
      const data = await service.listAIModelRegistries(schoolId);
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