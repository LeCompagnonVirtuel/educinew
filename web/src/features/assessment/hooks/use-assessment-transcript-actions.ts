'use client';

import { useState, useCallback } from 'react';
import { AssessmentTranscriptService } from '../services/assessment-transcript.service';
import { createClient } from '@/lib/supabase/client';
import type { Transcript, TranscriptCreate } from '@educi/types';

export const useAssessmentTranscriptActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TranscriptCreate): Promise<Transcript | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentTranscriptService(supabase);
      return await service.createTranscript(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TranscriptCreate>): Promise<Transcript | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentTranscriptService(supabase);
      return await service.updateTranscript(schoolId, id, data);
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
      const service = new AssessmentTranscriptService(supabase);
      await service.deleteTranscript(schoolId, id);
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