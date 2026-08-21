'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSBoardService } from '../services/eduos-board.service';
import { createClient } from '@/lib/supabase/client';
import type { Board } from '@educi/types';

export const useEduOSBoardList = (schoolId: string) => {
  const [items, setItems] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBoardService(supabase);
      const data = await service.listBoards(schoolId);
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
