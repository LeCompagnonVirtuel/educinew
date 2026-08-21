'use client';
import { useState, useCallback } from 'react';
import { ScGuardService } from '../services/sc-guard.service';
import { createClient } from '@/lib/supabase/client';
import type { Guard, GuardCreate } from '@educi/types';

export const useScGuardPatrol = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startPatrol = useCallback(async (data: GuardCreate): Promise<Guard | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScGuardService(createClient());
      return await service.createGuard(schoolId, { ...data, patrolStartTime: new Date().toISOString() });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const endPatrol = useCallback(async (guardId: string): Promise<Guard | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScGuardService(createClient());
      return await service.updateGuard(schoolId, guardId, { patrolEndTime: new Date().toISOString() });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getLog = useCallback(async (): Promise<Guard[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScGuardService(createClient());
      return await service.listGuards(schoolId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, startPatrol, endPatrol, getLog };
};
