'use client';

import { useState, useCallback } from 'react';
import type { Student } from '../types';
import { createStudentRepository } from '../repositories';
import { StudentService, AuditStudentService, ValidationService } from '../services';
import { StudentNotFoundError } from '@educi/errors';

function createStudentService() {
  const repo = createStudentRepository();
  const auditService = new AuditStudentService();
  const validationService = new ValidationService();
  return new StudentService(repo, auditService, validationService);
}

export function useStudent(studentId?: string) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createStudentService())[0];

  const fetchStudent = useCallback(async (id?: string) => {
    const targetId = id || studentId;
    if (!targetId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await serviceRef.findById(targetId);
      setStudent(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Élève introuvable';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [studentId, serviceRef]);

  const updateStudent = useCallback(async (data: Parameters<StudentService['update']>[1]) => {
    if (!studentId) return;
    setLoading(true);
    setError(null);
    try {
      const updated = await serviceRef.update(studentId, data);
      setStudent(updated);
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur mise à jour';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [studentId, serviceRef]);

  return { student, loading, error, fetchStudent, updateStudent };
}
