'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntProvisioningConstraintService } from '../services/provisioning-constraint.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningConstraint } from '@educi/types';

export const useEntProvisioningConstraintList = (schoolId: string) => {
  const [items, setItems] = useState<ProvisioningConstraint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningConstraintService(supabase);
      const data = await service.listProvisioningConstraints(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
