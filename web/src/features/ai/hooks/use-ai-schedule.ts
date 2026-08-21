'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Schedule, ConflictResolution, Optimization, ScheduleTemplate, Publication, Reminder } from '@educi/types';

export function useSchedule(schoolId: string) {
  const [data, setData] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedule = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/schedule?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch schedule');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchSchedule(); }, [fetchSchedule]);

  return { data, loading, error, refetch: fetchSchedule };
}

export function useConflictResolution(schoolId: string) {
  const [data, setData] = useState<ConflictResolution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConflicts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/schedule/conflicts?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch conflicts');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchConflicts(); }, [fetchConflicts]);

  return { data, loading, error, refetch: fetchConflicts };
}

export function useOptimization(schoolId: string) {
  const [data, setData] = useState<Optimization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOptimization = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/schedule/optimization?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch optimization');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchOptimization(); }, [fetchOptimization]);

  return { data, loading, error, refetch: fetchOptimization };
}

export function useScheduleTemplate(schoolId: string) {
  const [data, setData] = useState<ScheduleTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/schedule/templates?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch schedule templates');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchTemplates(); }, [fetchTemplates]);

  return { data, loading, error, refetch: fetchTemplates };
}

export function usePublication(schoolId: string) {
  const [data, setData] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPublications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/schedule/publications?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch publications');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchPublications(); }, [fetchPublications]);

  return { data, loading, error, refetch: fetchPublications };
}

export function useReminder(schoolId: string) {
  const [data, setData] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReminders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/schedule/reminders?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch reminders');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchReminders(); }, [fetchReminders]);

  return { data, loading, error, refetch: fetchReminders };
}
