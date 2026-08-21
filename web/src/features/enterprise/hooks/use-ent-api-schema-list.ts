'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAPISchemaService } from '../services/api-schema.service';
import { createClient } from '@/lib/supabase/client';
import type { APISchema } from '@educi/types';

export const useEntAPISchemaList = (schoolId: string) => {
  const [items, setItems] = useState<APISchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPISchemaService(supabase);
      const data = await service.listAPISchemas(schoolId);
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
