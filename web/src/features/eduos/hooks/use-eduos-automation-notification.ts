'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSAutomationNotificationService } from '../services/eduos-automation-notification.service';
import { createClient } from '@/lib/supabase/client';
import type { AutomationNotification } from '@educi/types';

export const useEduOSAutomationNotificationList = (schoolId: string) => {
  const [items, setItems] = useState<AutomationNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationNotificationService(supabase);
      const data = await service.listAutomationNotifications(schoolId);
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