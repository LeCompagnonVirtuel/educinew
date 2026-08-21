'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSAgentConversationService } from '../services/eduos-agent-conversation.service';
import { createClient } from '@/lib/supabase/client';
import type { AgentConversation } from '@educi/types';

export const useEduOSAgentConversationList = (schoolId: string) => {
  const [items, setItems] = useState<AgentConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAgentConversationService(supabase);
      const data = await service.listAgentConversations(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};