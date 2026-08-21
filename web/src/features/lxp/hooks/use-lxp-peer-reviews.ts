'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpPeerReviewService } from '../services/lxp-peer-review.service';
import type { PeerReview } from '@educi/types';
import type { PeerReviewQuery } from '../types';

export const useLxpPeerReviews = (assignmentId: string) => {
  const [reviews, setReviews] = useState<readonly PeerReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPeerReviewService(createClient());
      const data = await service.listPeerReviews(assignmentId);
      setReviews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch peer reviews');
    } finally {
      setLoading(false);
    }
  }, [assignmentId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { reviews, loading, error, refresh: fetchReviews };
};

export const useLxpPeerReview = (schoolId: string, id: string | null) => {
  const [review, setReview] = useState<PeerReview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReview = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPeerReviewService(createClient());
      const data = await service.getPeerReview(schoolId, id);
      setReview(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch peer review');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  return { review, loading, error, refresh: fetchReview };
};

export const useLxpPeerReviewCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<PeerReview, 'id' | 'createdAt' | 'updatedAt'>): Promise<PeerReview | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPeerReviewService(createClient());
      const result = await service.createPeerReview(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create peer review');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpPeerReviewComplete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const complete = useCallback(async (schoolId: string, id: string): Promise<PeerReview | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPeerReviewService(createClient());
      const result = await service.completePeerReview(schoolId, id);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete peer review');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { complete, loading, error };
};

export const useLxpPeerReviewDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpPeerReviewService(createClient());
      await service.deletePeerReview(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete peer review');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
