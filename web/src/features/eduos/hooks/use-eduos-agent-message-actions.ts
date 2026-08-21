'use client';

import { useState, useCallback } from 'react';
import { EduOSAgentMessageService } from '../services/eduos-agent-message.service';
import { createClient } from '@/lib/supabase/client';
import type { AgentMessage } from '@educi/types';

export const useEduOSAgentMessageActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AgentMessage): Promise<AgentMessage | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAgentMessageService(supabase);
      return await service.createAgentMessage(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AgentMessage>): Promise<AgentMessage | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAgentMessageService(supabase);
      return await service.updateAgentMessage(schoolId, id, data);
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
      const service = new EduOSAgentMessageService(supabase);
      await service.deleteAgentMessage(schoolId, id);
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