import { useState, useEffect, useCallback } from 'react';
import { createSupportTicketService } from '../services/support-ticket.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { SupportTicket } from '../types';

export function useSupportTickets(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createSupportTicketService(repo);
  const [data, setData] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findTickets(schoolId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
