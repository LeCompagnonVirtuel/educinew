'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScFurnitureService } from '../services/sc-furniture.service';
import { createClient } from '@/lib/supabase/client';
import type { Furniture } from '@educi/types';

export const useScFurnitureList = (schoolId: string) => {
  const [furniture, setFurniture] = useState<Furniture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFurniture = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScFurnitureService(createClient());
      const data = await service.listFurniture(schoolId);
      setFurniture(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchFurniture();
  }, [fetchFurniture]);

  return { furniture, loading, error, refresh: fetchFurniture };
};
