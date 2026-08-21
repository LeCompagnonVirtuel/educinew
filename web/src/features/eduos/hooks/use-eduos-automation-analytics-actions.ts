'use client';

import { useState, useCallback } from 'react';
import { EduOSAutomationAnalyticsService } from '../services/eduos-automation-analytics.service';
import { createClient } from '@/lib/supabase/client';
import type { AutomationAnalytics } from '@educi/types';

export const useEduOSAutomationAnalyticsActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AutomationAnalytics): Promise<AutomationAnalytics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationAnalyticsService(supabase);
      return await service.createAutomationAnalytics(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AutomationAnalytics>): Promise<AutomationAnalytics | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationAnalyticsService(supabase);
      return await service.updateAutomationAnalytics(schoolId, id, data);
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
      const service = new EduOSAutomationAnalyticsService(supabase);
      await service.deleteAutomationAnalytics(schoolId, id);
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