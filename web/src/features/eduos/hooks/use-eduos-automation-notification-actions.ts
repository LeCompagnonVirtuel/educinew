'use client';

import { useState, useCallback } from 'react';
import { EduOSAutomationNotificationService } from '../services/eduos-automation-notification.service';
import { createClient } from '@/lib/supabase/client';
import type { AutomationNotification } from '@educi/types';

export const useEduOSAutomationNotificationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AutomationNotification): Promise<AutomationNotification | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationNotificationService(supabase);
      return await service.createAutomationNotification(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AutomationNotification>): Promise<AutomationNotification | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationNotificationService(supabase);
      return await service.updateAutomationNotification(schoolId, id, data);
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
      const service = new EduOSAutomationNotificationService(supabase);
      await service.deleteAutomationNotification(schoolId, id);
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