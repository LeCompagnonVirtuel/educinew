'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ScalingConfig, PredictiveScaling, ScheduledScaling, MetricScaling } from '@educi/types';

export function useScalingConfig(schoolId: string) {
  const [data, setData] = useState<ScalingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/scaling/config?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch scaling config');
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

export function usePredictiveScaling(schoolId: string) {
  const [data, setData] = useState<PredictiveScaling[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPredictions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/scaling/predictive?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch predictive scaling');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchPredictions(); }, [fetchPredictions]);

  return { data, loading, error, refetch: fetchPredictions };
}

export function useScheduledScaling(schoolId: string) {
  const [data, setData] = useState<ScheduledScaling[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedule = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/scaling/scheduled?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch scheduled scaling');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchSchedule(); }, [fetchSchedule]);

  return { data, loading, error, refetch: fetchSchedule };
}

export function useMetricScaling(schoolId: string) {
  const [data, setData] = useState<MetricScaling[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/scaling/metrics?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch metric scaling');
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
