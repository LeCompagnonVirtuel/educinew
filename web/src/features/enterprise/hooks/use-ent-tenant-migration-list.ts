'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTenantMigrationService } from '../services/tenant-migration.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantMigration } from '@educi/types';

export const useEntTenantMigrationList = (schoolId: string) => {
  const [items, setItems] = useState<TenantMigration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantMigrationService(supabase);
      const data = await service.listTenantMigrations(schoolId);
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
