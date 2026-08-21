'use client';

import { useState, useCallback } from 'react';
import { EntScanRuleService } from '../services/scan-rule.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanRule, ScanRuleCreate } from '@educi/types';

export const useEntScanRuleActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScanRuleCreate): Promise<ScanRule | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanRuleService(supabase);
      return await service.createScanRule(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScanRuleCreate>): Promise<ScanRule | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanRuleService(supabase);
      return await service.updateScanRule(schoolId, id, data);
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
      const service = new EntScanRuleService(supabase);
      await service.deleteScanRule(schoolId, id);
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
