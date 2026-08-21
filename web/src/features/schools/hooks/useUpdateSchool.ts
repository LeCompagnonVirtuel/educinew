'use client';

import { useState, useCallback } from 'react';
import type { School, SchoolUpdateRequest } from '@educi/types';
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

export function useUpdateSchool() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createSchoolService())[0];

  const updateSchool = useCallback(async (id: string, data: SchoolUpdateRequest): Promise<School> => {
    setLoading(true);
    setError(null);
    try {
      const school = await serviceRef.update(id, data);
      logger.info('School updated via hook', { schoolId: id }, 'schools');
      return school;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la mise à jour';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return {
    updateSchool,
    loading,
    error,
  };
}
