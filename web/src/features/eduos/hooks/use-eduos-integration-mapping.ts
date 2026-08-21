'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSIntegrationMappingService } from '../services/eduos-integration-mapping.service';
import { createClient } from '@/lib/supabase/client';
import type { IntegrationMapping } from '@educi/types';

export const useEduOSIntegrationMappingList = (schoolId: string) => {
  const [items, setItems] = useState<IntegrationMapping[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIntegrationMappingService(supabase);
      const data = await service.listIntegrationMappings(schoolId);
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