'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScMaintenanceContractService } from '../services/sc-maintenance-contract.service';
import { createClient } from '@/lib/supabase/client';
import type { MaintenanceContract } from '@educi/types';

export const useScMaintenanceContractList = (schoolId: string) => {
  const [contracts, setContracts] = useState<MaintenanceContract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContracts = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScMaintenanceContractService(createClient());
      const data = await service.listContracts(schoolId);
      setContracts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  return { contracts, loading, error, refresh: fetchContracts };
};
