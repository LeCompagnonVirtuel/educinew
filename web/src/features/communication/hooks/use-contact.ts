'use client';
import { useState, useCallback, useEffect } from 'react';
import { Contact } from '../types';

export function useContact(contactId?: string) {
  const [data, setData] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!contactId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/contacts/${contactId}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [contactId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
