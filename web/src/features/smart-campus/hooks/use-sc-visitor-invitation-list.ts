'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScVisitorInvitationService } from '../services/sc-visitor-invitation.service';
import { createClient } from '@/lib/supabase/client';
import type { VisitorInvitation, VisitorInvitationCreate } from '@educi/types';

export const useScVisitorInvitationList = (schoolId: string) => {
  const [items, setItems] = useState<VisitorInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScVisitorInvitationService(createClient());
      const data = await service.listInvitations(schoolId);
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

export const useScVisitorInvitationGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<VisitorInvitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScVisitorInvitationService(createClient());
      const data = await service.getInvitation(schoolId, id);
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

export const useScVisitorInvitationCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: VisitorInvitationCreate): Promise<VisitorInvitation | null> => {
    try {
      setLoading(true);
      const service = new ScVisitorInvitationService(createClient());
      const result = await service.createInvitation(schoolId, data);
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

export const useScVisitorInvitationUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: Partial<VisitorInvitationCreate>): Promise<VisitorInvitation | null> => {
    try {
      setLoading(true);
      const service = new ScVisitorInvitationService(createClient());
      const result = await service.updateInvitation(schoolId, id, data);
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

export const useScVisitorInvitationDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScVisitorInvitationService(createClient());
      await service.deleteInvitation(schoolId, id);
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
