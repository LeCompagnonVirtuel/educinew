import type { SchoolSettings } from '@educi/types';
import type { SchoolRepository } from '../types';
import { SchoolNotFoundError } from '@educi/errors';
import { logger } from '@educi/logger';

const DEFAULT_SETTINGS: SchoolSettings = {
  language: 'fr',
  timezone: 'Africa/Abidjan',
  currency: 'XOF',
  dateFormat: 'DD/MM/YYYY',
  gradingSystem: '20',
  passingGrade: 10,
  academicYear: '2025-2026',
  checkinRadius: 100,
  notifications: {},
  paymentSettings: {},
  academicSettings: {},
};

export class SettingsService {
  constructor(private readonly schoolRepo: SchoolRepository) {}

  async getSettings(schoolId: string): Promise<SchoolSettings> {
    const settings = await this.schoolRepo.getSettings(schoolId);
    if (!settings) {
      logger.warn('School settings not found, returning defaults', { schoolId }, 'schools');
      return DEFAULT_SETTINGS;
    }
    return { ...DEFAULT_SETTINGS, ...settings };
  }

  async updateSettings(schoolId: string, settings: Partial<SchoolSettings>): Promise<void> {
    const existing = await this.schoolRepo.findById(schoolId);
    if (!existing) throw new SchoolNotFoundError(schoolId);

    await this.schoolRepo.updateSettings(schoolId, settings);
    logger.info('School settings updated', { schoolId, fields: Object.keys(settings) }, 'schools');
  }

  getDefaultSettings(): SchoolSettings {
    return { ...DEFAULT_SETTINGS };
  }
}
