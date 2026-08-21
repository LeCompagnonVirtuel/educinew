'use client';
import { useState, useCallback } from 'react';
import { ScRoomReservationService } from '../services/sc-room-reservation.service';
import { createClient } from '@/lib/supabase/client';
import type { RoomReservation, RoomReservationCreate } from '@educi/types';

export const useScRoomBooking = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const book = useCallback(async (data: RoomReservationCreate): Promise<RoomReservation | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScRoomReservationService(createClient());
      return await service.createReservation(schoolId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const cancel = useCallback(async (reservationId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScRoomReservationService(createClient());
      await service.deleteReservation(schoolId, reservationId);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getAvailable = useCallback(async (): Promise<RoomReservation[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScRoomReservationService(createClient());
      return await service.listReservations(schoolId, { status: 'available' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, book, cancel, getAvailable };
};
