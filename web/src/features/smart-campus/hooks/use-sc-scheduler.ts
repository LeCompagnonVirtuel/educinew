'use client';
import { useState, useCallback } from 'react';
import { ScRoomSchedulingService } from '../services/sc-room-scheduling.service';
import { createClient } from '@/lib/supabase/client';
import type { RoomScheduling, RoomSchedulingCreate } from '@educi/types';

export const useScScheduler = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const schedule = useCallback(async (data: RoomSchedulingCreate): Promise<RoomScheduling | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScRoomSchedulingService(createClient());
      return await service.createScheduling(schoolId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const cancel = useCallback(async (schedulingId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScRoomSchedulingService(createClient());
      await service.deleteScheduling(schoolId, schedulingId);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getUpcoming = useCallback(async (): Promise<RoomScheduling[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScRoomSchedulingService(createClient());
      return await service.listSchedulings(schoolId, { status: 'upcoming' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, schedule, cancel, getUpcoming };
};
