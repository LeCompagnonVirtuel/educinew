'use client';
import { useState, useCallback } from 'react';
import { Email } from '../types';

export function useSaveDraft() {
  const [data, setData] = useState<Email | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    schoolId: string;
    userId: string;
    to: string[];
    cc?: string[];
    bcc?: string[];
    subject: string;
    body: string;
    templateId?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch('/api/communication/emails/draft', {
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
