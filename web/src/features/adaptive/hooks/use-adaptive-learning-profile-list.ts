'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveLearningProfileService } from '../services/adaptive-learning-profile.service';
import { createClient } from '@/lib/supabase/client';
import type { LearningProfile } from '@educi/types';

export const useAdaptiveLearningProfileList = (schoolId: string) => {
  const [items, setItems] = useState<LearningProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveLearningProfileService(supabase);
      const data = await service.listLearningProfiles(schoolId);
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
