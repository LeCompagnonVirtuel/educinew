import type { SupabaseClient } from '@supabase/supabase-js';
import type { DigitalCertificate, DigitalCertificateCreate } from '@educi/types';
import { GovDigitalCertificateNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovIdentityDigitalCertificateService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<DigitalCertificate> {
    const item = await this.repo.findDigitalCertificateById(schoolId, id);
    if (!item) throw new GovDigitalCertificateNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalCertificate[]> {
    return this.repo.findAllDigitalCertificates(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<DigitalCertificateCreate>): Promise<DigitalCertificate> {
    return this.repo.createDigitalCertificate(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<DigitalCertificateCreate>): Promise<DigitalCertificate> {
    const existing = await this.repo.findDigitalCertificateById(schoolId, id);
    if (!existing) throw new GovDigitalCertificateNotFoundError(id);
    return this.repo.updateDigitalCertificate(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDigitalCertificateById(schoolId, id);
    if (!existing) throw new GovDigitalCertificateNotFoundError(id);
    return this.repo.deleteDigitalCertificate(schoolId, id);
  }
}
