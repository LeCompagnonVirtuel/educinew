import { useState, useEffect, useCallback } from 'react';
import { createAttendanceHrService } from '../services/attendance-hr.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { EmployeeAttendance } from '../types';

export function useAttendanceHr(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createAttendanceHrService(repo);
  const [data, setData] = useState<EmployeeAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findAttendance(schoolId);
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

export function useClockIn(supabase: any) {
  const repo = createHRRepository(supabase);
  const service = createAttendanceHrService(repo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clockIn = useCallback(async (schoolId: string, employeeId: string, clockInTime?: string, location?: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.clockIn(schoolId, employeeId, clockInTime, location);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { clockIn, loading, error };
}

export function useClockOut(supabase: any) {
  const repo = createHRRepository(supabase);
  const service = createAttendanceHrService(repo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clockOut = useCallback(async (schoolId: string, employeeId: string, clockOutTime?: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.clockOut(schoolId, employeeId, clockOutTime);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { clockOut, loading, error };
}
