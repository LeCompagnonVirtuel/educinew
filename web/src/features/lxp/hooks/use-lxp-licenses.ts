'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpLicenseService } from '../services/lxp-license.service';
import type { License } from '@educi/types';
import type { LicenseQuery } from '../types';

export const useLxpLicenses = (schoolId: string, courseId: string) => {
  const [licenses, setLicenses] = useState<readonly License[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLicenses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLicenseService(createClient());
      const data = await service.listLicenses(schoolId, courseId);
      setLicenses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch licenses');
    } finally {
      setLoading(false);
    }
  }, [schoolId, courseId]);

  useEffect(() => {
    fetchLicenses();
  }, [fetchLicenses]);

  return { licenses, loading, error, refresh: fetchLicenses };
};

export const useLxpLicense = (schoolId: string, id: string | null) => {
  const [license, setLicense] = useState<License | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLicense = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLicenseService(createClient());
      const data = await service.getLicense(schoolId, id);
      setLicense(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch license');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);

  useEffect(() => {
    fetchLicense();
  }, [fetchLicense]);

  return { license, loading, error, refresh: fetchLicense };
};

export const useLxpLicenseCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<License, 'id' | 'createdAt' | 'updatedAt'>): Promise<License | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLicenseService(createClient());
      const result = await service.createLicense(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create license');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
};

export const useLxpLicenseValidate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback(async (licenseKey: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLicenseService(createClient());
      const result = await service.validateLicense(licenseKey);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to validate license');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { validate, loading, error };
};

export const useLxpLicenseDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (schoolId: string, id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpLicenseService(createClient());
      await service.deleteLicense(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete license');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
};
