'use client';

import { useState, useCallback } from 'react';
import type { ContentFilter, PiiDetection, JailbreakDetection, PromptInjection, BiasDetection, SafetyClassification, IncidentReport, AgeVerification } from '@educi/types';

export function useContentFilter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ContentFilter | null>(null);

  const filterContent = useCallback(async (content: string, context: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/safety/content-filter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, context }),
      });
      if (!res.ok) throw new Error('Failed to filter content');
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

  return { filterContent, data, loading, error };
}

export function usePiiDetection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PiiDetection | null>(null);

  const detectPii = useCallback(async (content: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/safety/pii-detection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error('Failed to detect PII');
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

  return { detectPii, data, loading, error };
}

export function useJailbreakDetection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<JailbreakDetection | null>(null);

  const detectJailbreak = useCallback(async (prompt: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/safety/jailbreak-detection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error('Failed to detect jailbreak');
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

  return { detectJailbreak, data, loading, error };
}

export function usePromptInjection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PromptInjection | null>(null);

  const detectInjection = useCallback(async (prompt: string, systemPrompt: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/safety/prompt-injection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, systemPrompt }),
      });
      if (!res.ok) throw new Error('Failed to detect prompt injection');
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

  return { detectInjection, data, loading, error };
}

export function useBiasDetection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BiasDetection | null>(null);

  const detectBias = useCallback(async (content: string, demographicAttributes?: string[]) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/safety/bias-detection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, demographicAttributes }),
      });
      if (!res.ok) throw new Error('Failed to detect bias');
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

  return { detectBias, data, loading, error };
}

export function useSafetyClassification() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SafetyClassification | null>(null);

  const classify = useCallback(async (content: string, category: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/safety/classification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, category }),
      });
      if (!res.ok) throw new Error('Failed to classify content');
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

  return { classify, data, loading, error };
}

export function useIncidentReport(schoolId: string) {
  const [data, setData] = useState<IncidentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIncidents = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/safety/incidents?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch incident reports');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { data, loading, error, refetch: fetchIncidents };
}

export function useAgeVerification() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AgeVerification | null>(null);

  const verifyAge = useCallback(async (dateOfBirth: string, requiredAge: number) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/safety/age-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateOfBirth, requiredAge }),
      });
      if (!res.ok) throw new Error('Failed to verify age');
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

  return { verifyAge, data, loading, error };
}
