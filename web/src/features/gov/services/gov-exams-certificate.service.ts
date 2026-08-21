import type { SupabaseClient } from '@supabase/supabase-js';
import type { Certificate, CertificateCreate } from '@educi/types';
import { GovCertificateNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamsCertificateService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<Certificate> {
    const item = await this.repo.findCertificateById(schoolId, id);
    if (!item) throw new GovCertificateNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<Certificate[]> {
    return this.repo.findAllCertificates(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<CertificateCreate>): Promise<Certificate> {
    return this.repo.createCertificate(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<CertificateCreate>): Promise<Certificate> {
    const existing = await this.repo.findCertificateById(schoolId, id);
    if (!existing) throw new GovCertificateNotFoundError(id);
    return this.repo.updateCertificate(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCertificateById(schoolId, id);
    if (!existing) throw new GovCertificateNotFoundError(id);
    return this.repo.deleteCertificate(schoolId, id);
  }
}
