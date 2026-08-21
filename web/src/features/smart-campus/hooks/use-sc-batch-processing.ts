'use client';
import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface BatchJob {
  id: string;
  type: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  total: number;
  result: Record<string, unknown> | null;
}

interface BatchConfig {
  type: string;
  items: Record<string, unknown>[];
}

export const useScBatchProcessing = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const process = useCallback(async (config: BatchConfig): Promise<BatchJob | null> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: insertError } = await supabase
        .from('sc_batch_jobs')
        .insert({
          school_id: schoolId,
          type: config.type,
          status: 'pending',
          progress: 0,
          total: config.items.length,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      const job = data as BatchJob;
      for (let i = 0; i < config.items.length; i++) {
        await supabase
          .from('sc_batch_jobs')
          .update({ progress: i + 1, status: i + 1 === config.items.length ? 'completed' : 'processing' })
          .eq('id', job.id);
      }

      return { ...job, status: 'completed', progress: config.items.length };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getProgress = useCallback(async (jobId: string): Promise<BatchJob | null> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('sc_batch_jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (queryError) throw queryError;
      return data as BatchJob;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getResults = useCallback(async (jobId: string): Promise<Record<string, unknown> | null> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('sc_batch_jobs')
        .select('result')
        .eq('id', jobId)
        .single();

      if (queryError) throw queryError;
      return (data as { result: Record<string, unknown> }).result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, process, getProgress, getResults };
};
