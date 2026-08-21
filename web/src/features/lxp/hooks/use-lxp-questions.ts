'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpQuestionService } from '../services/lxp-question.service';
import type { Question, QuestionCreate } from '@educi/types';
import type { QuestionQuery } from '../types';

export const useLxpQuestions = (quizId: string) => {
  const [questions, setQuestions] = useState<readonly Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuestionService(createClient());
      const data = await service.listQuestions(quizId);
      setQuestions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return { questions, loading, error, refresh: fetchQuestions };
};

export const useLxpQuestion = (schoolId: string, id: string | null) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestion = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuestionService(createClient());
      const data = await service.getQuestion(schoolId, id);
      setQuestion(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch question');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  return { question, loading, error, refresh: fetchQuestion };
};

export const useLxpQuestionCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: QuestionCreate): Promise<Question | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuestionService(createClient());
      const result = await service.createQuestion(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create question');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpQuestionUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (schoolId: string, id: string, data: Partial<QuestionCreate>): Promise<Question | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuestionService(createClient());
      const result = await service.updateQuestion(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update question');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
};

export const useLxpQuestionDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuestionService(createClient());
      await service.deleteQuestion(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete question');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
