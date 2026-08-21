'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpReviewService } from '../services/lxp-review.service';
import type { Review } from '@educi/types';
import type { ReviewQuery } from '../types';

export const useLxpReviews = (courseId: string) => {
  const [reviews, setReviews] = useState<readonly Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpReviewService(createClient());
      const data = await service.listReviews(courseId);
      setReviews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { reviews, loading, error, refresh: fetchReviews };
};

export const useLxpReview = (schoolId: string, id: string | null) => {
  const [review, setReview] = useState<Review | null>(null);
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
      const service = new LxpReviewService(createClient());
      const data = await service.getReview(schoolId, id);
      setReview(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch review');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  return { review, loading, error, refresh: fetchReview };
};

export const useLxpReviewCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'helpfulCount' | 'reportCount'>): Promise<Review | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpReviewService(createClient());
      const result = await service.createReview(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create review');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpReviewUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, data: Partial<Review>): Promise<Review | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpReviewService(createClient());
      const result = await service.updateReview(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update review');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpReviewDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpReviewService(createClient());
      await service.deleteReview(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete review');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
