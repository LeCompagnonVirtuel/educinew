'use client';
import { useState, useCallback } from 'react';
import { AISummary, AISummaryType } from '../types';

export function useGenerateSummary() {
  const [data, setData] = useState<AISummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    conversationId: string;
    type: AISummaryType;
    userId: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch('/api/communication/ai/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
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
