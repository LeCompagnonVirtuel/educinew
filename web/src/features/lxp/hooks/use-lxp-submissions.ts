'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpSubmissionService } from '../services/lxp-submission.service';
import type { Submission, SubmissionCreate } from '@educi/types';
import type { SubmissionQuery } from '../types';

export const useLxpSubmissions = (assignmentId: string, userId?: string) => {
  const [submissions, setSubmissions] = useState<readonly Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpSubmissionService(createClient());
      const data = await service.listSubmissions(assignmentId, userId);
      setSubmissions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  }, [assignmentId, userId]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  return { submissions, loading, error, refresh: fetchSubmissions };
};

export const useLxpSubmission = (schoolId: string, id: string | null) => {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmission = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpSubmissionService(createClient());
      const data = await service.getSubmission(schoolId, id);
      setSubmission(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch submission');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchSubmission();
  }, [fetchSubmission]);

  return { submission, loading, error, refresh: fetchSubmission };
};

export const useLxpSubmissionCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (assignmentId: string, userId: string, data: SubmissionCreate): Promise<Submission | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpSubmissionService(createClient());
      const result = await service.createSubmission(assignmentId, userId, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create submission');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpSubmissionUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, data: Partial<SubmissionCreate>): Promise<Submission | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpSubmissionService(createClient());
      const result = await service.updateSubmission(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update submission');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpSubmissionDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpSubmissionService(createClient());
      await service.deleteSubmission(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete submission');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
