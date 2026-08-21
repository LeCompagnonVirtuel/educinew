'use client';

import { useState, useCallback } from 'react';
import type { StudentPromotion } from '../types';
import { createStudentRepository } from '../repositories';
import { PromotionService, AuditStudentService } from '../services';

function createPromotionService() {
  const repo = createStudentRepository();
  const auditService = new AuditStudentService();
  return new PromotionService(repo, auditService);
}

export function usePromotion() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createPromotionService())[0];

  const promote = useCallback(async (studentId: string, data: Omit<StudentPromotion, 'id' | 'studentId'>) => {
    setLoading(true);
    setError(null);
    try {
      return await serviceRef.promote(studentId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur promotion';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return { promote, loading, error };
}
