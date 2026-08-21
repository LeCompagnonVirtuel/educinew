'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSGoogleClassroomIntegrationService } from '../services/eduos-google-classroom-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { GoogleClassroomIntegration } from '@educi/types';

export const useEduOSGoogleClassroomIntegrationList = (schoolId: string) => {
  const [items, setItems] = useState<GoogleClassroomIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSGoogleClassroomIntegrationService(supabase);
      const data = await service.listGoogleClassroomIntegrations(schoolId);
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