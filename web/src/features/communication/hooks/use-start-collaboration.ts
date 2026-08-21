'use client';
import { useState, useCallback } from 'react';
import { CollaborationSession, CollaborationMode } from '../types';

export function useStartCollaboration() {
  const [data, setData] = useState<CollaborationSession | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    documentId: string;
    userId: string;
    mode: CollaborationMode;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch('/api/communication/collaboration/start', {
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
