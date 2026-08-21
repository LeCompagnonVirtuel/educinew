'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntProvisioningValidationService } from '../services/provisioning-validation.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningValidation } from '@educi/types';

export const useEntProvisioningValidationList = (schoolId: string) => {
  const [items, setItems] = useState<ProvisioningValidation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningValidationService(supabase);
      const data = await service.listProvisioningValidations(schoolId);
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
