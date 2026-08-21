'use client';

import { useState, useCallback } from 'react';
import type { School, SchoolCreationRequest } from '@educi/types';
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

export function useCreateSchool() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createSchoolService())[0];

  const createSchool = useCallback(async (data: SchoolCreationRequest): Promise<School> => {
    setLoading(true);
    setError(null);
    try {
      const school = await serviceRef.create(data);
      logger.info('School created via hook', { schoolId: school.id }, 'schools');
      return school;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la création de l\'établissement';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return {
    createSchool,
    loading,
    error,
  };
}
