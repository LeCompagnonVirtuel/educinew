'use client';

import { useState, useEffect, useCallback } from 'react';
import type { RecommendationRequest, RecommendationFeedback, KnowledgeGraph, ContextAware, RecommendationDiversity, RecommendationFreshness } from '@educi/types';

export function useRecommendationRequest(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RecommendationRequest | null>(null);

  const requestRecommendation = useCallback(async (payload: { userId: string; type: string; context?: Record<string, unknown> }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/recommendations/request?schoolId=${schoolId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to request recommendation');
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

  return { requestRecommendation, data, loading, error };
}

export function useRecommendationFeedback(recommendationId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitFeedback = useCallback(async (payload: { rating: number; comment?: string; helpful: boolean }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/recommendations/feedback?recommendationId=${recommendationId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to submit feedback');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [recommendationId]);

  return { submitFeedback, loading, error };
}

export function useKnowledgeGraph(schoolId: string) {
  const [data, setData] = useState<KnowledgeGraph | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGraph = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/recommendations/knowledge-graph?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch knowledge graph');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchGraph(); }, [fetchGraph]);

  return { data, loading, error, refetch: fetchGraph };
}

export function useContextAware(schoolId: string) {
  const [data, setData] = useState<ContextAware[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContext = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/recommendations/context-aware?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch context-aware recommendations');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchContext(); }, [fetchContext]);

  return { data, loading, error, refetch: fetchContext };
}

export function useRecommendationDiversity(schoolId: string) {
  const [data, setData] = useState<RecommendationDiversity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDiversity = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/recommendations/diversity?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch recommendation diversity');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchDiversity(); }, [fetchDiversity]);

  return { data, loading, error, refetch: fetchDiversity };
}

export function useRecommendationFreshness(schoolId: string) {
  const [data, setData] = useState<RecommendationFreshness[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFreshness = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/recommendations/freshness?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch recommendation freshness');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchFreshness(); }, [fetchFreshness]);

  return { data, loading, error, refetch: fetchFreshness };
}
