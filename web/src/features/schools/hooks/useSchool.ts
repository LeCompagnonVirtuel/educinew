'use client';

import { useState, useCallback } from 'react';
import type { School } from '@educi/types';
import { createSchoolRepository } from '../repositories';
import { SchoolService, AuditSchoolService, SlugService, LogoService, SettingsService, ValidationService } from '../services';
import { logger } from '@educi/logger';

function createSchoolService() {
  const schoolRepo = createSchoolRepository();
  const auditService = new AuditSchoolService();
  const slugService = new SlugService();
  const logoService = new LogoService();
  const settingsService = new SettingsService(schoolRepo);
  const validationService = new ValidationService();

  return new SchoolService(
    schoolRepo,
    auditService,
    slugService,
    logoService,
    settingsService,
    validationService,
  );
}

export function useSchool(schoolId?: string) {
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createSchoolService())[0];

  const fetchSchool = useCallback(async (id?: string) => {
    const targetId = id || schoolId;
    if (!targetId) return;

    setLoading(true);
    setError(null);
    try {
      const data = await serviceRef.findById(targetId);
      setSchool(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Établissement introuvable';
      setError(message);
      logger.error('Failed to fetch school', { schoolId: targetId, error: message }, 'schools');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId, serviceRef]);

  const updateSchool = useCallback(async (data: Parameters<SchoolService['update']>[1]) => {
    if (!schoolId) return;
    setLoading(true);
    setError(null);
    try {
      const updated = await serviceRef.update(schoolId, data);
      setSchool(updated);
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la mise à jour';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId, serviceRef]);

  const uploadLogo = useCallback(async (file: File) => {
    if (!schoolId) return;
    setLoading(true);
    setError(null);
    try {
      const url = await serviceRef.uploadLogo(schoolId, file);
      setSchool((prev) => (prev ? { ...prev, logoUrl: url } : prev));
      return url;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de l\'upload du logo';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId, serviceRef]);

  return {
    school,
    loading,
    error,
    fetchSchool,
    updateSchool,
    uploadLogo,
  };
}
