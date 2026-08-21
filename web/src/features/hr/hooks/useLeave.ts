import { useState, useEffect, useCallback } from 'react';
import { createLeaveService } from '../services/leave.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { Leave } from '../types';

export function useLeaves(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createLeaveService(repo);
  const [data, setData] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findLeaves(schoolId);
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

export function useLeave(supabase: any, schoolId: string, leaveId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createLeaveService(repo);
  const [data, setData] = useState<Leave | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!leaveId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findLeaveById(schoolId, leaveId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, leaveId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

export function usePendingLeaves(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createLeaveService(repo);
  const [data, setData] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findPendingLeaves(schoolId);
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
