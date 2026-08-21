'use client';
import { useState, useCallback } from 'react';
export function useBulkMoveDocuments() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bulkMoveDocuments = useCallback(async (ids: string[], targetFolderId: string) => {
    setLoading(true); setError(null);
    try {
      const result = await fetch('/api/documents/bulk-move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids, targetFolderId })
      });
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
      return json.data;
    } catch (err) { setError(err instanceof Error ? err.message : 'An error occurred');
    } finally { setLoading(false); }
  }, []);
  return { data, loading, error, bulkMoveDocuments };
}