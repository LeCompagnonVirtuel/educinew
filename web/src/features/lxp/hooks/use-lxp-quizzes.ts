'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpQuizService } from '../services/lxp-quiz.service';
import type { Quiz, QuizCreate, QuizUpdate } from '@educi/types';
import type { QuizQuery } from '../types';

export const useLxpQuizzes = (courseId: string) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuizzes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuizService(createClient());
      const result = await service.listQuizzes(courseId);
      setQuizzes(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quizzes');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  return { quizzes, loading, error, refresh: fetchQuizzes };
};

export const useLxpQuiz = (schoolId: string, id: string | null) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuiz = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuizService(createClient());
      const data = await service.getQuiz(schoolId, id);
      setQuiz(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quiz');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  return { quiz, loading, error, refresh: fetchQuiz };
};

export const useLxpQuizCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: QuizCreate): Promise<Quiz | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuizService(createClient());
      const result = await service.createQuiz(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create quiz');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpQuizUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, data: QuizUpdate): Promise<Quiz | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuizService(createClient());
      const result = await service.updateQuiz(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update quiz');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpQuizDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuizService(createClient());
      await service.deleteQuiz(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete quiz');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
