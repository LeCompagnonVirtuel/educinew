import type { MobileSchoolRepository } from '../repositories';
import type { School, SchoolCreationRequest, SchoolUpdateRequest, SchoolStatistics, SchoolSettings, SchoolPlan, SchoolLimits } from '@educi/types';
import { SchoolPlanLimits } from '@educi/types';
import { logger } from '@educi/logger';

export class MobileSchoolService {
  constructor(private readonly schoolRepo: MobileSchoolRepository) {}

  async getSchool(schoolId: string): Promise<School | null> {
    return this.schoolRepo.findBySchoolId(schoolId);
  }

  async getAllSchools(filters?: { search?: string; page?: number; limit?: number }) {
    return this.schoolRepo.findAll(filters);
  }

  async createSchool(data: SchoolCreationRequest): Promise<School> {
    if (!data.name || data.name.trim().length < 2) {
      throw new Error('Le nom doit contenir au moins 2 caractères');
    }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new Error('Email invalide');
    }

    const school = await this.schoolRepo.create(data);
    logger.info('Mobile: School created', { schoolId: school.id }, 'schools');
    return school;
  }

  async updateSchool(id: string, data: SchoolUpdateRequest): Promise<School> {
    return this.schoolRepo.update(id, data);
  }

  async archiveSchool(id: string): Promise<void> {
    await this.schoolRepo.archive(id);
    logger.info('Mobile: School archived', { schoolId: id }, 'schools');
  }

  async restoreSchool(id: string): Promise<void> {
    await this.schoolRepo.restore(id);
    logger.info('Mobile: School restored', { schoolId: id }, 'schools');
  }

  async uploadLogo(schoolId: string, fileUri: string, fileName: string, mimeType: string): Promise<string> {
    if (!['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(mimeType)) {
      throw new Error('Format non supporté. Utilisez PNG, JPEG ou WebP');
    }
    return this.schoolRepo.uploadLogo(schoolId, fileUri, fileName, mimeType);
  }

  async getSettings(schoolId: string): Promise<SchoolSettings | null> {
    return this.schoolRepo.getSettings(schoolId);
  }

  async updateSettings(schoolId: string, settings: Partial<SchoolSettings>): Promise<void> {
    await this.schoolRepo.updateSettings(schoolId, settings);
  }

  async getStatistics(schoolId: string): Promise<SchoolStatistics> {
    return this.schoolRepo.getStatistics(schoolId);
  }

  getLimits(plan: SchoolPlan): SchoolLimits {
    return SchoolPlanLimits[plan] || SchoolPlanLimits.FREE;
  }
}
