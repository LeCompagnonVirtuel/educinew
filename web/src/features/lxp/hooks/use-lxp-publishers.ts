'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpPublisherService } from '../services/lxp-publisher.service';
import type { PublisherAccount } from '@educi/types';
import type { PublisherQuery } from '../types';

export const useLxpPublishers = (schoolId: string) => {
  const [publishers, setPublishers] = useState<readonly PublisherAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPublishers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPublisherService(createClient());
      const data = await service.listPublishers(schoolId);
      setPublishers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch publishers');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchPublishers();
  }, [fetchPublishers]);

  return { publishers, loading, error, refresh: fetchPublishers };
};

export const useLxpPublisher = (schoolId: string, id: string | null) => {
  const [publisher, setPublisher] = useState<PublisherAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPublisher = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPublisherService(createClient());
      const data = await service.getPublisher(schoolId, id);
      setPublisher(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch publisher');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchPublisher();
  }, [fetchPublisher]);

  return { publisher, loading, error, refresh: fetchPublisher };
};

export const useLxpPublisherApply = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apply = useCallback(async (data: Omit<import('@educi/types').PublisherApplication, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'submittedAt'>): Promise<import('@educi/types').PublisherApplication | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPublisherService(createClient());
      const result = await service.applyAsPublisher(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply as publisher');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { apply, loading, error };
};

export const useLxpPublisherApprove = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const approve = useCallback(async (schoolId: string, id: string): Promise<PublisherAccount | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPublisherService(createClient());
      const result = await service.approvePublisher(schoolId, id);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve publisher');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { approve, loading, error };
};

export const useLxpPublisherStats = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStats = useCallback(async (schoolId: string, id: string): Promise<{ totalRevenue: number; totalSales: number; averageRating: number } | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPublisherService(createClient());
      const result = await service.getPublisherStats(schoolId, id);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch publisher stats');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getStats, loading, error };
};
