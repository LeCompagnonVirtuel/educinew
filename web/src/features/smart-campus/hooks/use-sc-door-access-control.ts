'use client';
import { useState, useCallback } from 'react';
import { ScDoorAccessService } from '../services/sc-door-access.service';
import { createClient } from '@/lib/supabase/client';
import type { DoorAccess, DoorAccessCreate } from '@educi/types';

export const useScDoorAccessControl = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unlock = useCallback(async (doorId: string): Promise<DoorAccess | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScDoorAccessService(createClient());
      return await service.updateAccess(schoolId, doorId, { status: 'unlocked' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const lock = useCallback(async (doorId: string): Promise<DoorAccess | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScDoorAccessService(createClient());
      return await service.updateAccess(schoolId, doorId, { status: 'locked' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getAccessLog = useCallback(async (doorId: string): Promise<DoorAccess[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScDoorAccessService(createClient());
      return await service.listAccess(schoolId, { doorId });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, unlock, lock, getAccessLog };
};
