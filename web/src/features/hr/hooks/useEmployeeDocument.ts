import { useState, useEffect, useCallback } from 'react';
import { createDocumentService } from '../services/document.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { EmployeeDocument } from '../types';

export function useEmployeeDocuments(supabase: any, schoolId: string, employeeId: string) {
  const repo = createHRRepository(supabase);
  const service = createDocumentService(repo);
  const [data, setData] = useState<EmployeeDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findEmployeeDocuments(schoolId, employeeId);
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

export function useEmployeeDocument(supabase: any, schoolId: string, documentId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createDocumentService(repo);
  const [data, setData] = useState<EmployeeDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!documentId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findEmployeeDocumentById(schoolId, documentId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, documentId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
