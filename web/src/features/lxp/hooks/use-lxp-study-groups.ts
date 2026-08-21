'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpStudyGroupService } from '../services/lxp-study-group.service';
import type { StudyGroup, StudyGroupMember, StudyGroupResource } from '@educi/types';
import type { StudyGroupQuery } from '../types';

export const useLxpStudyGroups = (schoolId: string, courseId?: string) => {
  const [groups, setGroups] = useState<readonly StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpStudyGroupService(createClient());
      const data = await service.listStudyGroups(schoolId, courseId);
      setGroups(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch study groups');
    } finally {
      setLoading(false);
    }
  }, [schoolId, courseId]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return { groups, loading, error, refresh: fetchGroups };
};

export const useLxpStudyGroup = (schoolId: string, id: string | null) => {
  const [group, setGroup] = useState<StudyGroup | null>(null);
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
      const service = new LxpStudyGroupService(createClient());
      const data = await service.getStudyGroup(schoolId, id);
      setGroup(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch study group');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchGroup();
  }, [fetchGroup]);

  return { group, loading, error, refresh: fetchGroup };
};

export const useLxpStudyGroupCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<StudyGroup, 'id' | 'createdAt' | 'updatedAt' | 'memberCount' | 'memberIds'>): Promise<StudyGroup | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpStudyGroupService(createClient());
      const result = await service.createStudyGroup(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create study group');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpStudyGroupJoin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const join = useCallback(async (schoolId: string, id: string, userId: string): Promise<StudyGroupMember | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpStudyGroupService(createClient());
      const result = await service.joinStudyGroup(schoolId, id, userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join study group');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { join, loading, error };
};

export const useLxpStudyGroupResource = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addResource = useCallback(async (schoolId: string, id: string, resource: Omit<StudyGroupResource, 'id' | 'sharedAt'>): Promise<StudyGroupResource | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpStudyGroupService(createClient());
      const result = await service.addResource(schoolId, id, resource);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add study group resource');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { addResource, loading, error };
};
