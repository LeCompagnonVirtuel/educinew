'use client';
import { useState, useCallback } from 'react';
import { Message, MessageType, MessagePriority } from '../types';

export function useSendMessage() {
  const [data, setData] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    conversationId: string;
    senderId: string;
    content: string;
    type?: MessageType;
    priority?: MessagePriority;
    attachments?: string[];
    replyToId?: string;
    threadId?: string;
    mentions?: string[];
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch('/api/communication/messages', {
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
