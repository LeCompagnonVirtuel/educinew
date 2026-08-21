// Enterprise Platform Service - DataDomains
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataDomainService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataDomain(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataDomainById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataDomains(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataDomains(schoolId, filters);
  }
  async createDataDomain(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataDomain(schoolId, data);
  }
  async updateDataDomain(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataDomainById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataDomain(schoolId, id, data);
  }
  async deleteDataDomain(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataDomainById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataDomain(schoolId, id);
  }
  async countDataDomains(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataDomains(schoolId, filters);
  }
}
