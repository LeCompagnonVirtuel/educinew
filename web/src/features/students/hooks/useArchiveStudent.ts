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

export function useArchiveStudent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createStudentService())[0];

  const archiveStudent = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await serviceRef.archive(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur archivage';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return { archiveStudent, loading, error };
}
