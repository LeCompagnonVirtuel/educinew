'use client';

import { useState, useCallback } from 'react';
import type { StudentMedicalRecord } from '../types';
import { createStudentRepository } from '../repositories';
import { MedicalService, AuditStudentService } from '../services';

function createMedicalService() {
  const repo = createStudentRepository();
  const auditService = new AuditStudentService();
  return new MedicalService(repo, auditService);
}

export function useStudentMedical() {
  const [medical, setMedical] = useState<StudentMedicalRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createMedicalService())[0];

  const fetchMedical = useCallback(async (studentId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceRef.getMedicalRecord(studentId);
      setMedical(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur chargement';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const updateMedical = useCallback(async (studentId: string, data: Partial<StudentMedicalRecord>) => {
    setLoading(true);
    setError(null);
    try {
      await serviceRef.updateMedicalRecord(studentId, data);
      const updated = await serviceRef.getMedicalRecord(studentId);
      setMedical(updated);
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur mise à jour';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return { medical, loading, error, fetchMedical, updateMedical };
}
