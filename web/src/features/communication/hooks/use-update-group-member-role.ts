'use client';
import { useState, useCallback } from 'react';
import { Group } from '../types';

export function useUpdateGroupMemberRole() {
  const [data, setData] = useState<Group | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    groupId: string;
    userId: string;
    role: string;
    updatedBy: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/groups/${params.groupId}/members/${params.userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: params.role, updatedBy: params.updatedBy }),
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
