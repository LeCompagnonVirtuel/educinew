'use client';

import { useState, useCallback } from 'react';
import { createStudentRepository } from '../repositories';
import { QRCodeService, AuditStudentService } from '../services';

function createQRCodeService() {
  const repo = createStudentRepository();
  const auditService = new AuditStudentService();
  return new QRCodeService(repo, auditService);
}

export function useStudentQRCode() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createQRCodeService())[0];

  const generateQR = useCallback(async (studentId: string, type?: 'ATTENDANCE' | 'IDENTITY' | 'PAYMENT' | 'GENERAL'): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      return await serviceRef.generate(studentId, type);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur QR Code';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return { generateQR, loading, error };
}
