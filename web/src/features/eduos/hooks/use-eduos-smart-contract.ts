'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSSmartContractService } from '../services/eduos-smart-contract.service';
import { createClient } from '@/lib/supabase/client';
import type { SmartContract } from '@educi/types';

export const useEduOSSmartContractList = (schoolId: string) => {
  const [items, setItems] = useState<SmartContract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSmartContractService(supabase);
      const data = await service.listSmartContracts(schoolId);
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
