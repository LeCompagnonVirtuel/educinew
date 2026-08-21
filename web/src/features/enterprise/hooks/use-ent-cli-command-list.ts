'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCLICommandService } from '../services/cli-command.service';
import { createClient } from '@/lib/supabase/client';
import type { CLICommand } from '@educi/types';

export const useEntCLICommandList = (schoolId: string) => {
  const [items, setItems] = useState<CLICommand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCLICommandService(supabase);
      const data = await service.listCLICommands(schoolId);
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
