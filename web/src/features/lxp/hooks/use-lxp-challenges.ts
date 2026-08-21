'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpChallengeService } from '../services/lxp-challenge.service';
import type { Challenge, ChallengeCreate } from '@educi/types';
import type { ChallengeQuery } from '../types';

export const useLxpChallenges = (schoolId: string) => {
  const [challenges, setChallenges] = useState<readonly Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChallenges = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpChallengeService(createClient());
      const data = await service.listChallenges(schoolId);
      setChallenges(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch challenges');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  return { challenges, loading, error, refresh: fetchChallenges };
};

export const useLxpChallenge = (schoolId: string, id: string | null) => {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChallenge = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpChallengeService(createClient());
      const data = await service.getChallenge(schoolId, id);
      setChallenge(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch challenge');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchChallenge();
  }, [fetchChallenge]);

  return { challenge, loading, error, refresh: fetchChallenge };
};

export const useLxpChallengeCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ChallengeCreate): Promise<Challenge | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpChallengeService(createClient());
      const result = await service.createChallenge(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create challenge');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpChallengeComplete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const complete = useCallback(async (schoolId: string, id: string, userId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpChallengeService(createClient());
      const result = await service.completeChallenge(schoolId, id, userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete challenge');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { complete, loading, error };
};

export const useLxpChallengeDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpChallengeService(createClient());
      await service.deleteChallenge(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete challenge');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
