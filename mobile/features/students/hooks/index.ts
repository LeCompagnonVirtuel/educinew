'use client';

import { useState, useCallback } from 'react';
import type { Student, StudentFilters, CreateStudentRequest, UpdateStudentRequest } from '@educi/types';
import { createMobileStudentRepository } from '../repositories';
import { MobileStudentService } from '../services';

function createMobileStudentService() {
  const repo = createMobileStudentRepository();
  return new MobileStudentService(repo);
}

export function useMobileStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createMobileStudentService())[0];

  const fetchStudents = useCallback(async (schoolId: string, filters?: StudentFilters) => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceRef.getAllStudents(schoolId, filters);
      setStudents(result.data);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur chargement';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const createStudent = useCallback(async (data: CreateStudentRequest, schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceRef.createStudent(data, schoolId);
      setStudents((prev) => [result, ...prev]);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur création';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const searchStudents = useCallback(async (schoolId: string, query: string) => {
    return serviceRef.searchStudents(schoolId, query);
  }, [serviceRef]);

  return { students, loading, error, fetchStudents, createStudent, searchStudents };
}
