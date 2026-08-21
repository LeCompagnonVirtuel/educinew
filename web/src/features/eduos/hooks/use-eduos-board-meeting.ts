'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSBoardMeetingService } from '../services/eduos-board-meeting.service';
import { createClient } from '@/lib/supabase/client';
import type { BoardMeeting } from '@educi/types';

export const useEduOSBoardMeetingList = (schoolId: string) => {
  const [items, setItems] = useState<BoardMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBoardMeetingService(supabase);
      const data = await service.listBoardMeetings(schoolId);
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
