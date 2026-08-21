import { useState, useEffect, useCallback } from 'react';
import { createSupportTicketService } from '../services/support-ticket.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { SupportTicket } from '../types';

export function useSupportTicket(supabase: any, schoolId: string, ticketId: string | null) {
  const repo = createEnterpriseRepository(supabase);
  const service = createSupportTicketService(repo);
  const [data, setData] = useState<SupportTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!ticketId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findTicketById(schoolId, ticketId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, ticketId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
