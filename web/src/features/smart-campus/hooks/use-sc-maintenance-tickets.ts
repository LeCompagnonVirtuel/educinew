'use client';
import { useState, useCallback } from 'react';
import { ScMaintenanceTicketService } from '../services/sc-maintenance-ticket.service';
import { createClient } from '@/lib/supabase/client';
import type { MaintenanceTicket, MaintenanceTicketCreate } from '@educi/types';

export const useScMaintenanceTickets = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: MaintenanceTicketCreate): Promise<MaintenanceTicket | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScMaintenanceTicketService(createClient());
      return await service.createTicket(schoolId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const assign = useCallback(async (ticketId: string, technicianId: string): Promise<MaintenanceTicket | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScMaintenanceTicketService(createClient());
      return await service.assignTechnician(schoolId, ticketId, technicianId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const escalate = useCallback(async (ticketId: string): Promise<MaintenanceTicket | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScMaintenanceTicketService(createClient());
      return await service.updateTicket(schoolId, ticketId, { priority: 'high' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const resolve = useCallback(async (ticketId: string, resolution: string): Promise<MaintenanceTicket | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScMaintenanceTicketService(createClient());
      return await service.resolveTicket(schoolId, ticketId, resolution);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, assign, escalate, resolve };
};
