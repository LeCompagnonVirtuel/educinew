'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScTechnicianService } from '../services/sc-technician.service';
import { createClient } from '@/lib/supabase/client';
import type { Technician } from '@educi/types';

export const useScTechnicianList = (schoolId: string) => {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTechnicians = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScTechnicianService(createClient());
      const data = await service.listTechnicians(schoolId);
      setTechnicians(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchTechnicians();
  }, [fetchTechnicians]);

  return { technicians, loading, error, refresh: fetchTechnicians };
};
