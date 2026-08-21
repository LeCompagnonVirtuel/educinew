'use client';

import { useState, useCallback } from 'react';
import type { SchoolFilters, SchoolListResult } from '../types';
import { createSchoolRepository } from '../repositories';
import { SchoolService, AuditSchoolService, SlugService, LogoService, SettingsService, ValidationService } from '../services';
import { SchoolNotFoundError } from '@educi/errors';
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

export function useSchools() {
  const [data, setData] = useState<SchoolListResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createSchoolService())[0];

  const fetchSchools = useCallback(async (filters?: SchoolFilters) => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceRef.findAll(filters || {});
      setData(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors du chargement des établissements';
      setError(message);
      logger.error('Failed to fetch schools', { error: message }, 'schools');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const fetchSchool = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const school = await serviceRef.findById(id);
      return school;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Établissement introuvable';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return {
    data,
    loading,
    error,
    fetchSchools,
    fetchSchool,
  };
}
