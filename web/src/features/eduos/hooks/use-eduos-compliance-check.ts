'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSComplianceCheckService } from '../services/eduos-compliance-check.service';
import { createClient } from '@/lib/supabase/client';
import type { ComplianceCheck } from '@educi/types';

export const useEduOSComplianceCheckList = (schoolId: string) => {
  const [items, setItems] = useState<ComplianceCheck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSComplianceCheckService(supabase);
      const data = await service.listComplianceChecks(schoolId);
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
