'use client';

import { useState, useCallback } from 'react';
import { EduOSBPMNEngineService } from '../services/eduos-bpmn-engine.service';
import { createClient } from '@/lib/supabase/client';
import type { BPMNEngine } from '@educi/types';

export const useEduOSBPMNEngineActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<BPMNEngine>): Promise<BPMNEngine | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBPMNEngineService(supabase);
      return await service.createBPMNEngine(schoolId, data as BPMNEngine);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<BPMNEngine>): Promise<BPMNEngine | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBPMNEngineService(supabase);
      return await service.updateBPMNEngine(schoolId, id, data);
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
      const service = new EduOSBPMNEngineService(supabase);
      await service.deleteBPMNEngine(schoolId, id);
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
