'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSNFCIdentityService } from '../services/eduos-nfc-identity.service';
import { createClient } from '@/lib/supabase/client';
import type { NFCIdentity } from '@educi/types';

export const useEduOSNFCIdentityList = (schoolId: string) => {
  const [items, setItems] = useState<NFCIdentity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSNFCIdentityService(supabase);
      const data = await service.listNFCIdentitys(schoolId);
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
