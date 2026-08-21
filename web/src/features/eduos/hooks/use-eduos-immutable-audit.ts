'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSImmutableAuditService } from '../services/eduos-immutable-audit.service';
import { createClient } from '@/lib/supabase/client';
import type { ImmutableAudit } from '@educi/types';

export const useEduOSImmutableAuditList = (schoolId: string) => {
  const [items, setItems] = useState<ImmutableAudit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSImmutableAuditService(supabase);
      const data = await service.listImmutableAudits(schoolId);
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
