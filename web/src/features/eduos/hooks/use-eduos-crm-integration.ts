'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSCRMIntegrationService } from '../services/eduos-crm-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { CRMIntegration } from '@educi/types';

export const useEduOSCRMIntegrationList = (schoolId: string) => {
  const [items, setItems] = useState<CRMIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCRMIntegrationService(supabase);
      const data = await service.listCRMIntegrations(schoolId);
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