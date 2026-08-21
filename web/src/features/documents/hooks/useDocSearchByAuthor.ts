'use client';
import { useState, useCallback } from 'react';
export function useDocSearchByAuthor() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchByAuthor = useCallback(async (authorId: string) => {
    setLoading(true); setError(null);
    try {
      const result = await fetch('/api/documents/search/author', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorId })
      });
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
      return json.data;
    } catch (err) { setError(err instanceof Error ? err.message : 'An error occurred');
    } finally { setLoading(false); }
  }, []);
  return { data, loading, error, searchByAuthor };
}
