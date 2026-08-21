'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpCompetencyService } from '../services/lxp-competency.service';
import type { Competency } from '@educi/types';
import type { CompetencyQuery } from '../types';

export const useLxpCompetencies = (schoolId: string) => {
  const [competencies, setCompetencies] = useState<readonly Competency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompetencies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCompetencyService(createClient());
      const data = await service.listCompetencies(schoolId);
      setCompetencies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch competencies');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchCompetencies();
  }, [fetchCompetencies]);

  return { competencies, loading, error, refresh: fetchCompetencies };
};

export const useLxpCompetency = (schoolId: string, id: string | null) => {
  const [competency, setCompetency] = useState<Competency | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompetency = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCompetencyService(createClient());
      const data = await service.getCompetency(schoolId, id);
      setCompetency(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch competency');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchCompetency();
  }, [fetchCompetency]);

  return { competency, loading, error, refresh: fetchCompetency };
};

export const useLxpCompetencyCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<Competency, 'id' | 'createdAt' | 'updatedAt' | 'usageCount'>): Promise<Competency | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCompetencyService(createClient());
      const result = await service.createCompetency(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create competency');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpCompetencyAssess = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const assess = useCallback(async (schoolId: string, id: string, userId: string, score: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCompetencyService(createClient());
      const result = await service.assessCompetency(schoolId, id, userId, score);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to assess competency');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { assess, loading, error };
};

export const useLxpCompetencyDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCompetencyService(createClient());
      await service.deleteCompetency(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete competency');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
