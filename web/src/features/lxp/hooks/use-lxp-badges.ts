'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpBadgeService } from '../services/lxp-badge.service';
import type { DigitalBadge, BadgeCreate } from '@educi/types';
import type { BadgeQuery } from '../types';

export const useLxpBadges = (schoolId: string) => {
  const [badges, setBadges] = useState<readonly DigitalBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBadges = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpBadgeService(createClient());
      const data = await service.listBadges(schoolId);
      setBadges(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch badges');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchBadges();
  }, [fetchBadges]);

  return { badges, loading, error, refresh: fetchBadges };
};

export const useLxpBadge = (schoolId: string, id: string | null) => {
  const [badge, setBadge] = useState<DigitalBadge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBadge = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpBadgeService(createClient());
      const data = await service.getBadge(schoolId, id);
      setBadge(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch badge');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchBadge();
  }, [fetchBadge]);

  return { badge, loading, error, refresh: fetchBadge };
};

export const useLxpBadgeCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: BadgeCreate): Promise<DigitalBadge | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpBadgeService(createClient());
      const result = await service.createBadge(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create badge');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpBadgeAward = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const award = useCallback(async (schoolId: string, id: string, userId: string): Promise<DigitalBadge | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpBadgeService(createClient());
      const result = await service.awardBadge(schoolId, id, userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to award badge');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { award, loading, error };
};

export const useLxpBadgeVerify = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verify = useCallback(async (verificationCode: string): Promise<DigitalBadge | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpBadgeService(createClient());
      const result = await service.verifyBadge(verificationCode);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify badge');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { verify, loading, error };
};
