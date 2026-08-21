'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSMicrosoft365IntegrationService } from '../services/eduos-microsoft365-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { Microsoft365Integration } from '@educi/types';

export const useEduOSMicrosoft365IntegrationList = (schoolId: string) => {
  const [items, setItems] = useState<Microsoft365Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMicrosoft365IntegrationService(supabase);
      const data = await service.listMicrosoft365Integrations(schoolId);
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