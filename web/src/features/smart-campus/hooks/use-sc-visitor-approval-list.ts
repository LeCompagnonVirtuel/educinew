'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScVisitorApprovalService } from '../services/sc-visitor-approval.service';
import { createClient } from '@/lib/supabase/client';
import type { VisitorApproval, VisitorApprovalCreate } from '@educi/types';

export const useScVisitorApprovalList = (schoolId: string) => {
  const [items, setItems] = useState<VisitorApproval[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScVisitorApprovalService(createClient());
      const data = await service.listApprovals(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return { items, loading, error, refresh: fetchData };
};

export const useScVisitorApprovalGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<VisitorApproval | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScVisitorApprovalService(createClient());
      const data = await service.getApproval(schoolId, id);
      setItem(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);
  useEffect(() => { fetchItem(); }, [fetchItem]);
  return { item, loading, error, refresh: fetchItem };
};

export const useScVisitorApprovalCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: VisitorApprovalCreate): Promise<VisitorApproval | null> => {
    try {
      setLoading(true);
      const service = new ScVisitorApprovalService(createClient());
      const result = await service.createApproval(schoolId, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { create, loading, error };
};

export const useScVisitorApprovalUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: Partial<VisitorApprovalCreate>): Promise<VisitorApproval | null> => {
    try {
      setLoading(true);
      const service = new ScVisitorApprovalService(createClient());
      const result = await service.updateApproval(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { update, loading, error };
};

export const useScVisitorApprovalDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScVisitorApprovalService(createClient());
      await service.deleteApproval(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { remove, loading, error };
};
