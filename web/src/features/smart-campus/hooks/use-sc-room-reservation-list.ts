'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScRoomReservationService } from '../services/sc-room-reservation.service';
import { createClient } from '@/lib/supabase/client';
import type { RoomReservation } from '@educi/types';

export const useScRoomReservationList = (schoolId: string) => {
  const [reservations, setReservations] = useState<RoomReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScRoomReservationService(createClient());
      const data = await service.listReservations(schoolId);
      setReservations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  return { reservations, loading, error, refresh: fetchReservations };
};
