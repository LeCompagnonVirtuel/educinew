// Enterprise Platform Service - SslCertificates
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSslCertificateService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSslCertificate(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSslCertificateById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSslCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSslCertificates(schoolId, filters);
  }
  async createSslCertificate(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSslCertificate(schoolId, data);
  }
  async updateSslCertificate(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSslCertificateById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSslCertificate(schoolId, id, data);
  }
  async deleteSslCertificate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSslCertificateById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSslCertificate(schoolId, id);
  }
  async countSslCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSslCertificates(schoolId, filters);
  }
}
