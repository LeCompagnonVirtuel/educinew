'use client';

import { useState, useEffect, useCallback } from 'react';
import type { StudentAssistant, StudyPlan, Quiz, Exercise, Flashcard, Achievement, Leaderboard } from '@educi/types';

export function useStudentAssistant(studentId: string) {
  const [data, setData] = useState<StudentAssistant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssistant = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/student-assistant?studentId=${studentId}`);
      if (!res.ok) throw new Error('Failed to fetch student assistant');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => { fetchAssistant(); }, [fetchAssistant]);

  return { data, loading, error, refetch: fetchAssistant };
}

export function useStudyPlan(studentId: string) {
  const [data, setData] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudyPlan = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/student-assistant/study-plan?studentId=${studentId}`);
      if (!res.ok) throw new Error('Failed to fetch study plan');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => { fetchStudyPlan(); }, [fetchStudyPlan]);

  return { data, loading, error, refetch: fetchStudyPlan };
}

export function useQuiz(studentId: string, subject: string) {
  const [data, setData] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuiz = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/student-assistant/quiz?studentId=${studentId}&subject=${encodeURIComponent(subject)}`);
      if (!res.ok) throw new Error('Failed to fetch quiz');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [studentId, subject]);

  useEffect(() => { fetchQuiz(); }, [fetchQuiz]);

  return { data, loading, error, refetch: fetchQuiz };
}

export function useExercises(studentId: string, topic: string) {
  const [data, setData] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExercises = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/student-assistant/exercises?studentId=${studentId}&topic=${encodeURIComponent(topic)}`);
      if (!res.ok) throw new Error('Failed to fetch exercises');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [studentId, topic]);

  useEffect(() => { fetchExercises(); }, [fetchExercises]);

  return { data, loading, error, refetch: fetchExercises };
}

export function useFlashcards(studentId: string) {
  const [data, setData] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFlashcards = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/student-assistant/flashcards?studentId=${studentId}`);
      if (!res.ok) throw new Error('Failed to fetch flashcards');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => { fetchFlashcards(); }, [fetchFlashcards]);

  return { data, loading, error, refetch: fetchFlashcards };
}

export function useProgress(studentId: string) {
  const [data, setData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/student-assistant/progress?studentId=${studentId}`);
      if (!res.ok) throw new Error('Failed to fetch progress');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => { fetchProgress(); }, [fetchProgress]);

  return { data, loading, error, refetch: fetchProgress };
}

export function useAchievements(studentId: string) {
  const [data, setData] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAchievements = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/student-assistant/achievements?studentId=${studentId}`);
      if (!res.ok) throw new Error('Failed to fetch achievements');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => { fetchAchievements(); }, [fetchAchievements]);

  return { data, loading, error, refetch: fetchAchievements };
}

export function useLeaderboard(schoolId: string) {
  const [data, setData] = useState<Leaderboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/student-assistant/leaderboard?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch leaderboard');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);

  return { data, loading, error, refetch: fetchLeaderboard };
}

export function useHints(studentId: string, questionId: string) {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHints = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/student-assistant/hints?studentId=${studentId}&questionId=${questionId}`);
      if (!res.ok) throw new Error('Failed to fetch hints');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [studentId, questionId]);

  useEffect(() => { fetchHints(); }, [fetchHints]);

  return { data, loading, error, refetch: fetchHints };
}

export function useStudyGoals(studentId: string) {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/student-assistant/goals?studentId=${studentId}`);
      if (!res.ok) throw new Error('Failed to fetch study goals');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => { fetchGoals(); }, [fetchGoals]);

  return { data, loading, error, refetch: fetchGoals };
}
