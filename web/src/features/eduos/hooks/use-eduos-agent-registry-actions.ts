'use client';

import { useState, useCallback } from 'react';
import { EduOSAgentRegistryService } from '../services/eduos-agent-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { AgentRegistry } from '@educi/types';

export const useEduOSAgentRegistryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AgentRegistry): Promise<AgentRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAgentRegistryService(supabase);
      return await service.createAgentRegistry(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AgentRegistry>): Promise<AgentRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAgentRegistryService(supabase);
      return await service.updateAgentRegistry(schoolId, id, data);
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
      const service = new EduOSAgentRegistryService(supabase);
      await service.deleteAgentRegistry(schoolId, id);
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