'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PredictionRequest, PredictionConfig, Backtest, Ensemble, DriftDetection, PredictionMonitoring } from '@educi/types';

export function usePredictionRequest(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PredictionRequest | null>(null);

  const requestPrediction = useCallback(async (payload: { modelId: string; input: Record<string, unknown> }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/predictions/request?schoolId=${schoolId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to request prediction');
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

  return { requestPrediction, data, loading, error };
}

export function usePredictionConfig(schoolId: string) {
  const [data, setData] = useState<PredictionConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfigs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/predictions/config?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch prediction configs');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchConfigs(); }, [fetchConfigs]);

  return { data, loading, error, refetch: fetchConfigs };
}

export function useBacktest(modelId: string) {
  const [data, setData] = useState<Backtest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBacktest = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/predictions/backtest?modelId=${modelId}`);
      if (!res.ok) throw new Error('Failed to fetch backtest');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [modelId]);

  useEffect(() => { fetchBacktest(); }, [fetchBacktest]);

  return { data, loading, error, refetch: fetchBacktest };
}

export function useEnsemble(schoolId: string) {
  const [data, setData] = useState<Ensemble[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnsembles = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/predictions/ensemble?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch ensembles');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchEnsembles(); }, [fetchEnsembles]);

  return { data, loading, error, refetch: fetchEnsembles };
}

export function useDriftDetection(modelId: string) {
  const [data, setData] = useState<DriftDetection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDrift = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/predictions/drift?modelId=${modelId}`);
      if (!res.ok) throw new Error('Failed to fetch drift detection');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [modelId]);

  useEffect(() => { fetchDrift(); }, [fetchDrift]);

  return { data, loading, error, refetch: fetchDrift };
}

export function usePredictionMonitoring(schoolId: string) {
  const [data, setData] = useState<PredictionMonitoring[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMonitoring = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/predictions/monitoring?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch prediction monitoring');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchMonitoring(); }, [fetchMonitoring]);

  return { data, loading, error, refetch: fetchMonitoring };
}
