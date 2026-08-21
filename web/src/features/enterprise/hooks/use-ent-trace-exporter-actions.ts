'use client';

import { useState, useCallback } from 'react';
import { EntTraceExporterService } from '../services/trace-exporter.service';
import { createClient } from '@/lib/supabase/client';
import type { TraceExporter, TraceExporterCreate } from '@educi/types';

export const useEntTraceExporterActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TraceExporterCreate): Promise<TraceExporter | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceExporterService(supabase);
      return await service.createTraceExporter(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TraceExporterCreate>): Promise<TraceExporter | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceExporterService(supabase);
      return await service.updateTraceExporter(schoolId, id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceExporterService(supabase);
      await service.deleteTraceExporter(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};
