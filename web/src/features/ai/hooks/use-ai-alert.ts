'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Alert, AlertEscalation, AlertTemplate, AlertSuppression, AlertAnalytics } from '@educi/types';

export function useAlerts(schoolId: string) {
  const [data, setData] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/alert?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch alerts');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchAlerts(); }, [fetchAlerts]);

  return { data, loading, error, refetch: fetchAlerts };
}

export function useAlertEscalation(alertId: string) {
  const [data, setData] = useState<AlertEscalation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEscalations = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/alert/escalations?alertId=${alertId}`);
      if (!res.ok) throw new Error('Failed to fetch alert escalations');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [alertId]);

  useEffect(() => { fetchEscalations(); }, [fetchEscalations]);

  return { data, loading, error, refetch: fetchEscalations };
}

export function useAlertTemplate(schoolId: string) {
  const [data, setData] = useState<AlertTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/alert/templates?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch alert templates');
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

export function useAlertSuppression(schoolId: string) {
  const [data, setData] = useState<AlertSuppression[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSuppressions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/alert/suppressions?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch alert suppressions');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchSuppressions(); }, [fetchSuppressions]);

  return { data, loading, error, refetch: fetchSuppressions };
}

export function useAlertAnalytics(schoolId: string) {
  const [data, setData] = useState<AlertAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/alert/analytics?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch alert analytics');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

  return { data, loading, error, refetch: fetchAnalytics };
}
