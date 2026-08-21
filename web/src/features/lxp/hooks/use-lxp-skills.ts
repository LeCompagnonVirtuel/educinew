'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpSkillService } from '../services/lxp-skill.service';
import type { Skill } from '@educi/types';
import type { SkillQuery } from '../types';

export const useLxpSkills = (schoolId: string) => {
  const [skills, setSkills] = useState<readonly Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpSkillService(createClient());
      const data = await service.listSkills(schoolId);
      setSkills(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return { skills, loading, error, refresh: fetchSkills };
};

export const useLxpSkill = (schoolId: string, id: string | null) => {
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkill = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpSkillService(createClient());
      const data = await service.getSkill(schoolId, id);
      setSkill(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch skill');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchSkill();
  }, [fetchSkill]);

  return { skill, loading, error, refresh: fetchSkill };
};

export const useLxpSkillCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<Skill, 'id' | 'createdAt' | 'updatedAt' | 'endorsementsCount' | 'verifiedCount'>): Promise<Skill | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpSkillService(createClient());
      const result = await service.createSkill(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create skill');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpSkillAssess = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const assess = useCallback(async (schoolId: string, id: string, userId: string, level: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpSkillService(createClient());
      const result = await service.assessSkill(schoolId, id, userId, level);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to assess skill');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { assess, loading, error };
};

export const useLxpSkillDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpSkillService(createClient());
      await service.deleteSkill(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete skill');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
