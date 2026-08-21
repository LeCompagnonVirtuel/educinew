'use client';
import { useState, useCallback } from 'react';
import { AutoResponse } from '../types';

export function useUpdateAutoResponse() {
  const [data, setData] = useState<AutoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    autoResponseId: string;
    name?: string;
    trigger?: string;
    response?: string;
    isActive?: boolean;
    updatedBy: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const { autoResponseId, ...body } = params;
      const result = await fetch(`/api/communication/auto-responses/${autoResponseId}`, {
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
