'use client';
import { useState, useCallback } from 'react';
import { Poll } from '../types';

export function useCreatePoll() {
  const [data, setData] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    conversationId: string;
    question: string;
    options: string[];
    createdBy: string;
    allowMultiple?: boolean;
    expiresAt?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch('/api/communication/polls', {
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
