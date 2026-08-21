'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSDependencyNodeService } from '../services/eduos-dependency-node.service';
import { createClient } from '@/lib/supabase/client';
import type { DependencyNode } from '@educi/types';

export const useEduOSDependencyNodeList = (schoolId: string) => {
  const [items, setItems] = useState<DependencyNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDependencyNodeService(supabase);
      const data = await service.listDependencyNodes(schoolId);
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
