import { useState, useCallback } from 'react';

export default function useExportFinance() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (payload?: { schoolId?: string; format?: string; [key: string]: unknown } = {}) => {
    if (!payload?.schoolId) return;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (payload.format) params.append('format', payload.format);
      Object.entries(payload).forEach(([key, value]) => {
        if (key !== 'schoolId' && key !== 'format' && value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
      const queryString = params.toString();
      const url = `/api/finance/schools/${payload.schoolId}/export${queryString ? `?${queryString}` : ''}`;
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, mutate };
}
