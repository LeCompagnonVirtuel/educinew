'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Dashboard, Widget, DashboardShare, DashboardTemplate, DashboardAlert } from '@educi/types';

export function useDashboard(schoolId: string) {
  const [data, setData] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/dashboard?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch dashboard');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  return { data, loading, error, refetch: fetchDashboard };
}

export function useWidget(dashboardId: string) {
  const [data, setData] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWidgets = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/dashboard/widgets?dashboardId=${dashboardId}`);
      if (!res.ok) throw new Error('Failed to fetch widgets');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [dashboardId]);

  useEffect(() => { fetchWidgets(); }, [fetchWidgets]);

  return { data, loading, error, refetch: fetchWidgets };
}

export function useDashboardShare(dashboardId: string) {
  const [data, setData] = useState<DashboardShare[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShares = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/dashboard/shares?dashboardId=${dashboardId}`);
      if (!res.ok) throw new Error('Failed to fetch dashboard shares');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [dashboardId]);

  useEffect(() => { fetchShares(); }, [fetchShares]);

  return { data, loading, error, refetch: fetchShares };
}

export function useDashboardTemplate(schoolId: string) {
  const [data, setData] = useState<DashboardTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/dashboard/templates?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch dashboard templates');
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

export function useDashboardAlert(dashboardId: string) {
  const [data, setData] = useState<DashboardAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/dashboard/alerts?dashboardId=${dashboardId}`);
      if (!res.ok) throw new Error('Failed to fetch dashboard alerts');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [dashboardId]);

  useEffect(() => { fetchAlerts(); }, [fetchAlerts]);

  return { data, loading, error, refetch: fetchAlerts };
}
