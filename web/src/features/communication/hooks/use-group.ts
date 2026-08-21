'use client';
import { useState, useCallback, useEffect } from 'react';
import { Group } from '../types';

export function useGroup(groupId?: string) {
  const [data, setData] = useState<Group | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!groupId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/groups/${groupId}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
