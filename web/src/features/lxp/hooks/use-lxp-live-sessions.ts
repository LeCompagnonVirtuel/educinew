'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpLiveSessionService } from '../services/lxp-live-session.service';
import type { LiveSession, LiveSessionCreate, LiveSessionQuery, Attendance } from '@educi/types';

export const useLxpLiveSessions = (query?: LiveSessionQuery) => {
  const [sessions, setSessions] = useState<readonly LiveSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLiveSessionService(createClient());
      const data = await service.listLiveSessions(query ?? {});
      setSessions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch live sessions');
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return { sessions, loading, error, refresh: fetchSessions };
};

export const useLxpLiveSession = (schoolId: string, id: string | null) => {
  const [session, setSession] = useState<LiveSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSession = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLiveSessionService(createClient());
      const data = await service.getLiveSession(schoolId, id);
      setSession(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch live session');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return { session, loading, error, refresh: fetchSession };
};

export const useLxpLiveSessionCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LiveSessionCreate): Promise<LiveSession | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLiveSessionService(createClient());
      const result = await service.createLiveSession(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create live session');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpLiveSessionStart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const start = useCallback(async (schoolId: string, id: string): Promise<LiveSession | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLiveSessionService(createClient());
      const result = await service.startLiveSession(schoolId, id);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start live session');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { start, loading, error };
};

export const useLxpLiveSessionEnd = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const end = useCallback(async (schoolId: string, id: string): Promise<LiveSession | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLiveSessionService(createClient());
      const result = await service.endLiveSession(schoolId, id);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to end live session');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { end, loading, error };
};
