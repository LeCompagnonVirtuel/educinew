'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScBusAttendanceService } from '../services/sc-bus-attendance.service';
import { createClient } from '@/lib/supabase/client';
import type { BusAttendance, BusCheckIn } from '@educi/types';

export const useScBusAttendanceList = (schoolId: string) => {
  const [items, setItems] = useState<BusAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScBusAttendanceService(createClient());
      const data = await service.listAttendances(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return { items, loading, error, refresh: fetchData };
};

export const useScBusAttendanceGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<BusAttendance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScBusAttendanceService(createClient());
      const data = await service.getAttendance(schoolId, id);
      setItem(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);
  useEffect(() => { fetchItem(); }, [fetchItem]);
  return { item, loading, error, refresh: fetchItem };
};

export const useScBusAttendanceCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: BusCheckIn): Promise<BusAttendance | null> => {
    try {
      setLoading(true);
      const service = new ScBusAttendanceService(createClient());
      const result = await service.checkIn(schoolId, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { create, loading, error };
};

export const useScBusAttendanceUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: Partial<BusAttendance>): Promise<BusAttendance | null> => {
    try {
      setLoading(true);
      const service = new ScBusAttendanceService(createClient());
      const result = await service.updateAttendance(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { update, loading, error };
};

export const useScBusAttendanceDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScBusAttendanceService(createClient());
      await service.deleteAttendance(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { remove, loading, error };
};
