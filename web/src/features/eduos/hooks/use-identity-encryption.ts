'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSIdentityEncryptionService } from '../services/eduos-identity-encryption.service';
import { createClient } from '@/lib/supabase/client';
import type { IdentityEncryption } from '@educi/types';

export const useEduOSIdentityEncryptionList = (schoolId: string) => {
  const [items, setItems] = useState<IdentityEncryption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIdentityEncryptionService(supabase);
      const data = await service.listIdentityEncryptions(schoolId);
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
