'use client';
import { useState, useCallback, useEffect } from 'react';
import { CalendarEvent } from '../types';

export function useCalendarEvent(eventId?: string) {
  const [data, setData] = useState<CalendarEvent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!eventId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/calendar/${eventId}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
