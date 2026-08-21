'use client';

import { useState, useEffect, useCallback } from 'react';
import type { DataRetention } from '@educi/types';

export function useGei2pDataRetentionList(schoolId: string) {
  const [data, setData] = useState<DataRetention[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/gei2p/governance/data-retentions?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch data retentions');
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

export function useGei2pDataRetentionActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (payload: Omit<DataRetention, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/gei2p/governance/data-retentions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, schoolId }),
      });
      if (!res.ok) throw new Error('Failed to create data retention');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, payload: Partial<DataRetention>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/gei2p/governance/data-retentions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, schoolId }),
      });
      if (!res.ok) throw new Error('Failed to update data retention');
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
      const res = await fetch(`/api/gei2p/governance/data-retentions/${id}?schoolId=${schoolId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete data retention');
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