'use client';

import { useState, useCallback } from 'react';
import { EduOSBlockchainAuditTrailService } from '../services/eduos-blockchain-audit-trail.service';
import { createClient } from '@/lib/supabase/client';
import type { BlockchainAuditTrail } from '@educi/types';

export const useEduOSBlockchainAuditTrailActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<BlockchainAuditTrail>): Promise<BlockchainAuditTrail | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBlockchainAuditTrailService(supabase);
      return await service.createBlockchainAuditTrail(schoolId, data as BlockchainAuditTrail);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<BlockchainAuditTrail>): Promise<BlockchainAuditTrail | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBlockchainAuditTrailService(supabase);
      return await service.updateBlockchainAuditTrail(schoolId, id, data);
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
      const service = new EduOSBlockchainAuditTrailService(supabase);
      await service.deleteBlockchainAuditTrail(schoolId, id);
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
