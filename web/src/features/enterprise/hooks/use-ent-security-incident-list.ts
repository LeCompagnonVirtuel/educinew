'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSecurityIncidentService } from '../services/security-incident.service';
import { createClient } from '@/lib/supabase/client';
import type { SecurityIncident } from '@educi/types';

export const useEntSecurityIncidentList = (schoolId: string) => {
  const [items, setItems] = useState<SecurityIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSecurityIncidentService(supabase);
      const data = await service.listSecurityIncidents(schoolId);
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
