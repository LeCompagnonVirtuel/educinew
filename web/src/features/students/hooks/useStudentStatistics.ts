'use client';

import { useState, useCallback } from 'react';
import type { StudentStatistics, StudentDashboard } from '../types';
import { createStudentRepository } from '../repositories';
import { StatisticsService } from '../services';

function createStatisticsService() {
  const repo = createStudentRepository();
  return new StatisticsService(repo);
}

export function useStudentStatistics() {
  const [statistics, setStatistics] = useState<StudentStatistics | null>(null);
  const [dashboard, setDashboard] = useState<StudentDashboard | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createStatisticsService())[0];

  const fetchStatistics = useCallback(async (schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceRef.getStatistics(schoolId);
      setStatistics(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur chargement';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const fetchDashboard = useCallback(async (schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceRef.getDashboard(schoolId);
      setDashboard(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur chargement';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return { statistics, dashboard, loading, error, fetchStatistics, fetchDashboard };
}
