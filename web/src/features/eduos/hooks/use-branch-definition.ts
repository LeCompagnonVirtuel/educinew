'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSBranchDefinitionService } from '../services/eduos-branch-definition.service';
import { createClient } from '@/lib/supabase/client';
import type { BranchDefinition } from '@educi/types';

export const useEduOSBranchDefinitionList = (schoolId: string) => {
  const [items, setItems] = useState<BranchDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSBranchDefinitionService(supabase);
      const data = await service.listBranchDefinitions(schoolId);
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
