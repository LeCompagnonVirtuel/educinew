'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AiMessage } from '@educi/types';

export function useAiMessages(sessionId: string) {
  const [data, setData] = useState<AiMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/messages?sessionId=${sessionId}`);
      if (!res.ok) throw new Error('Failed to fetch messages');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  return { data, loading, error, refetch: fetchMessages };
}

export function useAiMessage(messageId: string) {
  const [data, setData] = useState<AiMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessage = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/messages/${messageId}`);
      if (!res.ok) throw new Error('Failed to fetch message');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [messageId]);

  useEffect(() => { fetchMessage(); }, [fetchMessage]);

  return { data, loading, error, refetch: fetchMessage };
}

export function useCreateMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMessage = useCallback(async (payload: Omit<AiMessage, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create message');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createMessage, loading, error };
}

export function useUpdateMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateMessage = useCallback(async (messageId: string, payload: Partial<AiMessage>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/messages/${messageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to update message');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateMessage, loading, error };
}

export function useDeleteMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteMessage = useCallback(async (messageId: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/messages/${messageId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete message');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteMessage, loading, error };
}

export function useStreamMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamedContent, setStreamedContent] = useState('');

  const streamMessage = useCallback(async (sessionId: string, payload: { content: string; role: string }) => {
    try {
      setLoading(true);
      setError(null);
      setStreamedContent('');
      const res = await fetch(`/api/ai/messages/stream?sessionId=${sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to stream message');
      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response body');
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setStreamedContent((prev) => prev + chunk);
      }
      return streamedContent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [streamedContent]);

  return { streamMessage, loading, error, streamedContent };
}
