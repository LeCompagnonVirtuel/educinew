'use client';

import { useState, useEffect, useCallback } from 'react';
import type { TeacherAssistant, LessonPlan, Assessment, Rubric, Feedback, Correction } from '@educi/types';

export function useTeacherAssistant(teacherId: string) {
  const [data, setData] = useState<TeacherAssistant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssistant = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/teacher-assistant?teacherId=${teacherId}`);
      if (!res.ok) throw new Error('Failed to fetch teacher assistant');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [teacherId]);

  useEffect(() => { fetchAssistant(); }, [fetchAssistant]);

  return { data, loading, error, refetch: fetchAssistant };
}

export function useLessonPlan(teacherId: string, subject: string) {
  const [data, setData] = useState<LessonPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLessonPlan = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/teacher-assistant/lesson-plan?teacherId=${teacherId}&subject=${encodeURIComponent(subject)}`);
      if (!res.ok) throw new Error('Failed to fetch lesson plan');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [teacherId, subject]);

  useEffect(() => { fetchLessonPlan(); }, [fetchLessonPlan]);

  return { data, loading, error, refetch: fetchLessonPlan };
}

export function useAssessment(teacherId: string, classId: string) {
  const [data, setData] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssessment = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/teacher-assistant/assessment?teacherId=${teacherId}&classId=${classId}`);
      if (!res.ok) throw new Error('Failed to fetch assessment');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [teacherId, classId]);

  useEffect(() => { fetchAssessment(); }, [fetchAssessment]);

  return { data, loading, error, refetch: fetchAssessment };
}

export function useRubric(teacherId: string, assignmentId: string) {
  const [data, setData] = useState<Rubric | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRubric = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/teacher-assistant/rubric?teacherId=${teacherId}&assignmentId=${assignmentId}`);
      if (!res.ok) throw new Error('Failed to fetch rubric');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [teacherId, assignmentId]);

  useEffect(() => { fetchRubric(); }, [fetchRubric]);

  return { data, loading, error, refetch: fetchRubric };
}

export function useFeedback(teacherId: string, studentId: string) {
  const [data, setData] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedback = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/teacher-assistant/feedback?teacherId=${teacherId}&studentId=${studentId}`);
      if (!res.ok) throw new Error('Failed to fetch feedback');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [teacherId, studentId]);

  useEffect(() => { fetchFeedback(); }, [fetchFeedback]);

  return { data, loading, error, refetch: fetchFeedback };
}

export function useCorrection(teacherId: string, submissionId: string) {
  const [data, setData] = useState<Correction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCorrection = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/teacher-assistant/correction?teacherId=${teacherId}&submissionId=${submissionId}`);
      if (!res.ok) throw new Error('Failed to fetch correction');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [teacherId, submissionId]);

  useEffect(() => { fetchCorrection(); }, [fetchCorrection]);

  return { data, loading, error, refetch: fetchCorrection };
}

export function useClassAnalytics(teacherId: string, classId: string) {
  const [data, setData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/teacher-assistant/class-analytics?teacherId=${teacherId}&classId=${classId}`);
      if (!res.ok) throw new Error('Failed to fetch class analytics');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [teacherId, classId]);

  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

  return { data, loading, error, refetch: fetchAnalytics };
}

export function useIndividualAnalytics(teacherId: string, studentId: string) {
  const [data, setData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/teacher-assistant/individual-analytics?teacherId=${teacherId}&studentId=${studentId}`);
      if (!res.ok) throw new Error('Failed to fetch individual analytics');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [teacherId, studentId]);

  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

  return { data, loading, error, refetch: fetchAnalytics };
}

export function useMeeting(teacherId: string, meetingId: string) {
  const [data, setData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeeting = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/teacher-assistant/meeting?teacherId=${teacherId}&meetingId=${meetingId}`);
      if (!res.ok) throw new Error('Failed to fetch meeting');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [teacherId, meetingId]);

  useEffect(() => { fetchMeeting(); }, [fetchMeeting]);

  return { data, loading, error, refetch: fetchMeeting };
}

export function useReport(teacherId: string, reportType: string) {
  const [data, setData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/teacher-assistant/report?teacherId=${teacherId}&type=${encodeURIComponent(reportType)}`);
      if (!res.ok) throw new Error('Failed to fetch report');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [teacherId, reportType]);

  useEffect(() => { fetchReport(); }, [fetchReport]);

  return { data, loading, error, refetch: fetchReport };
}
