'use client';
import { useState, useCallback } from 'react';
import { CallParticipant } from '../types';

export function useToggleScreenShare() {
  const [data, setData] = useState<CallParticipant | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    callId: string;
    userId: string;
    screenSharing: boolean;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/calls/${params.callId}/screen-share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: params.userId, screenSharing: params.screenSharing }),
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
