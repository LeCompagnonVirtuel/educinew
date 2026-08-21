// Enterprise Platform Service - LicenseRegistry
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { LicenseRegistry, LicenseRegistryCreate } from '@educi/types';
import { EntLicenseRegistryNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntLicenseRegistryService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getLicenseRegistry(schoolId: string, id: string): Promise<LicenseRegistry> {
    const item = await this.repo.findLicenseRegistryById(schoolId, id);
    if (!item) throw new EntLicenseRegistryNotFoundError(id);
    return item;
  }
  async listLicenseRegistrys(schoolId: string, filters?: Record<string, unknown>): Promise<LicenseRegistry[]> {
    return this.repo.findAllLicenseRegistrys(schoolId, filters);
  }
  async createLicenseRegistry(schoolId: string, data: LicenseRegistryCreate): Promise<LicenseRegistry> {
    return this.repo.createLicenseRegistry(schoolId, data);
  }
  async updateLicenseRegistry(schoolId: string, id: string, data: Partial<LicenseRegistryCreate>): Promise<LicenseRegistry> {
    const existing = await this.repo.findLicenseRegistryById(schoolId, id);
    if (!existing) throw new EntLicenseRegistryNotFoundError(id);
    return this.repo.updateLicenseRegistry(schoolId, id, data);
  }
  async deleteLicenseRegistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLicenseRegistryById(schoolId, id);
    if (!existing) throw new EntLicenseRegistryNotFoundError(id);
    return this.repo.deleteLicenseRegistry(schoolId, id);
  }
  async countLicenseRegistrys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLicenseRegistrys(schoolId, filters);
  }
}
