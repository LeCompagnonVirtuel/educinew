'use client';

import { useState, useEffect, useCallback } from 'react';
import type { SchemaMapping } from '@educi/types';

export function useGei2pSchemaMappingList(schoolId: string) {
  const [data, setData] = useState<SchemaMapping[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/gei2p/ai/schema-mappings?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch schema mappings');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export function useGei2pSchemaMappingActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (payload: Omit<SchemaMapping, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/gei2p/ai/schema-mappings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, schoolId }),
      });
      if (!res.ok) throw new Error('Failed to create schema mapping');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, payload: Partial<SchemaMapping>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/gei2p/ai/schema-mappings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, schoolId }),
      });
      if (!res.ok) throw new Error('Failed to update schema mapping');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/gei2p/ai/schema-mappings/${id}?schoolId=${schoolId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete schema mapping');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { create, update, remove, loading, error };
}