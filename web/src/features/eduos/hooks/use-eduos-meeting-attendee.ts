'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSMeetingAttendeeService } from '../services/eduos-meeting-attendee.service';
import { createClient } from '@/lib/supabase/client';
import type { MeetingAttendee } from '@educi/types';

export const useEduOSMeetingAttendeeList = (schoolId: string) => {
  const [items, setItems] = useState<MeetingAttendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMeetingAttendeeService(supabase);
      const data = await service.listMeetingAttendees(schoolId);
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
