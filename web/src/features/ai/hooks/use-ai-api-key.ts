'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ApiKey, ApiKeyCreate, ApiKeyRotate, ApiKeyRevoke, ApiKeyList } from '@educi/types';

export function useApiKey(keyId: string) {
  const [data, setData] = useState<ApiKey | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKey = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/api-key/${keyId}`);
      if (!res.ok) throw new Error('Failed to fetch API key');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [keyId]);

  useEffect(() => { fetchKey(); }, [fetchKey]);

  return { data, loading, error, refetch: fetchKey };
}

export function useApiKeyCreate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createKey = useCallback(async (payload: ApiKeyCreate) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/api-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create API key');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createKey, loading, error };
}

export function useApiKeyRotate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rotateKey = useCallback(async (keyId: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/api-key/${keyId}/rotate`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to rotate API key');
      const json = await res.json();
      return json.data as ApiKeyRotate;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { rotateKey, loading, error };
}

export function useApiKeyRevoke() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const revokeKey = useCallback(async (keyId: string, reason: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/api-key/${keyId}/revoke`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      if (!res.ok) throw new Error('Failed to revoke API key');
      const json = await res.json();
      return json.data as ApiKeyRevoke;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { revokeKey, loading, error };
}

export function useApiKeyList(schoolId: string) {
  const [data, setData] = useState<ApiKeyList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKeys = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/api-key/list?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch API keys');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchKeys(); }, [fetchKeys]);

  return { data, loading, error, refetch: fetchKeys };
}
