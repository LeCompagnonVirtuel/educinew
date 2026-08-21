'use client';

import { useState, useEffect, useCallback } from 'react';
import type { LoadBalancer, StickySession, CircuitBreaker, LoadBalancerAnalytics } from '@educi/types';

export function useLoadBalancer(schoolId: string) {
  const [data, setData] = useState<LoadBalancer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLoadBalancer = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/load-balancer?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch load balancer');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchLoadBalancer(); }, [fetchLoadBalancer]);

  return { data, loading, error, refetch: fetchLoadBalancer };
}

export function useStickySession(schoolId: string) {
  const [data, setData] = useState<StickySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/load-balancer/sticky-sessions?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch sticky sessions');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchSessions(); }, [fetchSessions]);

  return { data, loading, error, refetch: fetchSessions };
}

export function useCircuitBreaker(schoolId: string) {
  const [data, setData] = useState<CircuitBreaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBreakers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/load-balancer/circuit-breakers?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch circuit breakers');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchBreakers(); }, [fetchBreakers]);

  return { data, loading, error, refetch: fetchBreakers };
}

export function useLoadBalancerAnalytics(schoolId: string) {
  const [data, setData] = useState<LoadBalancerAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/load-balancer/analytics?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch load balancer analytics');
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
