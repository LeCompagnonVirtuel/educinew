'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSLegalDocumentService } from '../services/eduos-legal-document.service';
import { createClient } from '@/lib/supabase/client';
import type { LegalDocument } from '@educi/types';

export const useEduOSLegalDocumentList = (schoolId: string) => {
  const [items, setItems] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSLegalDocumentService(supabase);
      const data = await service.listLegalDocuments(schoolId);
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
