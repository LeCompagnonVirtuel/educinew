'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudSecurityIncidentService } from '../services/global-cloud-security-incident.service';
import { createClient } from '@/lib/supabase/client';
import type { SecurityIncident } from '@educi/types';

export const useGlobalCloudSecurityIncidentList = (schoolId: string) => {
  const [items, setItems] = useState<SecurityIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudSecurityIncidentService(supabase);
      const data = await service.list(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};