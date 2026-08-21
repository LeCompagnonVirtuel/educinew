'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIncidentNotificationService } from '../services/incident-notification.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentNotification } from '@educi/types';

export const useEntIncidentNotificationList = (schoolId: string) => {
  const [items, setItems] = useState<IncidentNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentNotificationService(supabase);
      const data = await service.listIncidentNotifications(schoolId);
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
