// Enterprise Platform Service - Domains
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDomainService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDomain(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDomainById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDomains(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDomains(schoolId, filters);
  }
  async createDomain(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDomain(schoolId, data);
  }
  async updateDomain(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDomainById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDomain(schoolId, id, data);
  }
  async deleteDomain(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDomainById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDomain(schoolId, id);
  }
  async countDomains(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDomains(schoolId, filters);
  }
}
