'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSProductLicenseService } from '../services/eduos-product-license.service';
import { createClient } from '@/lib/supabase/client';
import type { ProductLicense } from '@educi/types';

export const useEduOSProductLicenseList = (schoolId: string) => {
  const [items, setItems] = useState<ProductLicense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSProductLicenseService(supabase);
      const data = await service.listProductLicenses(schoolId);
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
