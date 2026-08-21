'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpCertificateService } from '../services/lxp-certificate.service';
import type { Certificate, CertificateCreate } from '@educi/types';
import type { CertificateQuery } from '../types';

export const useLxpCertificates = (schoolId: string, userId: string) => {
  const [certificates, setCertificates] = useState<readonly Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCertificateService(createClient());
      const data = await service.listCertificates(schoolId, userId);
      setCertificates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch certificates');
    } finally {
      setLoading(false);
    }
  }, [schoolId, userId]);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  return { certificates, loading, error, refresh: fetchCertificates };
};

export const useLxpCertificate = (schoolId: string, id: string | null) => {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificate = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCertificateService(createClient());
      const data = await service.getCertificate(schoolId, id);
      setCertificate(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch certificate');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchCertificate();
  }, [fetchCertificate]);

  return { certificate, loading, error, refresh: fetchCertificate };
};

export const useLxpCertificateCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CertificateCreate): Promise<Certificate | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCertificateService(createClient());
      const result = await service.createCertificate(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create certificate');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpCertificateRevoke = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const revoke = useCallback(async (schoolId: string, id: string): Promise<Certificate | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCertificateService(createClient());
      const result = await service.revokeCertificate(schoolId, id);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to revoke certificate');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { revoke, loading, error };
};

export const useLxpCertificateVerify = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verify = useCallback(async (verificationCode: string): Promise<Certificate | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpCertificateService(createClient());
      const result = await service.verifyCertificate(verificationCode);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify certificate');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { verify, loading, error };
};
