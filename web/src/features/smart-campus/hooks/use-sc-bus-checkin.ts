'use client';
import { useState, useCallback } from 'react';
import { ScBusAttendanceService } from '../services/sc-bus-attendance.service';
import { createClient } from '@/lib/supabase/client';
import type { BusAttendance, BusCheckIn } from '@educi/types';

export const useScBusCheckin = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkIn = useCallback(async (data: BusCheckIn): Promise<BusAttendance | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScBusAttendanceService(createClient());
      return await service.checkIn(schoolId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const checkOut = useCallback(async (attendanceId: string): Promise<BusAttendance | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScBusAttendanceService(createClient());
      return await service.updateAttendance(schoolId, attendanceId, { checkOutTime: new Date().toISOString() });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getAttendance = useCallback(async (): Promise<BusAttendance[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScBusAttendanceService(createClient());
      return await service.listAttendances(schoolId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, checkIn, checkOut, getAttendance };
};
