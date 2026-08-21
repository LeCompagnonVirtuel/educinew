'use client';

import { useState, useEffect, useCallback } from 'react';
import type { HealthCheck, PerformanceMetrics, Availability, SecurityMetrics, ResourceMetrics } from '@educi/types';

export function useHealthCheck(schoolId: string) {
  const [data, setData] = useState<HealthCheck | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/monitor/health?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch health check');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchHealth(); }, [fetchHealth]);

  return { data, loading, error, refetch: fetchHealth };
}

export function usePerformanceMetrics(schoolId: string) {
  const [data, setData] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/monitor/performance?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch performance metrics');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchMetrics(); }, [fetchMetrics]);

  return { data, loading, error, refetch: fetchMetrics };
}

export function useAvailability(schoolId: string) {
  const [data, setData] = useState<Availability | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/monitor/availability?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch availability');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchAvailability(); }, [fetchAvailability]);

  return { data, loading, error, refetch: fetchAvailability };
}

export function useSecurityMetrics(schoolId: string) {
  const [data, setData] = useState<SecurityMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/monitor/security?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch security metrics');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchMetrics(); }, [fetchMetrics]);

  return { data, loading, error, refetch: fetchMetrics };
}

export function useResourceMetrics(schoolId: string) {
  const [data, setData] = useState<ResourceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/monitor/resources?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch resource metrics');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchMetrics(); }, [fetchMetrics]);

  return { data, loading, error, refetch: fetchMetrics };
}
