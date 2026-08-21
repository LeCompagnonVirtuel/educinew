'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpQuizAttemptService } from '../services/lxp-quiz-attempt.service';
import type { QuizAttempt } from '@educi/types';
import type { QuizAttemptQuery } from '../types';

export const useLxpQuizAttempts = (quizId: string, userId: string) => {
  const [attempts, setAttempts] = useState<readonly QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttempts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuizAttemptService(createClient());
      const data = await service.listAttempts(quizId, userId);
      setAttempts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quiz attempts');
    } finally {
      setLoading(false);
    }
  }, [quizId, userId]);

  useEffect(() => {
    fetchAttempts();
  }, [fetchAttempts]);

  return { attempts, loading, error, refresh: fetchAttempts };
};

export const useLxpQuizAttempt = (schoolId: string, id: string | null) => {
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttempt = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuizAttemptService(createClient());
      const data = await service.getAttempt(schoolId, id);
      setAttempt(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quiz attempt');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchAttempt();
  }, [fetchAttempt]);

  return { attempt, loading, error, refresh: fetchAttempt };
};

export const useLxpQuizAttemptSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async (attemptId: string, answers: Record<string, unknown>): Promise<QuizAttempt | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuizAttemptService(createClient());
      const result = await service.submitAttempt(attemptId, answers);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit quiz attempt');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { submit, loading, error };
};

export const useLxpQuizAttemptResult = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getResult = useCallback(async (schoolId: string, id: string): Promise<QuizAttempt | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuizAttemptService(createClient());
      const result = await service.getAttemptResult(schoolId, id);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get quiz attempt result');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getResult, loading, error };
};

export const useLxpQuizAttemptAbandon = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abandon = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuizAttemptService(createClient());
      await service.abandonAttempt(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to abandon quiz attempt');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { abandon, loading, error };
};
