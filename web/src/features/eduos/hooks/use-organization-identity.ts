'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSOrganizationIdentityService } from '../services/eduos-organization-identity.service';
import { createClient } from '@/lib/supabase/client';
import type { OrganizationIdentity } from '@educi/types';

export const useEduOSOrganizationIdentityList = (schoolId: string) => {
  const [items, setItems] = useState<OrganizationIdentity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSOrganizationIdentityService(supabase);
      const data = await service.listOrganizationIdentitys(schoolId);
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
