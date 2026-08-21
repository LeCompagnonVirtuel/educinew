'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSVideoConferenceIntegrationService } from '../services/eduos-video-conference-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { VideoConferenceIntegration } from '@educi/types';

export const useEduOSVideoConferenceIntegrationList = (schoolId: string) => {
  const [items, setItems] = useState<VideoConferenceIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSVideoConferenceIntegrationService(supabase);
      const data = await service.listVideoConferenceIntegrations(schoolId);
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