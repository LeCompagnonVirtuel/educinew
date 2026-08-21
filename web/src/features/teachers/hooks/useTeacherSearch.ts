import { useState, useEffect, useCallback } from 'react';
import type { Teacher } from '../types';

export function useTeacherSearch(initialQuery = '') {
  const [results, setResults] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState(initialQuery);

  const search = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/teachers/search?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Erreur lors de la recherche');
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query) search(query);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query, search]);

  return { results, loading, error, query, setQuery };
}
