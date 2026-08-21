'use client';
import { useState, useCallback } from 'react';
import { Announcement } from '../types';

export function useUpdateAnnouncement() {
  const [data, setData] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    announcementId: string;
    title?: string;
    content?: string;
    type?: string;
    priority?: string;
    updatedBy: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const { announcementId, ...body } = params;
      const result = await fetch(`/api/communication/announcements/${announcementId}`, {
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
