'use client';

import { useState, useCallback } from 'react';
import type { EthicsCheck, BiasMitigation, FairnessCheck, ModelCard, ConsentManagement } from '@educi/types';

export function useEthicsCheck() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<EthicsCheck | null>(null);

  const checkEthics = useCallback(async (content: string, context: string, schoolId: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/ethics/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, context, schoolId }),
      });
      if (!res.ok) throw new Error('Failed to check ethics');
      const json = await res.json();
      setData(json.data);
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { checkEthics, data, loading, error };
}

export function useBiasMitigation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BiasMitigation | null>(null);

  const mitigateBias = useCallback(async (content: string, biasType: string, strategy: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/ethics/bias-mitigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, biasType, strategy }),
      });
      if (!res.ok) throw new Error('Failed to mitigate bias');
      const json = await res.json();
      setData(json.data);
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { mitigateBias, data, loading, error };
}

export function useFairnessCheck() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FairnessCheck | null>(null);

  const checkFairness = useCallback(async (modelId: string, datasetId: string, metrics: string[]) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/ethics/fairness-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelId, datasetId, metrics }),
      });
      if (!res.ok) throw new Error('Failed to check fairness');
      const json = await res.json();
      setData(json.data);
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { checkFairness, data, loading, error };
}

export function useModelCard(modelId: string) {
  const [data, setData] = useState<ModelCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModelCard = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/ethics/model-card?modelId=${modelId}`);
      if (!res.ok) throw new Error('Failed to fetch model card');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [modelId]);

  return { data, loading, error, refetch: fetchModelCard };
}

export function useConsentManagement(userId: string) {
  const [data, setData] = useState<ConsentManagement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConsent = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/ethics/consent?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch consent management');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return { data, loading, error, refetch: fetchConsent };
}
