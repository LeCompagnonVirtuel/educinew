'use client';
import { useState, useCallback } from 'react';
import { ScVisitorApprovalService } from '../services/sc-visitor-approval.service';
import { createClient } from '@/lib/supabase/client';
import type { VisitorApproval, VisitorApprovalCreate } from '@educi/types';

export const useScVisitorApproval = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const approve = useCallback(async (approvalId: string): Promise<VisitorApproval | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScVisitorApprovalService(createClient());
      return await service.updateApproval(schoolId, approvalId, { status: 'approved' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const reject = useCallback(async (approvalId: string): Promise<VisitorApproval | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScVisitorApprovalService(createClient());
      return await service.updateApproval(schoolId, approvalId, { status: 'rejected' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getPending = useCallback(async (): Promise<VisitorApproval[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScVisitorApprovalService(createClient());
      return await service.listApprovals(schoolId, { status: 'pending' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, approve, reject, getPending };
};
