'use client';
import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface ReportConfig {
  type: string;
  filters?: Record<string, unknown>;
  format: 'csv' | 'pdf' | 'excel';
}

interface GeneratedReport {
  id: string;
  url: string;
  createdAt: string;
}

export const useScReportGenerator = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (config: ReportConfig): Promise<GeneratedReport | null> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('sc_reports')
        .insert({ school_id: schoolId, type: config.type, filters: config.filters, format: config.format })
        .select()
        .single();

      if (queryError) throw queryError;
      return data as GeneratedReport;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const download = useCallback(async (reportId: string): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('sc_reports')
        .select('url')
        .eq('id', reportId)
        .single();

      if (queryError) throw queryError;
      return (data as { url: string }).url;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getHistory = useCallback(async (): Promise<GeneratedReport[]> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('sc_reports')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });

      if (queryError) throw queryError;
      return (data ?? []) as GeneratedReport[];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, generate, download, getHistory };
};
