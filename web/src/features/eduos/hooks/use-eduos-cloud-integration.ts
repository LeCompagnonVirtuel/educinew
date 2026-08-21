'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSCloudIntegrationService } from '../services/eduos-cloud-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudIntegration } from '@educi/types';

export const useEduOSCloudIntegrationList = (schoolId: string) => {
  const [items, setItems] = useState<CloudIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCloudIntegrationService(supabase);
      const data = await service.listCloudIntegrations(schoolId);
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