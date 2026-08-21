import type { SchoolRepository } from '../types';
import type { School, SchoolCreationRequest, SchoolUpdateRequest, SchoolPlan, SchoolLimits } from '@educi/types';
import { SchoolPlanLimits } from '@educi/types';
import { SchoolNotFoundError, SchoolSlugConflictError, SchoolPlanUpgradeRequiredError, SchoolLimitExceededError } from '@educi/errors';
import { logger } from '@educi/logger';
import { AuditSchoolService } from './audit-school.service';
import { SlugService } from './slug.service';
import { LogoService } from './logo.service';
import { SettingsService } from './settings.service';
import { ValidationService } from './validation.service';

export class SchoolService {
  constructor(
    private readonly schoolRepo: SchoolRepository,
    private readonly auditService: AuditSchoolService,
    private readonly slugService: SlugService,
    private readonly logoService: LogoService,
    private readonly settingsService: SettingsService,
    private readonly validationService: ValidationService,
  ) {}

  async create(data: SchoolCreationRequest, userId?: string): Promise<School> {
    this.validationService.validateSchoolCreation(data);

    const exists = await this.schoolRepo.exists({ email: data.email, name: data.name });
    if (exists) {
      throw new SchoolSlugConflictError(this.slugService.generate(data.name));
    }

    const school = await this.schoolRepo.create(data);

    await this.auditService.log({
      action: 'SCHOOL_CREATE',
      entity: 'school',
      schoolId: school.id,
      userId,
      details: { name: school.name, email: school.email, plan: data.plan || 'FREE' },
    });

    logger.info('School created', { schoolId: school.id, name: school.name }, 'schools');
    return school;
  }

  async update(id: string, data: SchoolUpdateRequest, userId?: string): Promise<School> {
    const existing = await this.schoolRepo.findById(id);
    if (!existing) throw new SchoolNotFoundError(id);

    this.validationService.validateSchoolUpdate(data);

    const school = await this.schoolRepo.update(id, data);

    await this.auditService.log({
      action: 'SCHOOL_UPDATE',
      entity: 'school',
      schoolId: id,
      userId,
      details: { changes: Object.keys(data) },
    });

    logger.info('School updated', { schoolId: id }, 'schools');
    return school;
  }

  async archive(id: string, userId?: string): Promise<void> {
    const existing = await this.schoolRepo.findById(id);
    if (!existing) throw new SchoolNotFoundError(id);

    await this.schoolRepo.archive(id);

    await this.auditService.log({
      action: 'SCHOOL_ARCHIVE',
      entity: 'school',
      schoolId: id,
      userId,
    });

    logger.info('School archived', { schoolId: id }, 'schools');
  }

  async restore(id: string, userId?: string): Promise<void> {
    const existing = await this.schoolRepo.findById(id);
    if (!existing) throw new SchoolNotFoundError(id);

    await this.schoolRepo.restore(id);

    await this.auditService.log({
      action: 'SCHOOL_RESTORE',
      entity: 'school',
      schoolId: id,
      userId,
    });

    logger.info('School restored', { schoolId: id }, 'schools');
  }

  async delete(id: string, userId?: string): Promise<void> {
    const existing = await this.schoolRepo.findById(id);
    if (!existing) throw new SchoolNotFoundError(id);

    await this.schoolRepo.delete(id);

    await this.auditService.log({
      action: 'SCHOOL_DELETE',
      entity: 'school',
      schoolId: id,
      userId,
      details: { name: existing.name },
    });

    logger.info('School deleted', { schoolId: id, name: existing.name }, 'schools');
  }

  async findById(id: string): Promise<School> {
    const school = await this.schoolRepo.findById(id);
    if (!school) throw new SchoolNotFoundError(id);
    return school;
  }

  async findAll(filters: Parameters<SchoolRepository['findAll']>[0]) {
    return this.schoolRepo.findAll(filters);
  }

  async uploadLogo(schoolId: string, file: File): Promise<string> {
    const existing = await this.schoolRepo.findById(schoolId);
    if (!existing) throw new SchoolNotFoundError(schoolId);

    const url = await this.schoolRepo.uploadLogo(schoolId, file);

    await this.auditService.log({
      action: 'SCHOOL_LOGO_UPLOAD',
      entity: 'school',
      schoolId,
      details: { fileName: file.name },
    });

    return url;
  }

  async getSettings(schoolId: string) {
    const existing = await this.schoolRepo.findById(schoolId);
    if (!existing) throw new SchoolNotFoundError(schoolId);

    return this.schoolRepo.getSettings(schoolId);
  }

  async updateSettings(schoolId: string, settings: Parameters<SchoolRepository['updateSettings']>[1]) {
    const existing = await this.schoolRepo.findById(schoolId);
    if (!existing) throw new SchoolNotFoundError(schoolId);

    await this.schoolRepo.updateSettings(schoolId, settings);

    await this.auditService.log({
      action: 'SCHOOL_SETTINGS_UPDATE',
      entity: 'school',
      schoolId,
      details: { settings: Object.keys(settings) },
    });
  }

  async getStatistics(schoolId: string) {
    const existing = await this.schoolRepo.findById(schoolId);
    if (!existing) throw new SchoolNotFoundError(schoolId);

    return this.schoolRepo.getStatistics(schoolId);
  }

  getLimits(plan: SchoolPlan): SchoolLimits {
    return SchoolPlanLimits[plan] || SchoolPlanLimits.FREE;
  }

  checkPlanLimits(currentPlan: SchoolPlan, resource: string, current: number): void {
    const limits = this.getLimits(currentPlan);
    const limitMap: Record<string, number> = {
      students: limits.maxStudents,
      teachers: limits.maxTeachers,
      storage: limits.maxStorageMb,
      sms: limits.maxSmsPerMonth,
      emails: limits.maxEmailsPerMonth,
      qrcodes: limits.maxQrCodes,
    };

    const max = limitMap[resource];
    if (max !== undefined && current >= max) {
      throw new SchoolLimitExceededError(resource, current, max);
    }
  }
}
