'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpQuestionBankService } from '../services/lxp-question-bank.service';
import type { QuestionBank, QuestionBankQuery, QuestionBankStats, Question } from '@educi/types';

export const useLxpQuestionBanks = (courseId: string) => {
  const [banks, setBanks] = useState<readonly QuestionBank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBanks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuestionBankService(createClient());
      const data = await service.listQuestionBanks(courseId);
      setBanks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch question banks');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchBanks();
  }, [fetchBanks]);

  return { banks, loading, error, refresh: fetchBanks };
};

export const useLxpQuestionBank = (schoolId: string, id: string | null) => {
  const [bank, setBank] = useState<QuestionBank | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBank = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuestionBankService(createClient());
      const data = await service.getQuestionBank(schoolId, id);
      setBank(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch question bank');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchBank();
  }, [fetchBank]);

  return { bank, loading, error, refresh: fetchBank };
};

export const useLxpQuestionBankCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<QuestionBank, 'id' | 'createdAt' | 'updatedAt' | 'questionCount' | 'isShared' | 'createdBy'>): Promise<QuestionBank | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuestionBankService(createClient());
      const result = await service.createQuestionBank(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create question bank');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpQuestionBankStats = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStats = useCallback(async (schoolId: string, id: string): Promise<QuestionBankStats | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuestionBankService(createClient());
      const result = await service.getQuestionBankStats(schoolId, id);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch question bank stats');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getStats, loading, error };
};

export const useLxpQuestionBankDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpQuestionBankService(createClient());
      await service.deleteQuestionBank(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete question bank');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
