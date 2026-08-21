'use client';

import { useState, useCallback } from 'react';
import { EduOSETLTransformationService } from '../services/eduos-etl-transformation.service';
import { createClient } from '@/lib/supabase/client';
import type { ETLTransformation } from '@educi/types';

export const useEduOSETLTransformationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ETLTransformation): Promise<ETLTransformation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSETLTransformationService(supabase);
      return await service.createETLTransformation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ETLTransformation>): Promise<ETLTransformation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSETLTransformationService(supabase);
      return await service.updateETLTransformation(schoolId, id, data);
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
      const service = new EduOSETLTransformationService(supabase);
      await service.deleteETLTransformation(schoolId, id);
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