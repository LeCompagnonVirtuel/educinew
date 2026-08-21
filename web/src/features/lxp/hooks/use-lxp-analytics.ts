'use client';

import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpAnalyticsService } from '../services/lxp-analytics.service';
import type { CourseAnalytics, LearningPathAnalytics, QuizAnalytics, AssignmentAnalytics, ProgressReport, EngagementReport } from '@educi/types';
import type { AnalyticsQuery } from '../types';

export const useLxpAnalyticsCourse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCourseAnalytics = useCallback(async (schoolId: string, courseId: string): Promise<CourseAnalytics | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAnalyticsService(createClient());
      const result = await service.getCourseAnalytics(schoolId, courseId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch course analytics');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getCourseAnalytics, loading, error };
};

export const useLxpAnalyticsLearningPath = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLearningPathAnalytics = useCallback(async (schoolId: string, learningPathId: string): Promise<LearningPathAnalytics | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAnalyticsService(createClient());
      const result = await service.getLearningPathAnalytics(schoolId, learningPathId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch learning path analytics');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getLearningPathAnalytics, loading, error };
};

export const useLxpAnalyticsQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getQuizAnalytics = useCallback(async (schoolId: string, quizId: string): Promise<QuizAnalytics | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAnalyticsService(createClient());
      const result = await service.getQuizAnalytics(schoolId, quizId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quiz analytics');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getQuizAnalytics, loading, error };
};

export const useLxpAnalyticsAssignment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAssignmentAnalytics = useCallback(async (schoolId: string, assignmentId: string): Promise<AssignmentAnalytics | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAnalyticsService(createClient());
      const result = await service.getAssignmentAnalytics(schoolId, assignmentId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch assignment analytics');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getAssignmentAnalytics, loading, error };
};

export const useLxpAnalyticsProgressReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProgressReport = useCallback(async (schoolId: string, userId: string): Promise<ProgressReport | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpAnalyticsService(createClient());
      const result = await service.getProgressReport(schoolId, userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch progress report');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getProgressReport, loading, error };
};
