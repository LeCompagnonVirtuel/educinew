'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntPlatformWidgetService } from '../services/platform-widget.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformWidget } from '@educi/types';

export const useEntPlatformWidgetList = (schoolId: string) => {
  const [items, setItems] = useState<PlatformWidget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformWidgetService(supabase);
      const data = await service.listPlatformWidgets(schoolId);
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
