import { useState, useEffect, useCallback } from 'react';
import { createEmployeeService } from '../services/employee.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { Employee } from '../types';

export function useEmployees(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createEmployeeService(repo);
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findEmployees(schoolId);
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

export function useEmployee(supabase: any, schoolId: string, employeeId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createEmployeeService(repo);
  const [data, setData] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!employeeId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findEmployeeById(schoolId, employeeId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, employeeId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
