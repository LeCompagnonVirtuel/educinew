'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIncidentEscalationService } from '../services/incident-escalation.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentEscalation } from '@educi/types';

export const useEntIncidentEscalationList = (schoolId: string) => {
  const [items, setItems] = useState<IncidentEscalation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentEscalationService(supabase);
      const data = await service.listIncidentEscalations(schoolId);
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
