'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScIdentityVerificationService } from '../services/sc-identity-verification.service';
import { createClient } from '@/lib/supabase/client';
import type { IdentityVerification, IdentityVerificationCreate } from '@educi/types';

export const useScIdentityVerificationList = (schoolId: string) => {
  const [items, setItems] = useState<IdentityVerification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScIdentityVerificationService(createClient());
      const data = await service.listVerifications(schoolId);
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

export const useScIdentityVerificationGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<IdentityVerification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScIdentityVerificationService(createClient());
      const data = await service.getVerification(schoolId, id);
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

export const useScIdentityVerificationCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: IdentityVerificationCreate): Promise<IdentityVerification | null> => {
    try {
      setLoading(true);
      const service = new ScIdentityVerificationService(createClient());
      const result = await service.createVerification(schoolId, data);
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

export const useScIdentityVerificationUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: Partial<IdentityVerificationCreate>): Promise<IdentityVerification | null> => {
    try {
      setLoading(true);
      const service = new ScIdentityVerificationService(createClient());
      const result = await service.updateVerification(schoolId, id, data);
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

export const useScIdentityVerificationDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScIdentityVerificationService(createClient());
      await service.deleteVerification(schoolId, id);
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
