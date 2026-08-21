'use client';
import { useState, useCallback } from 'react';
export function useValidateCompliance() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const validateCompliance = useCallback(async (documentId: string) => {
    setLoading(true); setError(null);
    try {
      const result = await fetch(`/api/documents/compliance/validate/${documentId}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
      return json.data;
    } catch (err) { setError(err instanceof Error ? err.message : 'An error occurred');
    } finally { setLoading(false); }
  }, []);
  return { data, loading, error, validateCompliance };
}
