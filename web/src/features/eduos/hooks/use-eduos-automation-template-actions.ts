'use client';

import { useState, useCallback } from 'react';
import { EduOSAutomationTemplateService } from '../services/eduos-automation-template.service';
import { createClient } from '@/lib/supabase/client';
import type { AutomationTemplate } from '@educi/types';

export const useEduOSAutomationTemplateActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AutomationTemplate): Promise<AutomationTemplate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationTemplateService(supabase);
      return await service.createAutomationTemplate(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AutomationTemplate>): Promise<AutomationTemplate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationTemplateService(supabase);
      return await service.updateAutomationTemplate(schoolId, id, data);
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
      const service = new EduOSAutomationTemplateService(supabase);
      await service.deleteAutomationTemplate(schoolId, id);
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