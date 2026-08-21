'use client';
import { useState, useCallback } from 'react';
import { MessageReaction, ReactionType } from '../types';

export function useReactToMessage() {
  const [data, setData] = useState<MessageReaction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    messageId: string;
    userId: string;
    reactionType: ReactionType;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/messages/${params.messageId}/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: params.userId, reactionType: params.reactionType }),
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
