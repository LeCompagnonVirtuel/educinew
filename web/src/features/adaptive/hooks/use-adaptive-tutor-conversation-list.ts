'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveTutorConversationService } from '../services/adaptive-tutor-conversation.service';
import { createClient } from '@/lib/supabase/client';
import type { TutorConversation } from '@educi/types';

export const useAdaptiveTutorConversationList = (schoolId: string) => {
  const [items, setItems] = useState<TutorConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveTutorConversationService(supabase);
      const data = await service.listConversations(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
