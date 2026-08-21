'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpAttendanceService } from '../services/lxp-attendance.service';
import type { Attendance } from '@educi/types';
import type { AttendanceQuery } from '../types';

export const useLxpAttendance = (sessionId: string) => {
  const [attendance, setAttendance] = useState<readonly Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendance = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAttendanceService(createClient());
      const data = await service.listAttendance(sessionId);
      setAttendance(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch attendance');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  return { attendance, loading, error, refresh: fetchAttendance };
};

export const useLxpAttendanceRecord = (schoolId: string, id: string | null) => {
  const [record, setRecord] = useState<Attendance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecord = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAttendanceService(createClient());
      const data = await service.getAttendance(schoolId, id);
      setRecord(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch attendance record');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchRecord();
  }, [fetchRecord]);

  return { record, loading, error, refresh: fetchRecord };
};

export const useLxpAttendanceCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (sessionId: string, userId: string, status: string): Promise<Attendance | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAttendanceService(createClient());
      const result = await service.recordAttendance(sessionId, userId, status);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record attendance');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpAttendanceUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, status: string): Promise<Attendance | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAttendanceService(createClient());
      const result = await service.updateAttendance(schoolId, id, status);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update attendance');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpUserAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserAttendance = useCallback(async (userId: string, courseId: string): Promise<readonly Attendance[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAttendanceService(createClient());
      const result = await service.getUserAttendance(userId, courseId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user attendance');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { getUserAttendance, loading, error };
};
