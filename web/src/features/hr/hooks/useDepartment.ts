import { useState, useEffect, useCallback } from 'react';
import { createDepartmentService } from '../services/department.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { Department } from '../types';

export function useDepartments(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createDepartmentService(repo);
  const [data, setData] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findDepartments(schoolId);
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

export function useDepartment(supabase: any, schoolId: string, departmentId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createDepartmentService(repo);
  const [data, setData] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!departmentId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findDepartmentById(schoolId, departmentId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, departmentId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
