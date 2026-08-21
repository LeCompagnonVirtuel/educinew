'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSMicrosoftTeamsIntegrationService } from '../services/eduos-microsoft-teams-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { MicrosoftTeamsIntegration } from '@educi/types';

export const useEduOSMicrosoftTeamsIntegrationList = (schoolId: string) => {
  const [items, setItems] = useState<MicrosoftTeamsIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMicrosoftTeamsIntegrationService(supabase);
      const data = await service.listMicrosoftTeamsIntegrations(schoolId);
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