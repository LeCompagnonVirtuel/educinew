'use client';
import { useState, useCallback } from 'react';
import { PushNotification } from '../types';

export function useSendPushNotification() {
  const [data, setData] = useState<PushNotification | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    schoolId: string;
    title: string;
    body: string;
    targetUserIds?: string[];
    templateId?: string;
    data?: Record<string, unknown>;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch('/api/communication/push/send', {
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
