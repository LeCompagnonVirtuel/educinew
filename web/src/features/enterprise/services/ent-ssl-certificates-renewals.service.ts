// Enterprise Platform Service - SslCertificatesRenewals
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCertificateRenewalService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSslCertificatesRenewal(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSslCertificatesRenewalById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSslCertificatesRenewals(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSslCertificatesRenewals(schoolId, filters);
  }
  async createSslCertificatesRenewal(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSslCertificatesRenewal(schoolId, data);
  }
  async updateSslCertificatesRenewal(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSslCertificatesRenewalById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSslCertificatesRenewal(schoolId, id, data);
  }
  async deleteSslCertificatesRenewal(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSslCertificatesRenewalById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSslCertificatesRenewal(schoolId, id);
  }
  async countSslCertificatesRenewals(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSslCertificatesRenewals(schoolId, filters);
  }
}
