'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScSecurityIncidentService } from '../services/sc-security-incident.service';
import { createClient } from '@/lib/supabase/client';
import type { SecurityIncident } from '@educi/types';

export const useScSecurityIncidentList = (schoolId: string) => {
  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIncidents = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScSecurityIncidentService(createClient());
      const data = await service.listIncidents(schoolId);
      setIncidents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  return { incidents, loading, error, refresh: fetchIncidents };
};
