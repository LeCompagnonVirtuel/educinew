'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScGuardService } from '../services/sc-guard.service';
import { createClient } from '@/lib/supabase/client';
import type { Guard } from '@educi/types';

export const useScGuardList = (schoolId: string) => {
  const [guards, setGuards] = useState<Guard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGuards = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScGuardService(createClient());
      const data = await service.listGuards(schoolId);
      setGuards(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchGuards();
  }, [fetchGuards]);

  return { guards, loading, error, refresh: fetchGuards };
};
