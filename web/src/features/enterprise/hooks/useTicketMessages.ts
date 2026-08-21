import { useState, useEffect, useCallback } from 'react';
import { createTicketMessageService } from '../services/ticket-message.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { TicketMessage } from '../types';

export function useTicketMessages(supabase: any, schoolId: string, ticketId: string | null) {
  const repo = createEnterpriseRepository(supabase);
  const service = createTicketMessageService(repo);
  const [data, setData] = useState<TicketMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!ticketId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findMessages(schoolId, ticketId);
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
