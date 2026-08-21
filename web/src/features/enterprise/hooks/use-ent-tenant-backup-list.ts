'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntTenantBackupService } from '../services/tenant-backup.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantBackup } from '@educi/types';

export const useEntTenantBackupList = (schoolId: string) => {
  const [items, setItems] = useState<TenantBackup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTenantBackupService(supabase);
      const data = await service.listTenantBackups(schoolId);
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
