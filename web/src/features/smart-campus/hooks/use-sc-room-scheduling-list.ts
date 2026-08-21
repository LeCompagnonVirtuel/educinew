'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScRoomSchedulingService } from '../services/sc-room-scheduling.service';
import { createClient } from '@/lib/supabase/client';
import type { RoomScheduling } from '@educi/types';

export const useScRoomSchedulingList = (schoolId: string) => {
  const [schedulings, setSchedulings] = useState<RoomScheduling[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedulings = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScRoomSchedulingService(createClient());
      const data = await service.listSchedulings(schoolId);
      setSchedulings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchSchedulings();
  }, [fetchSchedulings]);

  return { schedulings, loading, error, refresh: fetchSchedulings };
};
