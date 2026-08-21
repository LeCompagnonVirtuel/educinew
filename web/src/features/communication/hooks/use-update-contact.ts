'use client';
import { useState, useCallback } from 'react';
import { Contact } from '../types';

export function useUpdateContact() {
  const [data, setData] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (params: {
    contactId: string;
    name?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    notes?: string;
    updatedBy: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const { contactId, ...body } = params;
      const result = await fetch(`/api/communication/contacts/${contactId}`, {
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
