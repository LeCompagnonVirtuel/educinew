'use client';
import { useState, useCallback } from 'react';
import { CalendarEvent } from '../types';

export function useUpdateCalendarEvent() {
  const [data, setData] = useState<CalendarEvent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    eventId: string;
    title?: string;
    description?: string;
    type?: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    updatedBy: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const { eventId, ...body } = params;
      const result = await fetch(`/api/communication/calendar/${eventId}`, {
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
