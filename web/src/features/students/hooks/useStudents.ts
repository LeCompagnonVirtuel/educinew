'use client';

import { useState, useCallback } from 'react';
import type { StudentFilters, StudentListResult, Student } from '../types';
import { createStudentRepository } from '../repositories';
import { StudentService, AuditStudentService, ValidationService } from '../services';

function createStudentService() {
  const repo = createStudentRepository();
  const auditService = new AuditStudentService();
  const validationService = new ValidationService();
  return new StudentService(repo, auditService, validationService);
}

export function useStudents() {
  const [data, setData] = useState<StudentListResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createStudentService())[0];

  const fetchStudents = useCallback(async (schoolId: string, filters?: StudentFilters) => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceRef.findAll(schoolId, filters || {});
      setData(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur chargement';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return { data, loading, error, fetchStudents };
}
