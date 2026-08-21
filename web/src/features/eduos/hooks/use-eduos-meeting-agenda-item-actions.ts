'use client';

import { useState, useCallback } from 'react';
import { EduOSMeetingAgendaItemService } from '../services/eduos-meeting-agenda-item.service';
import { createClient } from '@/lib/supabase/client';
import type { MeetingAgendaItem } from '@educi/types';

export const useEduOSMeetingAgendaItemActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<MeetingAgendaItem>): Promise<MeetingAgendaItem | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMeetingAgendaItemService(supabase);
      return await service.createMeetingAgendaItem(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MeetingAgendaItem>): Promise<MeetingAgendaItem | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMeetingAgendaItemService(supabase);
      return await service.updateMeetingAgendaItem(schoolId, id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMeetingAgendaItemService(supabase);
      await service.deleteMeetingAgendaItem(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};
