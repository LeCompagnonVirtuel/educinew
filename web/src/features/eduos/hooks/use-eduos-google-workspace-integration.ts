'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSGoogleWorkspaceIntegrationService } from '../services/eduos-google-workspace-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { GoogleWorkspaceIntegration } from '@educi/types';

export const useEduOSGoogleWorkspaceIntegrationList = (schoolId: string) => {
  const [items, setItems] = useState<GoogleWorkspaceIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSGoogleWorkspaceIntegrationService(supabase);
      const data = await service.listGoogleWorkspaceIntegrations(schoolId);
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