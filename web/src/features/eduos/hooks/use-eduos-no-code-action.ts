'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSNoCodeActionService } from '../services/eduos-no-code-action.service';
import { createClient } from '@/lib/supabase/client';
import type { NoCodeAction } from '@educi/types';

export const useEduOSNoCodeActionList = (schoolId: string) => {
  const [items, setItems] = useState<NoCodeAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSNoCodeActionService(supabase);
      const data = await service.listNoCodeActions(schoolId);
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