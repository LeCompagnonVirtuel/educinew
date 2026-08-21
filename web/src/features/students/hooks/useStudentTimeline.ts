'use client';

import { useState, useCallback } from 'react';
import type { StudentTimeline } from '../types';
import { createStudentRepository } from '../repositories';
import { TimelineService, AuditStudentService } from '../services';

function createTimelineService() {
  const repo = createStudentRepository();
  const auditService = new AuditStudentService();
  return new TimelineService(repo, auditService);
}

export function useStudentTimeline() {
  const [timeline, setTimeline] = useState<StudentTimeline[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createTimelineService())[0];

  const fetchTimeline = useCallback(async (studentId: string, limit?: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceRef.getTimeline(studentId, limit);
      setTimeline(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur chargement';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return { timeline, loading, error, fetchTimeline };
}
