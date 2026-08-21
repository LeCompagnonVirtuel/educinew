'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ModerationQueue, ModerationAction, UserReport, Appeal, ShadowBan, ProactiveModeration } from '@educi/types';

export function useModerationQueue(schoolId: string) {
  const [data, setData] = useState<ModerationQueue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQueue = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/moderation/queue?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch moderation queue');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchQueue(); }, [fetchQueue]);

  return { data, loading, error, refetch: fetchQueue };
}

export function useModerationAction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const takeAction = useCallback(async (payload: { contentId: string; action: string; reason: string; moderatorId: string }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/moderation/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to take moderation action');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { takeAction, loading, error };
}

export function useUserReport(schoolId: string) {
  const [data, setData] = useState<UserReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/moderation/reports?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch user reports');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchReports(); }, [fetchReports]);

  return { data, loading, error, refetch: fetchReports };
}

export function useAppeal(appealId: string) {
  const [data, setData] = useState<Appeal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppeal = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/moderation/appeals/${appealId}`);
      if (!res.ok) throw new Error('Failed to fetch appeal');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [appealId]);

  useEffect(() => { fetchAppeal(); }, [fetchAppeal]);

  return { data, loading, error, refetch: fetchAppeal };
}

export function useShadowBan() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleShadowBan = useCallback(async (userId: string, banned: boolean, reason: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/moderation/shadow-ban', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, banned, reason }),
      });
      if (!res.ok) throw new Error('Failed to toggle shadow ban');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { toggleShadowBan, loading, error };
}

export function useProactiveModeration(schoolId: string) {
  const [data, setData] = useState<ProactiveModeration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProactive = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/moderation/proactive?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch proactive moderation');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchProactive(); }, [fetchProactive]);

  return { data, loading, error, refetch: fetchProactive };
}
