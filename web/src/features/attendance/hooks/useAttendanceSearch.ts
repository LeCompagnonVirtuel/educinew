import { useState, useEffect } from 'react';

export function useAttendanceSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);

  const search = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/attendance/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Erreur');
      const result = await response.json();
      setResults(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return { search, loading, error, results };
}
