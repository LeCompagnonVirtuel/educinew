'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSSellerProfileService } from '../services/eduos-seller-profile.service';
import { createClient } from '@/lib/supabase/client';
import type { SellerProfile } from '@educi/types';

export const useEduOSSellerProfileList = (schoolId: string) => {
  const [items, setItems] = useState<SellerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSellerProfileService(supabase);
      const data = await service.listSellerProfiles(schoolId);
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
