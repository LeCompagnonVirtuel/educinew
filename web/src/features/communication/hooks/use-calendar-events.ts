'use client';
import { useState, useCallback, useEffect } from 'react';
import { CalendarEvent } from '../types';

export function useCalendarEvents(schoolId?: string, userId?: string, startDate?: string, endDate?: string) {
  const [data, setData] = useState<CalendarEvent[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (schoolId) params.append('schoolId', schoolId);
      if (userId) params.append('userId', userId);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const result = await fetch(`/api/communication/calendar${queryString}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [schoolId, userId, startDate, endDate]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
