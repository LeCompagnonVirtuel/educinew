'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentSkillBadgeService } from '../services/assessment-skill-badge.service';
import { createClient } from '@/lib/supabase/client';
import type { SkillBadge } from '@educi/types';

export const useAssessmentSkillBadgeList = (schoolId: string) => {
  const [items, setItems] = useState<SkillBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentSkillBadgeService(supabase);
      const data = await service.listSkillBadges(schoolId);
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