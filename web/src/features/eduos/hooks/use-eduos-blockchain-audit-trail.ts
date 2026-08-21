'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSBlockchainAuditTrailService } from '../services/eduos-blockchain-audit-trail.service';
import { createClient } from '@/lib/supabase/client';
import type { BlockchainAuditTrail } from '@educi/types';

export const useEduOSBlockchainAuditTrailList = (schoolId: string) => {
  const [items, setItems] = useState<BlockchainAuditTrail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBlockchainAuditTrailService(supabase);
      const data = await service.listBlockchainAuditTrails(schoolId);
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
