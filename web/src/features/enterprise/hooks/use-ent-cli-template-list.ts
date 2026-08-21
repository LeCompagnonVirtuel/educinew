'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntCLITemplateService } from '../services/cli-template.service';
import { createClient } from '@/lib/supabase/client';
import type { CLITemplate } from '@educi/types';

export const useEntCLITemplateList = (schoolId: string) => {
  const [items, setItems] = useState<CLITemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntCLITemplateService(supabase);
      const data = await service.listCLITemplates(schoolId);
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
