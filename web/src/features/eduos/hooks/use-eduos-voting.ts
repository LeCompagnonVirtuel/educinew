'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSVotingService } from '../services/eduos-voting.service';
import { createClient } from '@/lib/supabase/client';
import type { Voting } from '@educi/types';

export const useEduOSVotingList = (schoolId: string) => {
  const [items, setItems] = useState<Voting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSVotingService(supabase);
      const data = await service.listVotings(schoolId);
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
