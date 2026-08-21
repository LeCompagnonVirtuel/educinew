'use client';

import { useState, useCallback } from 'react';
import type { Student } from '../types';
import { createStudentRepository } from '../repositories';
import { SearchService } from '../services';

function createSearchService() {
  const repo = createStudentRepository();
  return new SearchService(repo);
}

export function useStudentSearch() {
  const [results, setResults] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createSearchService())[0];

  const search = useCallback(async (schoolId: string, query: string, limit?: number) => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await serviceRef.search(schoolId, query, limit);
      setResults(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur recherche';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const clearResults = useCallback(() => {
    setResults([]);
  }, []);

  return { results, loading, error, search, clearResults };
}
