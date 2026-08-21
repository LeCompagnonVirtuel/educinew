'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScEmergencyPlanService } from '../services/sc-emergency-plan.service';
import { createClient } from '@/lib/supabase/client';
import type { EmergencyPlan } from '@educi/types';

export const useScEmergencyPlanList = (schoolId: string) => {
  const [plans, setPlans] = useState<EmergencyPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScEmergencyPlanService(createClient());
      const data = await service.listPlans(schoolId);
      setPlans(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return { plans, loading, error, refresh: fetchPlans };
};
