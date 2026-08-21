'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Insight, Trend, Anomaly, Correlation, InsightPrediction, InsightRecommendation } from '@educi/types';

export function useInsights(schoolId: string) {
  const [data, setData] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/insights?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch insights');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchInsights(); }, [fetchInsights]);

  return { data, loading, error, refetch: fetchInsights };
}

export function useTrends(schoolId: string) {
  const [data, setData] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrends = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/insights/trends?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch trends');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchTrends(); }, [fetchTrends]);

  return { data, loading, error, refetch: fetchTrends };
}

export function useAnomalies(schoolId: string) {
  const [data, setData] = useState<Anomaly[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnomalies = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/insights/anomalies?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch anomalies');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchAnomalies(); }, [fetchAnomalies]);

  return { data, loading, error, refetch: fetchAnomalies };
}

export function useCorrelations(schoolId: string) {
  const [data, setData] = useState<Correlation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCorrelations = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/insights/correlations?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch correlations');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchCorrelations(); }, [fetchCorrelations]);

  return { data, loading, error, refetch: fetchCorrelations };
}

export function useInsightPredictions(schoolId: string) {
  const [data, setData] = useState<InsightPrediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPredictions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/insights/predictions?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch insight predictions');
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

export function useInsightRecommendations(schoolId: string) {
  const [data, setData] = useState<InsightRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/insights/recommendations?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch insight recommendations');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchRecommendations(); }, [fetchRecommendations]);

  return { data, loading, error, refetch: fetchRecommendations };
}
