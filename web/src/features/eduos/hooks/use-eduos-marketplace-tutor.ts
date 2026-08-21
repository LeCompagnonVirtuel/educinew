'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSMarketplaceTutorService } from '../services/eduos-marketplace-tutor.service';
import { createClient } from '@/lib/supabase/client';
import type { MarketplaceTutor } from '@educi/types';

export const useEduOSMarketplaceTutorList = (schoolId: string) => {
  const [items, setItems] = useState<MarketplaceTutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMarketplaceTutorService(supabase);
      const data = await service.listMarketplaceTutors(schoolId);
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
