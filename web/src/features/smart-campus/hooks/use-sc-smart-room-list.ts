'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScSmartRoomService } from '../services/sc-smart-room.service';
import { createClient } from '@/lib/supabase/client';
import type { SmartRoom } from '@educi/types';

export const useScSmartRoomList = (schoolId: string) => {
  const [rooms, setRooms] = useState<SmartRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScSmartRoomService(createClient());
      const data = await service.listRooms(schoolId);
      setRooms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return { rooms, loading, error, refresh: fetchRooms };
};
