// Enterprise Platform Service - LicenseRegistry
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { LicenseRegistry, LicenseRegistryCreate } from '@educi/types';
import { EntLicenseRegistryNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntLicenseRegistryServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getLicenseRegistryService(schoolId: string, id: string): Promise<LicenseRegistry> {
    const item = await this.repo.findLicenseRegistryServiceById(schoolId, id);
    if (!item) throw new EntLicenseRegistryNotFoundError(id);
    return item;
  }
  async listLicenseRegistryServices(schoolId: string, filters?: Record<string, unknown>): Promise<LicenseRegistry[]> {
    return this.repo.findAllLicenseRegistryServices(schoolId, filters);
  }
  async createLicenseRegistryService(schoolId: string, data: LicenseRegistryCreate): Promise<LicenseRegistry> {
    return this.repo.createLicenseRegistryService(schoolId, data);
  }
  async updateLicenseRegistryService(schoolId: string, id: string, data: Partial<LicenseRegistryCreate>): Promise<LicenseRegistry> {
    const existing = await this.repo.findLicenseRegistryServiceById(schoolId, id);
    if (!existing) throw new EntLicenseRegistryNotFoundError(id);
    return this.repo.updateLicenseRegistryService(schoolId, id, data);
  }
  async deleteLicenseRegistryService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLicenseRegistryServiceById(schoolId, id);
    if (!existing) throw new EntLicenseRegistryNotFoundError(id);
    return this.repo.deleteLicenseRegistryService(schoolId, id);
  }
  async countLicenseRegistryServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLicenseRegistryServices(schoolId, filters);
  }
}
