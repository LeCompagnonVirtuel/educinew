'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Curriculum, LearningObjective, ScopeSequence, LessonPlanTemplate, AssessmentAlignment, ResourceRecommendation, CompetencyFramework, GapAnalysis } from '@educi/types';

export function useCurriculum(schoolId: string) {
  const [data, setData] = useState<Curriculum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurriculum = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/curriculum?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch curriculum');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchCurriculum(); }, [fetchCurriculum]);

  return { data, loading, error, refetch: fetchCurriculum };
}

export function useLearningObjective(curriculumId: string) {
  const [data, setData] = useState<LearningObjective[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchObjectives = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/curriculum/learning-objectives?curriculumId=${curriculumId}`);
      if (!res.ok) throw new Error('Failed to fetch learning objectives');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [curriculumId]);

  useEffect(() => { fetchObjectives(); }, [fetchObjectives]);

  return { data, loading, error, refetch: fetchObjectives };
}

export function useScopeSequence(schoolId: string, subject: string) {
  const [data, setData] = useState<ScopeSequence | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScope = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/curriculum/scope-sequence?schoolId=${schoolId}&subject=${encodeURIComponent(subject)}`);
      if (!res.ok) throw new Error('Failed to fetch scope and sequence');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId, subject]);

  useEffect(() => { fetchScope(); }, [fetchScope]);

  return { data, loading, error, refetch: fetchScope };
}

export function useLessonPlanTemplate(schoolId: string) {
  const [data, setData] = useState<LessonPlanTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/curriculum/lesson-plan-templates?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch lesson plan templates');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchTemplates(); }, [fetchTemplates]);

  return { data, loading, error, refetch: fetchTemplates };
}

export function useAssessmentAlignment(schoolId: string, subject: string) {
  const [data, setData] = useState<AssessmentAlignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlignment = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/curriculum/assessment-alignment?schoolId=${schoolId}&subject=${encodeURIComponent(subject)}`);
      if (!res.ok) throw new Error('Failed to fetch assessment alignment');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId, subject]);

  useEffect(() => { fetchAlignment(); }, [fetchAlignment]);

  return { data, loading, error, refetch: fetchAlignment };
}

export function useResourceRecommendation(subject: string, grade: string) {
  const [data, setData] = useState<ResourceRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResources = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/curriculum/resource-recommendation?subject=${encodeURIComponent(subject)}&grade=${encodeURIComponent(grade)}`);
      if (!res.ok) throw new Error('Failed to fetch resource recommendations');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [subject, grade]);

  useEffect(() => { fetchResources(); }, [fetchResources]);

  return { data, loading, error, refetch: fetchResources };
}

export function useCompetencyFramework(schoolId: string) {
  const [data, setData] = useState<CompetencyFramework[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFrameworks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/curriculum/competency-framework?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch competency frameworks');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchFrameworks(); }, [fetchFrameworks]);

  return { data, loading, error, refetch: fetchFrameworks };
}

export function useGapAnalysis(schoolId: string, subject: string) {
  const [data, setData] = useState<GapAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysis = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/curriculum/gap-analysis?schoolId=${schoolId}&subject=${encodeURIComponent(subject)}`);
      if (!res.ok) throw new Error('Failed to fetch gap analysis');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId, subject]);

  useEffect(() => { fetchAnalysis(); }, [fetchAnalysis]);

  return { data, loading, error, refetch: fetchAnalysis };
}
