'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIncidentAssignmentService } from '../services/incident-assignment.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentAssignment } from '@educi/types';

export const useEntIncidentAssignmentList = (schoolId: string) => {
  const [items, setItems] = useState<IncidentAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentAssignmentService(supabase);
      const data = await service.listIncidentAssignments(schoolId);
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
