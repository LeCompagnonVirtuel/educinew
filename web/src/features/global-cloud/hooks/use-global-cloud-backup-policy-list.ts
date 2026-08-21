'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudBackupPolicyService } from '../services/global-cloud-backup-policy.service';
import { createClient } from '@/lib/supabase/client';
import type { BackupPolicy } from '@educi/types';

export const useGlobalCloudBackupPolicyList = (schoolId: string) => {
  const [items, setItems] = useState<BackupPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudBackupPolicyService(supabase);
      const data = await service.list(schoolId);
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