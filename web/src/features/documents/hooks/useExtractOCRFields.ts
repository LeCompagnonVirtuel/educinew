'use client';
import { useState, useCallback } from 'react';
export function useExtractOCRFields() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const extractOCRFields = useCallback(async (jobId: string, fieldNames: string[]) => {
    setLoading(true); setError(null);
    try {
      const result = await fetch(`/api/documents/ocr/${jobId}/extract`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: fieldNames })
      });
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
      return json.data;
    } catch (err) { setError(err instanceof Error ? err.message : 'An error occurred');
    } finally { setLoading(false); }
  }, []);
  return { data, loading, error, extractOCRFields };
}
