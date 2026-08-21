// Enterprise Platform Service - Licenses
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntLicenseService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getLicense(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findLicenseById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listLicenses(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllLicenses(schoolId, filters);
  }
  async createLicense(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createLicense(schoolId, data);
  }
  async updateLicense(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findLicenseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateLicense(schoolId, id, data);
  }
  async deleteLicense(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLicenseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteLicense(schoolId, id);
  }
  async countLicenses(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLicenses(schoolId, filters);
  }
}
