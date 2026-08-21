'use client';

import { useState, useCallback } from 'react';
import type { StudentGuardian } from '../types';
import { createStudentRepository } from '../repositories';
import { GuardianService, AuditStudentService } from '../services';

function createGuardianService() {
  const repo = createStudentRepository();
  const auditService = new AuditStudentService();
  return new GuardianService(repo, auditService);
}

export function useStudentGuardian() {
  const [guardians, setGuardians] = useState<StudentGuardian[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createGuardianService())[0];

  const fetchGuardians = useCallback(async (studentId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceRef.getGuardians(studentId);
      setGuardians(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur chargement';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const addGuardian = useCallback(async (studentId: string, guardian: Omit<StudentGuardian, 'id' | 'studentId'>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceRef.addGuardian(studentId, guardian);
      setGuardians((prev) => [...prev, result]);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur ajout';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const removeGuardian = useCallback(async (guardianId: string) => {
    setLoading(true);
    setError(null);
    try {
      await serviceRef.removeGuardian(guardianId);
      setGuardians((prev) => prev.filter((g) => g.id !== guardianId));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur suppression';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return { guardians, loading, error, fetchGuardians, addGuardian, removeGuardian };
}
