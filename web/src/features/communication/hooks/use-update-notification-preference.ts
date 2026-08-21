'use client';
import { useState, useCallback } from 'react';
import { NotificationPreference } from '../types';

export function useUpdateNotificationPreference() {
  const [data, setData] = useState<NotificationPreference | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    userId: string;
    emailEnabled?: boolean;
    smsEnabled?: boolean;
    pushEnabled?: boolean;
    inAppEnabled?: boolean;
    eventTypes?: string[];
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch('/api/communication/notifications/preferences', {
        method: 'PATCH',
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
