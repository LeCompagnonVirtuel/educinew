'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScMedicalCertificateService } from '../services/sc-medical-certificate.service';
import { createClient } from '@/lib/supabase/client';
import type { MedicalCertificate, MedicalCertificateCreate } from '@educi/types';

export const useScMedicalCertificateList = (schoolId: string) => {
  const [items, setItems] = useState<MedicalCertificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScMedicalCertificateService(createClient());
      const data = await service.listCertificates(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return { items, loading, error, refresh: fetchData };
};

export const useScMedicalCertificateGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<MedicalCertificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScMedicalCertificateService(createClient());
      const data = await service.getCertificate(schoolId, id);
      setItem(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);
  useEffect(() => { fetchItem(); }, [fetchItem]);
  return { item, loading, error, refresh: fetchItem };
};

export const useScMedicalCertificateCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: MedicalCertificateCreate): Promise<MedicalCertificate | null> => {
    try {
      setLoading(true);
      const service = new ScMedicalCertificateService(createClient());
      const result = await service.createCertificate(schoolId, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { create, loading, error };
};

export const useScMedicalCertificateUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: Partial<MedicalCertificateCreate>): Promise<MedicalCertificate | null> => {
    try {
      setLoading(true);
      const service = new ScMedicalCertificateService(createClient());
      const result = await service.updateCertificate(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { update, loading, error };
};

export const useScMedicalCertificateDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScMedicalCertificateService(createClient());
      await service.deleteCertificate(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { remove, loading, error };
};
