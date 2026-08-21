'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSAutomationTemplateService } from '../services/eduos-automation-template.service';
import { createClient } from '@/lib/supabase/client';
import type { AutomationTemplate } from '@educi/types';

export const useEduOSAutomationTemplateList = (schoolId: string) => {
  const [items, setItems] = useState<AutomationTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationTemplateService(supabase);
      const data = await service.listAutomationTemplates(schoolId);
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