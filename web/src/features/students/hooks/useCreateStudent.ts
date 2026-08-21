'use client';

import { useState, useCallback } from 'react';
import type { Student, CreateStudentRequest } from '../types';
import { createStudentRepository } from '../repositories';
import { StudentService, AuditStudentService, ValidationService } from '../services';

function createStudentService() {
  const repo = createStudentRepository();
  const auditService = new AuditStudentService();
  const validationService = new ValidationService();
  return new StudentService(repo, auditService, validationService);
}

export function useCreateStudent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createStudentService())[0];

  const createStudent = useCallback(async (data: CreateStudentRequest, schoolId: string): Promise<Student> => {
    setLoading(true);
    setError(null);
    try {
      return await serviceRef.create(data, schoolId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur création';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return { createStudent, loading, error };
}
