'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveConceptExplanationService } from '../services/adaptive-concept-explanation.service';
import { createClient } from '@/lib/supabase/client';
import type { ConceptExplanation } from '@educi/types';

export const useAdaptiveConceptExplanationList = (schoolId: string) => {
  const [items, setItems] = useState<ConceptExplanation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveConceptExplanationService(supabase);
      const data = await service.listExplanations(schoolId);
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
