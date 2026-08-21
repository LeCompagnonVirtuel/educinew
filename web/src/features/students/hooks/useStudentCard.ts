'use client';

import { useState, useCallback } from 'react';
import { createStudentRepository } from '../repositories';
import { StudentCardService, AuditStudentService } from '../services';

function createCardService() {
  const repo = createStudentRepository();
  const auditService = new AuditStudentService();
  return new StudentCardService(repo, auditService);
}

export function useStudentCard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createCardService())[0];

  const generateCard = useCallback(async (studentId: string): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      return await serviceRef.generate(studentId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur carte';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return { generateCard, loading, error };
}
