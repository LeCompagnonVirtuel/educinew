'use client';
import { useState, useCallback, useEffect } from 'react';
import { ScheduledMessage } from '../types';

export function useScheduledMessages(conversationId?: string, senderId?: string) {
  const [data, setData] = useState<ScheduledMessage[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (conversationId) params.append('conversationId', conversationId);
      if (senderId) params.append('senderId', senderId);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const result = await fetch(`/api/communication/messages/scheduled${queryString}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [conversationId, senderId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
