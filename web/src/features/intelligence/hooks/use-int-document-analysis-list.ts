'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntDocumentAnalysisService } from '../services/int-document-analysis.service';
import { createClient } from '@/lib/supabase/client';
import type { DocumentAnalysis } from '@educi/types';

export const useIntDocumentAnalysisList = (schoolId: string) => {
  const [items, setItems] = useState<DocumentAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntDocumentAnalysisService(supabase);
      const data = await service.listDocumentAnalyses(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};