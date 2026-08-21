'use client';

import { useState, useCallback } from 'react';
import type { Student, UpdateStudentRequest } from '../types';
import { createStudentRepository } from '../repositories';
import { StudentService, AuditStudentService, ValidationService } from '../services';

function createStudentService() {
  const repo = createStudentRepository();
  const auditService = new AuditStudentService();
  const validationService = new ValidationService();
  return new StudentService(repo, auditService, validationService);
}

export function useUpdateStudent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createStudentService())[0];

  const updateStudent = useCallback(async (id: string, data: UpdateStudentRequest): Promise<Student> => {
    setLoading(true);
    setError(null);
    try {
      return await serviceRef.update(id, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur mise à jour';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return { updateStudent, loading, error };
}
