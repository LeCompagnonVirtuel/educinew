import { useState, useEffect, useCallback } from 'react';
import { createTransferService } from '../services/transfer.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { Transfer } from '../types';

export function useTransfers(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createTransferService(repo);
  const [data, setData] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findTransfers(schoolId);
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

export function useTransfer(supabase: any, schoolId: string, transferId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createTransferService(repo);
  const [data, setData] = useState<Transfer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!transferId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findTransferById(schoolId, transferId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, transferId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
