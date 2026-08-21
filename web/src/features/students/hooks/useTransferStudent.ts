'use client';

import { useState, useCallback } from 'react';
import type { StudentTransfer } from '../types';
import { createStudentRepository } from '../repositories';
import { TransferService, AuditStudentService } from '../services';

function createTransferService() {
  const repo = createStudentRepository();
  const auditService = new AuditStudentService();
  return new TransferService(repo, auditService);
}

export function useTransferStudent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createTransferService())[0];

  const transferStudent = useCallback(async (studentId: string, data: Omit<StudentTransfer, 'id' | 'studentId'>) => {
    setLoading(true);
    setError(null);
    try {
      return await serviceRef.transfer(studentId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur transfert';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return { transferStudent, loading, error };
}
