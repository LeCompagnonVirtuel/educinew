import { useState } from 'react';

export function useExamSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);

  const search = async (schoolId: string, query: string, filters?: Record<string, string>) => {
    setLoading(true); setError(null);
    try {
      const params = new URLSearchParams({ schoolId, query });
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          params.append(key, value);
        });
      }
      const response = await fetch(`/api/exams/search?${params.toString()}`);
      if (!response.ok) throw new Error('Erreur');
      const result = await response.json();
      setResults(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { search, loading, error, results };
}
