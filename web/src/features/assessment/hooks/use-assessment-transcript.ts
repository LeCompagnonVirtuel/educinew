'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentTranscriptService } from '../services/assessment-transcript.service';
import { createClient } from '@/lib/supabase/client';
import type { Transcript } from '@educi/types';

export const useAssessmentTranscriptList = (schoolId: string) => {
  const [items, setItems] = useState<Transcript[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentTranscriptService(supabase);
      const data = await service.listTranscripts(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};