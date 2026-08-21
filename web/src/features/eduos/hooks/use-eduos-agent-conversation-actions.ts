'use client';

import { useState, useCallback } from 'react';
import { EduOSAgentConversationService } from '../services/eduos-agent-conversation.service';
import { createClient } from '@/lib/supabase/client';
import type { AgentConversation } from '@educi/types';

export const useEduOSAgentConversationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AgentConversation): Promise<AgentConversation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAgentConversationService(supabase);
      return await service.createAgentConversation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AgentConversation>): Promise<AgentConversation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAgentConversationService(supabase);
      return await service.updateAgentConversation(schoolId, id, data);
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
      const service = new EduOSAgentConversationService(supabase);
      await service.deleteAgentConversation(schoolId, id);
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