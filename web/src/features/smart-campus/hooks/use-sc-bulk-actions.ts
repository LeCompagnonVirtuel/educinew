'use client';
import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface BulkResult {
  success: number;
  failed: number;
  errors: string[];
}

export const useScBulkActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bulkUpdate = useCallback(async (table: string, ids: string[], data: Record<string, unknown>): Promise<BulkResult> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      let success = 0;
      let failed = 0;
      const errors: string[] = [];

      for (const id of ids) {
        const { error: updateError } = await supabase
          .from(table)
          .update(data)
          .eq('id', id)
          .eq('school_id', schoolId);

        if (updateError) {
          failed++;
          errors.push(`Failed to update ${id}: ${updateError.message}`);
        } else {
          success++;
        }
      }

      return { success, failed, errors };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return { success: 0, failed: ids.length, errors: [message] };
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const bulkDelete = useCallback(async (table: string, ids: string[]): Promise<BulkResult> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      let success = 0;
      let failed = 0;
      const errors: string[] = [];

      for (const id of ids) {
        const { error: deleteError } = await supabase
          .from(table)
          .delete()
          .eq('id', id)
          .eq('school_id', schoolId);

        if (deleteError) {
          failed++;
          errors.push(`Failed to delete ${id}: ${deleteError.message}`);
        } else {
          success++;
        }
      }

      return { success, failed, errors };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return { success: 0, failed: ids.length, errors: [message] };
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const bulkArchive = useCallback(async (table: string, ids: string[]): Promise<BulkResult> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      let success = 0;
      let failed = 0;
      const errors: string[] = [];

      for (const id of ids) {
        const { error: updateError } = await supabase
          .from(table)
          .update({ archived: true, archived_at: new Date().toISOString() })
          .eq('id', id)
          .eq('school_id', schoolId);

        if (updateError) {
          failed++;
          errors.push(`Failed to archive ${id}: ${updateError.message}`);
        } else {
          success++;
        }
      }

      return { success, failed, errors };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return { success: 0, failed: ids.length, errors: [message] };
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, bulkUpdate, bulkDelete, bulkArchive };
};
