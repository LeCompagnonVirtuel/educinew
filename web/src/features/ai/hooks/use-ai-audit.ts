'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AuditEvent, AuditQuery, AuditReport, ComplianceAudit, AuditArchive } from '@educi/types';

export function useAuditEvent(schoolId: string) {
  const [data, setData] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/audit/events?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch audit events');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  return { data, loading, error, refetch: fetchEvents };
}

export function useAuditQuery(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AuditQuery | null>(null);

  const queryAudit = useCallback(async (payload: { startDate: string; endDate: string; filters: Record<string, string> }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/audit/query?schoolId=${schoolId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to query audit data');
      const json = await res.json();
      setData(json.data);
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { queryAudit, data, loading, error };
}

export function useAuditReport(schoolId: string) {
  const [data, setData] = useState<AuditReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/audit/report?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch audit report');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchReport(); }, [fetchReport]);

  return { data, loading, error, refetch: fetchReport };
}

export function useComplianceAudit(schoolId: string) {
  const [data, setData] = useState<ComplianceAudit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAudits = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/audit/compliance?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch compliance audits');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchAudits(); }, [fetchAudits]);

  return { data, loading, error, refetch: fetchAudits };
}

export function useAuditArchive(schoolId: string) {
  const [data, setData] = useState<AuditArchive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArchives = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/audit/archives?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch audit archives');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchArchives(); }, [fetchArchives]);

  return { data, loading, error, refetch: fetchArchives };
}
