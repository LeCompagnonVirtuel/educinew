// Enterprise Platform Service - CertManager
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCertManagerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCertManager(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findCertManagerById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listCertManager(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllCertManager(schoolId, filters);
  }
  async createCertManager(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createCertManager(schoolId, data);
  }
  async updateCertManager(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findCertManagerById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateCertManager(schoolId, id, data);
  }
  async deleteCertManager(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCertManagerById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteCertManager(schoolId, id);
  }
  async countCertManager(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCertManager(schoolId, filters);
  }
}
