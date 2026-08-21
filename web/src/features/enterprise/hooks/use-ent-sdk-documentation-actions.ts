'use client';

import { useState, useCallback } from 'react';
import { EntSDKDocumentationService } from '../services/sdk-documentation.service';
import { createClient } from '@/lib/supabase/client';
import type { SDKDocumentation, SDKDocumentationCreate } from '@educi/types';

export const useEntSDKDocumentationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SDKDocumentationCreate): Promise<SDKDocumentation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSDKDocumentationService(supabase);
      return await service.createSDKDocumentation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SDKDocumentationCreate>): Promise<SDKDocumentation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSDKDocumentationService(supabase);
      return await service.updateSDKDocumentation(schoolId, id, data);
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
      const service = new EntSDKDocumentationService(supabase);
      await service.deleteSDKDocumentation(schoolId, id);
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
