'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpMentoringService } from '../services/lxp-mentoring.service';
import type { Mentoring, MentoringSession } from '@educi/types';
import type { MentoringQuery } from '../types';

export const useLxpMentoring = (schoolId: string, userId: string) => {
  const [mentorings, setMentorings] = useState<readonly Mentoring[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMentorings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpMentoringService(createClient());
      const data = await service.listMentorings(schoolId, userId);
      setMentorings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch mentorings');
    } finally {
      setLoading(false);
    }
  }, [schoolId, userId]);

  useEffect(() => {
    fetchMentorings();
  }, [fetchMentorings]);

  return { mentorings, loading, error, refresh: fetchMentorings };
};

export const useLxpMentoringDetail = (schoolId: string, id: string | null) => {
  const [mentoring, setMentoring] = useState<Mentoring | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMentoring = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpMentoringService(createClient());
      const data = await service.getMentoring(schoolId, id);
      setMentoring(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch mentoring');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchMentoring();
  }, [fetchMentoring]);

  return { mentoring, loading, error, refresh: fetchMentoring };
};

export const useLxpMentoringCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<Mentoring, 'id' | 'createdAt' | 'updatedAt' | 'sessionCount' | 'totalSessionMinutes'>): Promise<Mentoring | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpMentoringService(createClient());
      const result = await service.createMentoring(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create mentoring');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpMentoringSession = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const schedule = useCallback(async (mentoringId: string, data: Omit<MentoringSession, 'id' | 'createdAt' | 'updatedAt' | 'mentoringId'>): Promise<MentoringSession | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpMentoringService(createClient());
      const result = await service.scheduleSession(mentoringId, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to schedule mentoring session');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { schedule, loading, error };
};

export const useLxpMentoringComplete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const complete = useCallback(async (schoolId: string, id: string): Promise<Mentoring | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpMentoringService(createClient());
      const result = await service.completeMentoring(schoolId, id);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete mentoring');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { complete, loading, error };
};
