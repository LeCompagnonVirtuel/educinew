'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDeviceTrackingService } from '../services/device-tracking.service';
import { createClient } from '@/lib/supabase/client';
import type { DeviceTracking } from '@educi/types';

export const useEntDeviceTrackingList = (schoolId: string) => {
  const [items, setItems] = useState<DeviceTracking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeviceTrackingService(supabase);
      const data = await service.listDeviceTrackings(schoolId);
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
