'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSRiskRegisterService } from '../services/eduos-risk-register.service';
import { createClient } from '@/lib/supabase/client';
import type { RiskRegister } from '@educi/types';

export const useEduOSRiskRegisterList = (schoolId: string) => {
  const [items, setItems] = useState<RiskRegister[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRiskRegisterService(supabase);
      const data = await service.listRiskRegisters(schoolId);
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
