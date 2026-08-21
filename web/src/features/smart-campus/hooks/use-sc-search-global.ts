'use client';
import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface SearchResult {
  id: string;
  table: string;
  title: string;
  description: string;
  relevance: number;
}

interface SearchFilter {
  table?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const useScSearchGlobal = (schoolId: string) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string, filters?: SearchFilter): Promise<SearchResult[]> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      let queryBuilder = supabase
        .from('sc_global_search')
        .select('*')
        .eq('school_id', schoolId)
        .ilike('title', `%${query}%`);

      if (filters?.table) {
        queryBuilder = queryBuilder.eq('table', filters.table);
      }

      const { data, error: queryError } = await queryBuilder;
      if (queryError) throw queryError;
      const items = (data ?? []) as SearchResult[];
      setResults(items);
      return items;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getResults = useCallback(async (searchId: string): Promise<SearchResult | null> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('sc_global_search')
        .select('*')
        .eq('id', searchId)
        .single();

      if (queryError) throw queryError;
      return data as SearchResult;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getFilters = useCallback(async (): Promise<string[]> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('sc_global_search')
        .select('table')
        .eq('school_id', schoolId);

      if (queryError) throw queryError;
      const tables = [...new Set((data ?? []).map((d) => (d as { table: string }).table))];
      return tables;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { results, loading, error, search, getResults, getFilters };
};
