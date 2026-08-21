'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScSmartLockService } from '../services/sc-smart-lock.service';
import { createClient } from '@/lib/supabase/client';
import type { SmartLock } from '@educi/types';

export const useScSmartLockList = (schoolId: string) => {
  const [locks, setLocks] = useState<SmartLock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocks = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScSmartLockService(createClient());
      const data = await service.listLocks(schoolId);
      setLocks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchLocks();
  }, [fetchLocks]);

  return { locks, loading, error, refresh: fetchLocks };
};
