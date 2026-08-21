'use client';

import { useState, useCallback } from 'react';
import type { SchoolSettings } from '@educi/types';
import { createSchoolRepository } from '../repositories';
import { SettingsService } from '../services';
import { SchoolService, AuditSchoolService, SlugService, LogoService, ValidationService } from '../services';
import { logger } from '@educi/logger';

function createSchoolService() {
  const schoolRepo = createSchoolRepository();
  const auditService = new AuditSchoolService();
  const slugService = new SlugService();
  const logoService = new LogoService();
  const settingsService = new SettingsService(schoolRepo);
  const validationService = new ValidationService();

  return {
    schoolService: new SchoolService(
      schoolRepo,
      auditService,
      slugService,
      logoService,
      settingsService,
      validationService,
    ),
    settingsService,
  };
}

export function useSchoolSettings(schoolId?: string) {
  const [settings, setSettings] = useState<SchoolSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { settingsService } = useState(createSchoolService())[0];

  const fetchSettings = useCallback(async (id?: string) => {
    const targetId = id || schoolId;
    if (!targetId) return;

    setLoading(true);
    setError(null);
    try {
      const data = await settingsService.getSettings(targetId);
      setSettings(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors du chargement des paramètres';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId, settingsService]);

  const updateSettings = useCallback(async (data: Partial<SchoolSettings>) => {
    if (!schoolId) return;
    setLoading(true);
    setError(null);
    try {
      await settingsService.updateSettings(schoolId, data);
      const updated = await settingsService.getSettings(schoolId);
      setSettings(updated);
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la mise à jour';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId, settingsService]);

  return {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings,
  };
}
