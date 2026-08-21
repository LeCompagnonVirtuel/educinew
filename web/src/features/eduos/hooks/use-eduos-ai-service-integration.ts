'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSAIServiceIntegrationService } from '../services/eduos-ai-service-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { AIServiceIntegration } from '@educi/types';

export const useEduOSAIServiceIntegrationList = (schoolId: string) => {
  const [items, setItems] = useState<AIServiceIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAIServiceIntegrationService(supabase);
      const data = await service.listAIServiceIntegrations(schoolId);
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