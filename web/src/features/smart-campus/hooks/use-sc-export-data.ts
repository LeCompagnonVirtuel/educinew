'use client';
import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface ExportConfig {
  table: string;
  filters?: Record<string, unknown>;
  columns?: string[];
}

interface ExportResult {
  url: string;
  filename: string;
  format: string;
}

export const useScExportData = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportCSV = useCallback(async (config: ExportConfig): Promise<ExportResult | null> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from(config.table)
        .select(config.columns?.join(',') ?? '*')
        .eq('school_id', schoolId);

      if (queryError) throw queryError;

      const headers = config.columns ?? Object.keys((data as Record<string, unknown>[])[0] ?? {});
      const csvRows = [
        headers.join(','),
        ...((data as Record<string, unknown>[]).map((row) =>
          headers.map((h) => String(row[h] ?? '')).join(',')
        )),
      ];
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);

      return { url, filename: `${config.table}_export.csv`, format: 'csv' };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const exportPDF = useCallback(async (config: ExportConfig): Promise<ExportResult | null> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from(config.table)
        .select(config.columns?.join(',') ?? '*')
        .eq('school_id', schoolId);

      if (queryError) throw queryError;

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      return { url, filename: `${config.table}_export.pdf`, format: 'pdf' };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const exportExcel = useCallback(async (config: ExportConfig): Promise<ExportResult | null> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from(config.table)
        .select(config.columns?.join(',') ?? '*')
        .eq('school_id', schoolId);

      if (queryError) throw queryError;

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      return { url, filename: `${config.table}_export.xlsx`, format: 'excel' };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, exportCSV, exportPDF, exportExcel };
};
