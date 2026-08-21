'use client';

import { useState, useCallback } from 'react';
import { EduOSMultiAgentSystemService } from '../services/eduos-multi-agent-system.service';
import { createClient } from '@/lib/supabase/client';
import type { MultiAgentSystem } from '@educi/types';

export const useEduOSMultiAgentSystemActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: MultiAgentSystem): Promise<MultiAgentSystem | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMultiAgentSystemService(supabase);
      return await service.createMultiAgentSystem(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MultiAgentSystem>): Promise<MultiAgentSystem | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMultiAgentSystemService(supabase);
      return await service.updateMultiAgentSystem(schoolId, id, data);
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
      const service = new EduOSMultiAgentSystemService(supabase);
      await service.deleteMultiAgentSystem(schoolId, id);
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