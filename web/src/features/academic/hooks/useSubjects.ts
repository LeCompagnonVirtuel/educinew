import { useState, useEffect } from 'react';
import type { Subject, AcademicFilters } from '../types';

export function useSubjects(schoolId: string, filters?: AcademicFilters) {
  const [data, setData] = useState<Subject[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set('schoolId', schoolId);
        if (filters) {
          if (filters.search) params.set('search', filters.search);
          if (filters.status && filters.status !== 'ALL') params.set('status', filters.status);
          if (filters.page) params.set('page', filters.page.toString());
          if (filters.limit) params.set('limit', filters.limit.toString());
          if (filters.sortBy) params.set('sortBy', filters.sortBy);
          if (filters.sortOrder) params.set('sortOrder', filters.sortOrder);
        }
        const response = await fetch(`/api/academic/subjects?${params.toString()}`);
        if (!response.ok) throw new Error('Erreur lors du chargement');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [schoolId, filters]);

  return { data, loading, error };
}
