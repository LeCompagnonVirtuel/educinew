import { useState, useEffect, useCallback } from 'react';
import type { Teacher, TeacherFilters, TeacherListResult } from '../types';

export function useTeachers(initialFilters?: TeacherFilters) {
  const [data, setData] = useState<TeacherListResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TeacherFilters>(initialFilters || { page: 1, limit: 20 });

  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.set('search', filters.search);
      if (filters.status && filters.status !== 'ALL') params.set('status', filters.status);
      if (filters.gender && filters.gender !== 'ALL') params.set('gender', filters.gender);
      if (filters.employmentType && filters.employmentType !== 'ALL') params.set('employmentType', filters.employmentType);
      if (filters.contractType && filters.contractType !== 'ALL') params.set('contractType', filters.contractType);
      if (filters.departmentId) params.set('departmentId', filters.departmentId);
      if (filters.page) params.set('page', filters.page.toString());
      if (filters.limit) params.set('limit', filters.limit.toString());
      if (filters.sortBy) params.set('sortBy', filters.sortBy);
      if (filters.sortOrder) params.set('sortOrder', filters.sortOrder);

      const response = await fetch(`/api/teachers?${params.toString()}`);
      if (!response.ok) throw new Error('Erreur lors du chargement');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const updateFilters = useCallback((newFilters: Partial<TeacherFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  return { data, loading, error, filters, updateFilters, refetch: fetchTeachers };
}
