'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSMeetingAgendaItemService } from '../services/eduos-meeting-agenda-item.service';
import { createClient } from '@/lib/supabase/client';
import type { MeetingAgendaItem } from '@educi/types';

export const useEduOSMeetingAgendaItemList = (schoolId: string) => {
  const [items, setItems] = useState<MeetingAgendaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMeetingAgendaItemService(supabase);
      const data = await service.listMeetingAgendaItems(schoolId);
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
