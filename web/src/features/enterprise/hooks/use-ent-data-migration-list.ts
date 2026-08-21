'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDataMigrationService } from '../services/data-migration.service';
import { createClient } from '@/lib/supabase/client';
import type { DataMigration } from '@educi/types';

export const useEntDataMigrationList = (schoolId: string) => {
  const [items, setItems] = useState<DataMigration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataMigrationService(supabase);
      const data = await service.listDataMigrations(schoolId);
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
