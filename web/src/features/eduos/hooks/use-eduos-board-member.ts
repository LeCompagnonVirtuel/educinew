'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSBoardMemberService } from '../services/eduos-board-member.service';
import { createClient } from '@/lib/supabase/client';
import type { BoardMember } from '@educi/types';

export const useEduOSBoardMemberList = (schoolId: string) => {
  const [items, setItems] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBoardMemberService(supabase);
      const data = await service.listBoardMembers(schoolId);
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
