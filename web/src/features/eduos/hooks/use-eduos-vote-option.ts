'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSVoteOptionService } from '../services/eduos-vote-option.service';
import { createClient } from '@/lib/supabase/client';
import type { VoteOption } from '@educi/types';

export const useEduOSVoteOptionList = (schoolId: string) => {
  const [items, setItems] = useState<VoteOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSVoteOptionService(supabase);
      const data = await service.listVoteOptions(schoolId);
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
