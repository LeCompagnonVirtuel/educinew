'use client';

import { useState, useEffect, useCallback } from 'react';
import type { HealthCheckEndpoint, ComponentCheck, DeepCheck, ReadinessLiveness } from '@educi/types';

export function useHealthCheckEndpoint(schoolId: string) {
  const [data, setData] = useState<HealthCheckEndpoint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEndpoint = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/health-check/endpoint?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch health check endpoint');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchEndpoint(); }, [fetchEndpoint]);

  return { data, loading, error, refetch: fetchEndpoint };
}

export function useComponentCheck(schoolId: string) {
  const [data, setData] = useState<ComponentCheck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChecks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/health-check/components?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch component checks');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchChecks(); }, [fetchChecks]);

  return { data, loading, error, refetch: fetchChecks };
}

export function useDeepCheck(schoolId: string) {
  const [data, setData] = useState<DeepCheck | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeepCheck = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/health-check/deep?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch deep check');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchDeepCheck(); }, [fetchDeepCheck]);

  return { data, loading, error, refetch: fetchDeepCheck };
}

export function useReadinessLiveness(schoolId: string) {
  const [data, setData] = useState<ReadinessLiveness | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProbe = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/health-check/probes?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch readiness/liveness probe');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchProbe(); }, [fetchProbe]);

  return { data, loading, error, refetch: fetchProbe };
}
