'use client';

import { useState, useEffect, useCallback } from 'react';
import type { LogConfig, LogEntries, RemoteLog, AuditLog } from '@educi/types';

export function useLogConfig(schoolId: string) {
  const [data, setData] = useState<LogConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/log/config?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch log config');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchConfig(); }, [fetchConfig]);

  return { data, loading, error, refetch: fetchConfig };
}

export function useLogEntries(schoolId: string) {
  const [data, setData] = useState<LogEntries[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/log/entries?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch log entries');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchEntries(); }, [fetchEntries]);

  return { data, loading, error, refetch: fetchEntries };
}

export function useRemoteLog(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendLog = useCallback(async (payload: { level: string; message: string; source: string; metadata?: Record<string, unknown> }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/log/remote?schoolId=${schoolId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to send remote log');
      const json = await res.json();
      return json.data as RemoteLog;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { sendLog, loading, error };
}

export function useAuditLog(schoolId: string) {
  const [data, setData] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAuditLogs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/log/audit?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch audit logs');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchAuditLogs(); }, [fetchAuditLogs]);

  return { data, loading, error, refetch: fetchAuditLogs };
}
