'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIncidentReviewService } from '../services/incident-review.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentReview } from '@educi/types';

export const useEntIncidentReviewList = (schoolId: string) => {
  const [items, setItems] = useState<IncidentReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentReviewService(supabase);
      const data = await service.listIncidentReviews(schoolId);
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
