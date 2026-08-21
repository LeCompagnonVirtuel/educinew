'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export const useGefiMarketplaceProduct = (schoolId: string) => {
  const [data, setData] = useState<GefiMarketplaceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data: rows, error: err } = await supabase
        .from('gefi_marketplace_product')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });
      if (err) throw err;
      setData(rows ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

interface GefiMarketplaceProduct { id: string; school_id: string; provider_id: string; name: string; price: number; created_at: string; }
