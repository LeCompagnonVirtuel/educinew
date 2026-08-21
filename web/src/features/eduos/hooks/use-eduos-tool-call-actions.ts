'use client';

import { useState, useCallback } from 'react';
import { EduOSToolCallService } from '../services/eduos-tool-call.service';
import { createClient } from '@/lib/supabase/client';
import type { ToolCall } from '@educi/types';

export const useEduOSToolCallActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ToolCall): Promise<ToolCall | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSToolCallService(supabase);
      return await service.createToolCall(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ToolCall>): Promise<ToolCall | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSToolCallService(supabase);
      return await service.updateToolCall(schoolId, id, data);
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
      const service = new EduOSToolCallService(supabase);
      await service.deleteToolCall(schoolId, id);
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