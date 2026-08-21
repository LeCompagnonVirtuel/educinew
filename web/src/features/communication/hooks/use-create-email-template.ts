'use client';
import { useState, useCallback } from 'react';
import { EmailTemplate } from '../types';

export function useCreateEmailTemplate() {
  const [data, setData] = useState<EmailTemplate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    schoolId: string;
    name: string;
    subject: string;
    body: string;
    createdBy: string;
    variables?: string[];
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch('/api/communication/emails/templates', {
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
