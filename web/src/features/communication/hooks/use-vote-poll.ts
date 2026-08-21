'use client';
import { useState, useCallback } from 'react';
import { PollVote } from '../types';

export function useVotePoll() {
  const [data, setData] = useState<PollVote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    pollId: string;
    userId: string;
    optionIds: string[];
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/polls/${params.pollId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: params.userId, optionIds: params.optionIds }),
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
