'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpGroupService } from '../services/lxp-group.service';
import type { Group, GroupMember } from '@educi/types';
import type { GroupQuery } from '../types';

export const useLxpGroups = (schoolId: string, courseId?: string) => {
  const [groups, setGroups] = useState<readonly Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpGroupService(createClient());
      const data = await service.listGroups(schoolId, courseId);
      setGroups(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch groups');
    } finally {
      setLoading(false);
    }
  }, [schoolId, courseId]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return { groups, loading, error, refresh: fetchGroups };
};

export const useLxpGroup = (schoolId: string, id: string | null) => {
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGroup = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpGroupService(createClient());
      const data = await service.getGroup(schoolId, id);
      setGroup(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch group');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchGroup();
  }, [fetchGroup]);

  return { group, loading, error, refresh: fetchGroup };
};

export const useLxpGroupCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<Group, 'id' | 'createdAt' | 'updatedAt' | 'memberCount'>): Promise<Group | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpGroupService(createClient());
      const result = await service.createGroup(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create group');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpGroupJoin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const join = useCallback(async (schoolId: string, id: string, userId: string): Promise<GroupMember | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpGroupService(createClient());
      const result = await service.joinGroup(schoolId, id, userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join group');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { join, loading, error };
};

export const useLxpGroupLeave = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const leave = useCallback(async (schoolId: string, id: string, userId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpGroupService(createClient());
      await service.leaveGroup(schoolId, id, userId);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to leave group');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { leave, loading, error };
};
