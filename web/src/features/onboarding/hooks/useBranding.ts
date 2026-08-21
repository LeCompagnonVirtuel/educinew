'use client';

import { useState, useCallback } from 'react';
import type { BrandingConfig, OnboardingData } from '../types';
import { BrandingService } from '../services';
import { logger } from '@educi/logger';

function createBrandingService() {
  return new BrandingService();
}

export function useBranding() {
  const [branding, setBranding] = useState<BrandingConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createBrandingService())[0];

  const buildBranding = useCallback((data: OnboardingData['branding']) => {
    const config = serviceRef.buildBrandingConfig(data);
    setBranding(config);
    return config;
  }, [serviceRef]);

  const uploadLogo = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const processed = await serviceRef.processLogo(file);
      return processed;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de l\'upload';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const getDefaultBranding = useCallback(() => {
    return serviceRef.getDefaultBranding();
  }, [serviceRef]);

  return {
    branding,
    loading,
    error,
    buildBranding,
    uploadLogo,
    getDefaultBranding,
  };
}
