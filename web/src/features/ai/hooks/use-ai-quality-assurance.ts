'use client';

import { useState, useCallback } from 'react';
import type { QualityCheck, GrammarCheck, StyleCheck, FactualityCheck, BiasCheck, PlagiarismCheck } from '@educi/types';

export function useQualityCheck() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<QualityCheck | null>(null);

  const checkQuality = useCallback(async (content: string, contentType: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/quality-assurance/quality-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, contentType }),
      });
      if (!res.ok) throw new Error('Failed to check quality');
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

  return { checkQuality, data, loading, error };
}

export function useGrammarCheck() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<GrammarCheck | null>(null);

  const checkGrammar = useCallback(async (content: string, language: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/quality-assurance/grammar-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, language }),
      });
      if (!res.ok) throw new Error('Failed to check grammar');
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

  return { checkGrammar, data, loading, error };
}

export function useStyleCheck() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<StyleCheck | null>(null);

  const checkStyle = useCallback(async (content: string, styleGuide: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/quality-assurance/style-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, styleGuide }),
      });
      if (!res.ok) throw new Error('Failed to check style');
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

  return { checkStyle, data, loading, error };
}

export function useFactualityCheck() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FactualityCheck | null>(null);

  const checkFactuality = useCallback(async (content: string, sourceIds: string[]) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/quality-assurance/factuality-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, sourceIds }),
      });
      if (!res.ok) throw new Error('Failed to check factuality');
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

  return { checkFactuality, data, loading, error };
}

export function useBiasCheck() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BiasCheck | null>(null);

  const checkBias = useCallback(async (content: string, context: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/quality-assurance/bias-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, context }),
      });
      if (!res.ok) throw new Error('Failed to check bias');
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

  return { checkBias, data, loading, error };
}

export function usePlagiarismCheck() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PlagiarismCheck | null>(null);

  const checkPlagiarism = useCallback(async (content: string, schoolId: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/quality-assurance/plagiarism-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, schoolId }),
      });
      if (!res.ok) throw new Error('Failed to check plagiarism');
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

  return { checkPlagiarism, data, loading, error };
}
