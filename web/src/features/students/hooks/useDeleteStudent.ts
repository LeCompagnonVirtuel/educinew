'use client';

import { useState, useCallback } from 'react';
import { createStudentRepository } from '../repositories';
import { StudentService, AuditStudentService, ValidationService } from '../services';

function createStudentService() {
  const repo = createStudentRepository();
  const auditService = new AuditStudentService();
  const validationService = new ValidationService();
  return new StudentService(repo, auditService, validationService);
}

export function useDeleteStudent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createStudentService())[0];

  const deleteStudent = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await serviceRef.delete(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur suppression';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return { deleteStudent, loading, error };
}
