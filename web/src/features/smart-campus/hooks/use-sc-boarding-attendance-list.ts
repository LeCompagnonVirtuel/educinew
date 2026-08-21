'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScBoardingAttendanceService } from '../services/sc-boarding-attendance.service';
import { createClient } from '@/lib/supabase/client';
import type { BoardingAttendance, BoardingAttendanceCreate } from '@educi/types';

export const useScBoardingAttendanceList = (schoolId: string) => {
  const [items, setItems] = useState<BoardingAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScBoardingAttendanceService(createClient());
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

export const useScBoardingAttendanceGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<BoardingAttendance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScBoardingAttendanceService(createClient());
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

export const useScBoardingAttendanceCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: BoardingAttendanceCreate): Promise<BoardingAttendance | null> => {
    try {
      setLoading(true);
      const service = new ScBoardingAttendanceService(createClient());
      const result = await service.createAttendance(schoolId, data);
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

export const useScBoardingAttendanceUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: Partial<BoardingAttendanceCreate>): Promise<BoardingAttendance | null> => {
    try {
      setLoading(true);
      const service = new ScBoardingAttendanceService(createClient());
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

export const useScBoardingAttendanceDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScBoardingAttendanceService(createClient());
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
