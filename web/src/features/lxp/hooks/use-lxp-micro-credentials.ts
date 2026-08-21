'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpMicroCredentialService } from '../services/lxp-micro-credential.service';
import type { MicroCredential } from '@educi/types';
import type { MicroCredentialQuery } from '../types';

export const useLxpMicroCredentials = (schoolId: string) => {
  const [credentials, setCredentials] = useState<readonly MicroCredential[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCredentials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpMicroCredentialService(createClient());
      const data = await service.listMicroCredentials(schoolId);
      setCredentials(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch micro credentials');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchCredentials();
  }, [fetchCredentials]);

  return { credentials, loading, error, refresh: fetchCredentials };
};

export const useLxpMicroCredential = (schoolId: string, id: string | null) => {
  const [credential, setCredential] = useState<MicroCredential | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCredential = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpMicroCredentialService(createClient());
      const data = await service.getMicroCredential(schoolId, id);
      setCredential(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch micro credential');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchCredential();
  }, [fetchCredential]);

  return { credential, loading, error, refresh: fetchCredential };
};

export const useLxpMicroCredentialCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<MicroCredential, 'id' | 'createdAt' | 'updatedAt' | 'issuedCount' | 'status'>): Promise<MicroCredential | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpMicroCredentialService(createClient());
      const result = await service.createMicroCredential(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create micro credential');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpMicroCredentialAward = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const award = useCallback(async (schoolId: string, id: string, userId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpMicroCredentialService(createClient());
      const result = await service.awardMicroCredential(schoolId, id, userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to award micro credential');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { award, loading, error };
};

export const useLxpMicroCredentialDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpMicroCredentialService(createClient());
      await service.deleteMicroCredential(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete micro credential');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
