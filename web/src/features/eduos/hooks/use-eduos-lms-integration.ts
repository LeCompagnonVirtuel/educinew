'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSLMSIntegrationService } from '../services/eduos-lms-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { LMSIntegration } from '@educi/types';

export const useEduOSLMSIntegrationList = (schoolId: string) => {
  const [items, setItems] = useState<LMSIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSLMSIntegrationService(supabase);
      const data = await service.listLMSIntegrations(schoolId);
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