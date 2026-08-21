import { useState, useEffect, useCallback } from 'react';
import { createShiftService } from '../services/shift.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { EmployeeShift } from '../types';

export function useShifts(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createShiftService(repo);
  const [data, setData] = useState<EmployeeShift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findShifts(schoolId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

export function useShift(supabase: any, schoolId: string, shiftId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createShiftService(repo);
  const [data, setData] = useState<EmployeeShift | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!shiftId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findShiftById(schoolId, shiftId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, shiftId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
