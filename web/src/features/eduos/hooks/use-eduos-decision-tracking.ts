'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSDecisionTrackingService } from '../services/eduos-decision-tracking.service';
import { createClient } from '@/lib/supabase/client';
import type { DecisionTracking } from '@educi/types';

export const useEduOSDecisionTrackingList = (schoolId: string) => {
  const [items, setItems] = useState<DecisionTracking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDecisionTrackingService(supabase);
      const data = await service.listDecisionTrackings(schoolId);
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
