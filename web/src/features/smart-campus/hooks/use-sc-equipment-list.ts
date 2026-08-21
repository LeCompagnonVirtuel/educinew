'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScEquipmentService } from '../services/sc-equipment.service';
import { createClient } from '@/lib/supabase/client';
import type { Equipment } from '@educi/types';

export const useScEquipmentList = (schoolId: string) => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEquipment = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScEquipmentService(createClient());
      const data = await service.listEquipment(schoolId);
      setEquipment(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  return { equipment, loading, error, refresh: fetchEquipment };
};
