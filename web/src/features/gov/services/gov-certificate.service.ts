// Government & National Governance Service - Certificate
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Certificate, CertificateCreate } from '@educi/types';
import { GovCertificateNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCertificateService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getCertificate(schoolId: string, id: string): Promise<Certificate> {
    const item = await this.repo.findCertificateById(schoolId, id);
    if (!item) throw new GovCertificateNotFoundError(id);
    return item;
  }

  async listCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<Certificate[]> {
    return this.repo.findAllCertificates(schoolId, filters);
  }

  async createCertificate(schoolId: string, data: CertificateCreate): Promise<Certificate> {
    return this.repo.createCertificate(schoolId, data);
  }

  async updateCertificate(schoolId: string, id: string, data: Partial<CertificateCreate>): Promise<Certificate> {
    const existing = await this.repo.findCertificateById(schoolId, id);
    if (!existing) throw new GovCertificateNotFoundError(id);
    return this.repo.updateCertificate(schoolId, id, data);
  }

  async deleteCertificate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCertificateById(schoolId, id);
    if (!existing) throw new GovCertificateNotFoundError(id);
    return this.repo.deleteCertificate(schoolId, id);
  }

  async countCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCertificates(schoolId, filters);
  }
}
