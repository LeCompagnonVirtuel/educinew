'use client';
import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface AuditLogEntry {
  id: string;
  userId: string;
  action: string;
  table: string;
  recordId: string;
  changes: Record<string, unknown>;
  createdAt: string;
}

interface AuditFilter {
  table?: string;
  userId?: string;
  action?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const useScAuditLog = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const log = useCallback(async (entry: Omit<AuditLogEntry, 'id' | 'createdAt'>): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { error: insertError } = await supabase
        .from('sc_audit_logs')
        .insert({ ...entry, school_id: schoolId });

      if (insertError) throw insertError;
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getHistory = useCallback(async (recordId: string): Promise<AuditLogEntry[]> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('sc_audit_logs')
        .select('*')
        .eq('school_id', schoolId)
        .eq('record_id', recordId)
        .order('created_at', { ascending: false });

      if (queryError) throw queryError;
      return (data ?? []) as AuditLogEntry[];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getFiltered = useCallback(async (filters: AuditFilter): Promise<AuditLogEntry[]> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      let queryBuilder = supabase
        .from('sc_audit_logs')
        .select('*')
        .eq('school_id', schoolId);

      if (filters.table) queryBuilder = queryBuilder.eq('table_name', filters.table);
      if (filters.userId) queryBuilder = queryBuilder.eq('user_id', filters.userId);
      if (filters.action) queryBuilder = queryBuilder.eq('action', filters.action);

      const { data, error: queryError } = await queryBuilder.order('created_at', { ascending: false });
      if (queryError) throw queryError;
      return (data ?? []) as AuditLogEntry[];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, log, getHistory, getFiltered };
};
