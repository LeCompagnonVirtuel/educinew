'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAlertTemplateService } from '../services/alert-template.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertTemplate } from '@educi/types';

export const useEntAlertTemplateList = (schoolId: string) => {
  const [items, setItems] = useState<AlertTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertTemplateService(supabase);
      const data = await service.listAlertTemplates(schoolId);
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
