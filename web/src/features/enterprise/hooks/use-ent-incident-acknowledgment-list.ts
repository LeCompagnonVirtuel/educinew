'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIncidentAcknowledgmentService } from '../services/incident-acknowledgment.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentAcknowledgment } from '@educi/types';

export const useEntIncidentAcknowledgmentList = (schoolId: string) => {
  const [items, setItems] = useState<IncidentAcknowledgment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentAcknowledgmentService(supabase);
      const data = await service.listIncidentAcknowledgments(schoolId);
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
