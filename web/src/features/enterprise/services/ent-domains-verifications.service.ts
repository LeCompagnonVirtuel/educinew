// Enterprise Platform Service - DomainsVerifications
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDomainVerificationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDomainsVerification(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDomainsVerificationById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDomainsVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDomainsVerifications(schoolId, filters);
  }
  async createDomainsVerification(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDomainsVerification(schoolId, data);
  }
  async updateDomainsVerification(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDomainsVerificationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDomainsVerification(schoolId, id, data);
  }
  async deleteDomainsVerification(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDomainsVerificationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDomainsVerification(schoolId, id);
  }
  async countDomainsVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDomainsVerifications(schoolId, filters);
  }
}
