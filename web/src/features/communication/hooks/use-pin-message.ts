'use client';
import { useState, useCallback } from 'react';
import { Message } from '../types';

export function usePinMessage() {
  const [data, setData] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    messageId: string;
    pinned: boolean;
    userId: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/messages/${params.messageId}/pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pinned: params.pinned, userId: params.userId }),
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
