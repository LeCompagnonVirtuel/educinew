'use client';
import { useState, useCallback, useEffect } from 'react';
import { Announcement } from '../types';

export function useAnnouncement(announcementId?: string) {
  const [data, setData] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!announcementId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/announcements/${announcementId}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [announcementId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
