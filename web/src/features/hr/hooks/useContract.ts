import { useState, useEffect, useCallback } from 'react';
import { createContractService } from '../services/contract.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { EmployeeContract } from '../types';

export function useContracts(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createContractService(repo);
  const [data, setData] = useState<EmployeeContract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findContracts(schoolId);
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

export function useContract(supabase: any, schoolId: string, contractId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createContractService(repo);
  const [data, setData] = useState<EmployeeContract | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!contractId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findContractById(schoolId, contractId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, contractId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
