'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSQRIdentityService } from '../services/eduos-qr-identity.service';
import { createClient } from '@/lib/supabase/client';
import type { QRIdentity } from '@educi/types';

export const useEduOSQRIdentityList = (schoolId: string) => {
  const [items, setItems] = useState<QRIdentity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSQRIdentityService(supabase);
      const data = await service.listQRIdentitys(schoolId);
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
