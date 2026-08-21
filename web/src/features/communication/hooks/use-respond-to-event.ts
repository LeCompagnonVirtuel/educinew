'use client';
import { useState, useCallback } from 'react';
import { CalendarAttendee } from '../types';

export function useRespondToEvent() {
  const [data, setData] = useState<CalendarAttendee | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    eventId: string;
    userId: string;
    response: 'accepted' | 'declined' | 'tentative';
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/calendar/${params.eventId}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: params.userId, response: params.response }),
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
