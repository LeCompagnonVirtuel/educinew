import { useState, useCallback } from 'react';
import { createSupportTicketService } from '../services/support-ticket.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { SupportTicket } from '../types';

export function useResolveTicket(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createSupportTicketService(repo);
  const [data, setData] = useState<SupportTicket | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolveTicket = useCallback(async (ticketId: string, resolution: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.resolveTicket(schoolId, ticketId, resolution);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { data, loading, error, resolveTicket };
}
