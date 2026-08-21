'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSToolCallService } from '../services/eduos-tool-call.service';
import { createClient } from '@/lib/supabase/client';
import type { ToolCall } from '@educi/types';

export const useEduOSToolCallList = (schoolId: string) => {
  const [items, setItems] = useState<ToolCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSToolCallService(supabase);
      const data = await service.listToolCalls(schoolId);
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