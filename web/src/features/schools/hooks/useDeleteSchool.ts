'use client';

import { useState, useCallback } from 'react';
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

export function useDeleteSchool() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useState(createSchoolService())[0];

  const archiveSchool = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await serviceRef.archive(id);
      logger.info('School archived via hook', { schoolId: id }, 'schools');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de l\'archivage';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const deleteSchool = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await serviceRef.delete(id);
      logger.info('School deleted via hook', { schoolId: id }, 'schools');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la suppression';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  const restoreSchool = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await serviceRef.restore(id);
      logger.info('School restored via hook', { schoolId: id }, 'schools');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la restauration';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceRef]);

  return {
    archiveSchool,
    deleteSchool,
    restoreSchool,
    loading,
    error,
  };
}
