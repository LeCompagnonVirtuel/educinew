'use client';
import { useState, useCallback } from 'react';
import { Conversation } from '../types';

export function useUpdateConversation() {
  const [data, setData] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    conversationId: string;
    name?: string;
    description?: string;
    avatar?: string;
    updatedBy: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const { conversationId, ...body } = params;
      const result = await fetch(`/api/communication/conversations/${conversationId}`, {
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
