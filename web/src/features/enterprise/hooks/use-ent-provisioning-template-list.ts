'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntProvisioningTemplateService } from '../services/provisioning-template.service';
import { createClient } from '@/lib/supabase/client';
import type { ProvisioningTemplate } from '@educi/types';

export const useEntProvisioningTemplateList = (schoolId: string) => {
  const [items, setItems] = useState<ProvisioningTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntProvisioningTemplateService(supabase);
      const data = await service.listProvisioningTemplates(schoolId);
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
