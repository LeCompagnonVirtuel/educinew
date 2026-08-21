'use client';
import { useState, useCallback } from 'react';
import { CallParticipant } from '../types';

export function useToggleVideo() {
  const [data, setData] = useState<CallParticipant | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    callId: string;
    userId: string;
    videoEnabled: boolean;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/calls/${params.callId}/video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: params.userId, videoEnabled: params.videoEnabled }),
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
