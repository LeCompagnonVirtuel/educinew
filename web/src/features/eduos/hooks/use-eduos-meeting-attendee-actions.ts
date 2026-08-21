'use client';

import { useState, useCallback } from 'react';
import { EduOSMeetingAttendeeService } from '../services/eduos-meeting-attendee.service';
import { createClient } from '@/lib/supabase/client';
import type { MeetingAttendee } from '@educi/types';

export const useEduOSMeetingAttendeeActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<MeetingAttendee>): Promise<MeetingAttendee | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMeetingAttendeeService(supabase);
      return await service.createMeetingAttendee(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MeetingAttendee>): Promise<MeetingAttendee | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMeetingAttendeeService(supabase);
      return await service.updateMeetingAttendee(schoolId, id, data);
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
      const service = new EduOSMeetingAttendeeService(supabase);
      await service.deleteMeetingAttendee(schoolId, id);
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
