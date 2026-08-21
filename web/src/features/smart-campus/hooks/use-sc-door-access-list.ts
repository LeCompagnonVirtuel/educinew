'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScDoorAccessService } from '../services/sc-door-access.service';
import { createClient } from '@/lib/supabase/client';
import type { DoorAccess } from '@educi/types';

export const useScDoorAccessList = (schoolId: string) => {
  const [accesses, setAccesses] = useState<DoorAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccesses = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScDoorAccessService(createClient());
      const data = await service.listAccess(schoolId);
      setAccesses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchAccesses();
  }, [fetchAccesses]);

  return { accesses, loading, error, refresh: fetchAccesses };
};
