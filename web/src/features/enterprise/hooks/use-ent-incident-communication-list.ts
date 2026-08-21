'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIncidentCommunicationService } from '../services/incident-communication.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentCommunication } from '@educi/types';

export const useEntIncidentCommunicationList = (schoolId: string) => {
  const [items, setItems] = useState<IncidentCommunication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentCommunicationService(supabase);
      const data = await service.listIncidentCommunications(schoolId);
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
