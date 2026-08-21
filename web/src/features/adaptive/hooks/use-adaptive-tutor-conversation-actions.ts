'use client';

import { useState, useCallback } from 'react';
import { AdaptiveTutorConversationService } from '../services/adaptive-tutor-conversation.service';
import { createClient } from '@/lib/supabase/client';
import type { TutorConversation, TutorConversationCreate } from '@educi/types';

export const useAdaptiveTutorConversationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TutorConversationCreate): Promise<TutorConversation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveTutorConversationService(supabase);
      return await service.createConversation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TutorConversationCreate>): Promise<TutorConversation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveTutorConversationService(supabase);
      return await service.updateConversation(schoolId, id, data);
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
      const service = new AdaptiveTutorConversationService(supabase);
      await service.deleteConversation(schoolId, id);
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
