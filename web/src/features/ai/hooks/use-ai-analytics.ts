'use client';

import { useState, useEffect, useCallback } from 'react';
import type { UsageAnalytics, PerformanceAnalytics, QualityAnalytics, CostAnalytics, CohortAnalysis, FunnelAnalysis, Heatmap, ABTest } from '@educi/types';

export function useUsageAnalytics(schoolId: string) {
  const [data, setData] = useState<UsageAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/analytics/usage?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch usage analytics');
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

export function usePerformanceAnalytics(schoolId: string) {
  const [data, setData] = useState<PerformanceAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/analytics/performance?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch performance analytics');
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

export function useQualityAnalytics(schoolId: string) {
  const [data, setData] = useState<QualityAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/analytics/quality?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch quality analytics');
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

export function useCostAnalytics(schoolId: string) {
  const [data, setData] = useState<CostAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/analytics/cost?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch cost analytics');
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

export function useCohortAnalysis(schoolId: string) {
  const [data, setData] = useState<CohortAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysis = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/analytics/cohort?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch cohort analysis');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchAnalysis(); }, [fetchAnalysis]);

  return { data, loading, error, refetch: fetchAnalysis };
}

export function useFunnelAnalysis(schoolId: string, funnelId: string) {
  const [data, setData] = useState<FunnelAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysis = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/analytics/funnel?schoolId=${schoolId}&funnelId=${funnelId}`);
      if (!res.ok) throw new Error('Failed to fetch funnel analysis');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId, funnelId]);

  useEffect(() => { fetchAnalysis(); }, [fetchAnalysis]);

  return { data, loading, error, refetch: fetchAnalysis };
}

export function useHeatmap(schoolId: string) {
  const [data, setData] = useState<Heatmap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHeatmap = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/analytics/heatmap?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch heatmap');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchHeatmap(); }, [fetchHeatmap]);

  return { data, loading, error, refetch: fetchHeatmap };
}

export function useABTesting(schoolId: string) {
  const [data, setData] = useState<ABTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTests = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/analytics/ab-testing?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch A/B tests');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchTests(); }, [fetchTests]);

  return { data, loading, error, refetch: fetchTests };
}
