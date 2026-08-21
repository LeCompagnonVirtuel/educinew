'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScMaintenanceTicketService } from '../services/sc-maintenance-ticket.service';
import { createClient } from '@/lib/supabase/client';
import type { MaintenanceTicket } from '@educi/types';

export const useScMaintenanceTicketList = (schoolId: string) => {
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScMaintenanceTicketService(createClient());
      const data = await service.listTickets(schoolId);
      setTickets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return { tickets, loading, error, refresh: fetchTickets };
};
