import { useState, useCallback } from 'react';
import { createAuditService } from '../services/audit.service';
import { createHRRepository } from '../repositories/hr.repository';

export function useHrAudit(supabase: any) {
  const repo = createHRRepository(supabase);
  const service = createAuditService(repo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logAuditEntry = useCallback(async (
    schoolId: string,
    userId: string,
    action: string,
    entityType: string,
    entityId: string,
    previousValue?: Record<string, unknown>,
    newValue?: Record<string, unknown>
  ) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.logAuditEntry(schoolId, userId, action, entityType, entityId, previousValue, newValue);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { logAuditEntry, loading, error };
}
