'use client';

import { useState, useCallback } from 'react';
import { EduOSAutomationNodeService } from '../services/eduos-automation-node.service';
import { createClient } from '@/lib/supabase/client';
import type { AutomationNode } from '@educi/types';

export const useEduOSAutomationNodeActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AutomationNode): Promise<AutomationNode | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationNodeService(supabase);
      return await service.createAutomationNode(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AutomationNode>): Promise<AutomationNode | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationNodeService(supabase);
      return await service.updateAutomationNode(schoolId, id, data);
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
      const service = new EduOSAutomationNodeService(supabase);
      await service.deleteAutomationNode(schoolId, id);
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