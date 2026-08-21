'use client';

import { useState, useCallback } from 'react';
import { createStudentRepository } from '../repositories';
import { PhotoService, AuditStudentService } from '../services';

function createPhotoService() {
  const repo = createStudentRepository();
  const auditService = new AuditStudentService();
  return new PhotoService(repo, auditService);
}

export function useStudentPhoto() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createPhotoService())[0];

  const uploadPhoto = useCallback(async (studentId: string, file: File): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      return await serviceRef.uploadPhoto(studentId, file);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur upload';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return { uploadPhoto, loading, error };
}
