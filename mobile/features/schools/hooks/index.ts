'use client';

import { useState, useCallback } from 'react';
import type { School, SchoolCreationRequest, SchoolUpdateRequest, SchoolSettings, SchoolStatistics } from '@educi/types';
import { createMobileSchoolRepository } from '../repositories';
import { MobileSchoolService } from '../services';
import { logger } from '@educi/logger';

function createMobileSchoolService() {
  const repo = createMobileSchoolRepository();
  return new MobileSchoolService(repo);
}

export function useMobileSchool() {
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createMobileSchoolService())[0];

  const fetchSchool = useCallback(async (schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceRef.getSchool(schoolId);
      setSchool(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors du chargement';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const createSchool = useCallback(async (data: SchoolCreationRequest): Promise<School> => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceRef.createSchool(data);
      setSchool(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la création';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const updateSchool = useCallback(async (id: string, data: SchoolUpdateRequest): Promise<School> => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceRef.updateSchool(id, data);
      setSchool(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la mise à jour';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const uploadLogo = useCallback(async (schoolId: string, fileUri: string, fileName: string, mimeType: string): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      const url = await serviceRef.uploadLogo(schoolId, fileUri, fileName, mimeType);
      setSchool((prev) => (prev ? { ...prev, logoUrl: url } : prev));
      return url;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de l\'upload';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const getStatistics = useCallback(async (schoolId: string): Promise<SchoolStatistics> => {
    return serviceRef.getStatistics(schoolId);
  }, [serviceRef]);

  return {
    school,
    loading,
    error,
    fetchSchool,
    createSchool,
    updateSchool,
    uploadLogo,
    getStatistics,
  };
}

export function useMobileSchoolSettings(schoolId?: string) {
  const [settings, setSettings] = useState<SchoolSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createMobileSchoolService())[0];

  const fetchSettings = useCallback(async (id?: string) => {
    const targetId = id || schoolId;
    if (!targetId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await serviceRef.getSettings(targetId);
      setSettings(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors du chargement';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId, serviceRef]);

  const updateSettings = useCallback(async (data: Partial<SchoolSettings>) => {
    if (!schoolId) return;
    setLoading(true);
    setError(null);
    try {
      await serviceRef.updateSettings(schoolId, data);
      const updated = await serviceRef.getSettings(schoolId);
      setSettings(updated);
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la mise à jour';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId, serviceRef]);

  return {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings,
  };
}
