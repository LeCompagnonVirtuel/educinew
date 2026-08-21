'use client';
import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface ImportResult {
  table: string;
  imported: number;
  errors: string[];
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  rows: number;
}

export const useScImportData = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const importCSV = useCallback(async (table: string, csvContent: string): Promise<ImportResult | null> => {
    try {
      setLoading(true);
      setError(null);
      const lines = csvContent.trim().split('\n');
      if (lines.length < 2) return { table, imported: 0, errors: ['No data rows found'] };

      const headers = lines[0].split(',');
      const rows = lines.slice(1).map((line) => {
        const values = line.split(',');
        const row: Record<string, string> = {};
        headers.forEach((h, i) => {
          row[h.trim()] = values[i]?.trim() ?? '';
        });
        return { ...row, school_id: schoolId };
      });

      const supabase = createClient();
      const { error: insertError } = await supabase.from(table).insert(rows);
      if (insertError) throw insertError;

      return { table, imported: rows.length, errors: [] };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return { table, imported: 0, errors: [message] };
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const importExcel = useCallback(async (table: string, jsonData: Record<string, unknown>[]): Promise<ImportResult | null> => {
    try {
      setLoading(true);
      setError(null);
      const rows = jsonData.map((row) => ({ ...row, school_id: schoolId }));

      const supabase = createClient();
      const { error: insertError } = await supabase.from(table).insert(rows);
      if (insertError) throw insertError;

      return { table, imported: rows.length, errors: [] };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return { table, imported: 0, errors: [message] };
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const validate = useCallback(async (table: string, data: Record<string, unknown>[]): Promise<ValidationResult> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data: columns, error: queryError } = await supabase
        .from(table)
        .select('*')
        .limit(1);

      if (queryError) throw queryError;

      const requiredColumns = Object.keys((columns as Record<string, unknown>)[0] ?? {});
      const errors: string[] = [];

      data.forEach((row, index) => {
        requiredColumns.forEach((col) => {
          if (col === 'id' || col === 'created_at' || col === 'school_id') return;
          if (row[col] === undefined || row[col] === null) {
            errors.push(`Row ${index + 1}: Missing column '${col}'`);
          }
        });
      });

      return { valid: errors.length === 0, errors, rows: data.length };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return { valid: false, errors: [message], rows: 0 };
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, importCSV, importExcel, validate };
};
