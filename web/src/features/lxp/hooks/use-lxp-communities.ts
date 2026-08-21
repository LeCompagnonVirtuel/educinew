'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpCommunityService } from '../services/lxp-community.service';
import type { Community, CommunityMember } from '@educi/types';
import type { CommunityQuery } from '../types';

export const useLxpCommunities = (schoolId: string) => {
  const [communities, setCommunities] = useState<readonly Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommunities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCommunityService(createClient());
      const data = await service.listCommunities(schoolId);
      setCommunities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch communities');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  return { communities, loading, error, refresh: fetchCommunities };
};

export const useLxpCommunity = (schoolId: string, id: string | null) => {
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommunity = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCommunityService(createClient());
      const data = await service.getCommunity(schoolId, id);
      setCommunity(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch community');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchCommunity();
  }, [fetchCommunity]);

  return { community, loading, error, refresh: fetchCommunity };
};

export const useLxpCommunityCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<Community, 'id' | 'createdAt' | 'updatedAt' | 'memberCount' | 'postCount' | 'lastActivityAt'>): Promise<Community | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCommunityService(createClient());
      const result = await service.createCommunity(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create community');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpCommunityJoin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const join = useCallback(async (schoolId: string, id: string, userId: string): Promise<CommunityMember | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCommunityService(createClient());
      const result = await service.joinCommunity(schoolId, id, userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join community');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { join, loading, error };
};

export const useLxpCommunityLeave = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const leave = useCallback(async (schoolId: string, id: string, userId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCommunityService(createClient());
      await service.leaveCommunity(schoolId, id, userId);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to leave community');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { leave, loading, error };
};
