'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSDKDocumentationService } from '../services/sdk-documentation.service';
import { createClient } from '@/lib/supabase/client';
import type { SDKDocumentation } from '@educi/types';

export const useEntSDKDocumentationList = (schoolId: string) => {
  const [items, setItems] = useState<SDKDocumentation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSDKDocumentationService(supabase);
      const data = await service.listSDKDocumentations(schoolId);
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
