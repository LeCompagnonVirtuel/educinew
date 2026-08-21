'use client';
import { useState, useCallback } from 'react';
import { Group } from '../types';

export function useUpdateGroup() {
  const [data, setData] = useState<Group | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    groupId: string;
    name?: string;
    description?: string;
    avatar?: string;
    updatedBy: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const { groupId, ...body } = params;
      const result = await fetch(`/api/communication/groups/${groupId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, mutate };
}
