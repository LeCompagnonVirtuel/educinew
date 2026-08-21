'use client';

import { useState, useCallback } from 'react';
import { EduOSLegalDocumentService } from '../services/eduos-legal-document.service';
import { createClient } from '@/lib/supabase/client';
import type { LegalDocument } from '@educi/types';

export const useEduOSLegalDocumentActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<LegalDocument>): Promise<LegalDocument | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSLegalDocumentService(supabase);
      return await service.createLegalDocument(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LegalDocument>): Promise<LegalDocument | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSLegalDocumentService(supabase);
      return await service.updateLegalDocument(schoolId, id, data);
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
      const service = new EduOSLegalDocumentService(supabase);
      await service.deleteLegalDocument(schoolId, id);
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
