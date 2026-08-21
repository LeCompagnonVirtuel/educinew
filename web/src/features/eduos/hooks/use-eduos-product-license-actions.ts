'use client';

import { useState, useCallback } from 'react';
import { EduOSProductLicenseService } from '../services/eduos-product-license.service';
import { createClient } from '@/lib/supabase/client';
import type { ProductLicense } from '@educi/types';

export const useEduOSProductLicenseActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<ProductLicense>): Promise<ProductLicense | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSProductLicenseService(supabase);
      return await service.createProductLicense(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProductLicense>): Promise<ProductLicense | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSProductLicenseService(supabase);
      return await service.updateProductLicense(schoolId, id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSProductLicenseService(supabase);
      await service.deleteProductLicense(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};
