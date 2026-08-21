'use client';
import { useState, useCallback } from 'react';
import { Announcement, AnnouncementType, AnnouncementPriority } from '../types';

export function useCreateAnnouncement() {
  const [data, setData] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    schoolId: string;
    title: string;
    content: string;
    type: AnnouncementType;
    priority: AnnouncementPriority;
    createdBy: string;
    targetAudience?: string[];
    attachments?: string[];
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch('/api/communication/announcements', {
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
