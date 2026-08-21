import type { SupabaseClient } from '@supabase/supabase-js';
import type { License } from '@educi/types';
import { LxpLicenseNotFoundError, LxpLicenseCreateError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpLicenseService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getLicense(schoolId: string, id: string): Promise<License> {
    const license = await this.repo.findLicenseById(schoolId, id);
    if (!license) throw new LxpLicenseNotFoundError(id);
    return license;
  }

  async listLicenses(schoolId: string, courseId: string): Promise<readonly License[]> {
    return this.repo.findLicenses(schoolId, courseId);
  }

  async createLicense(data: Omit<License, 'id' | 'createdAt' | 'updatedAt'>): Promise<License> {
    const created = await this.repo.createLicense(data);
    if (!created) throw new LxpLicenseCreateError();
    return created;
  }

  async validateLicense(licenseKey: string): Promise<boolean> {
    const valid = await this.repo.validateLicense(licenseKey);
    if (!valid) throw new LxpLicenseNotFoundError();
    return valid;
  }

  async deleteLicense(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLicenseById(schoolId, id);
    if (!existing) throw new LxpLicenseNotFoundError(id);
    await this.repo.deleteLicense(id);
  }
}
