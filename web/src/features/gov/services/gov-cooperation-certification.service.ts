import type { SupabaseClient } from '@supabase/supabase-js';
import type { Certification, CertificationCreate } from '@educi/types';
import { GovCertificationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCooperationCertificationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<Certification> {
    const item = await this.repo.findCertificationById(schoolId, id);
    if (!item) throw new GovCertificationNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<Certification[]> {
    return this.repo.findAllCertifications(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<CertificationCreate>): Promise<Certification> {
    return this.repo.createCertification(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<CertificationCreate>): Promise<Certification> {
    const existing = await this.repo.findCertificationById(schoolId, id);
    if (!existing) throw new GovCertificationNotFoundError(id);
    return this.repo.updateCertification(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCertificationById(schoolId, id);
    if (!existing) throw new GovCertificationNotFoundError(id);
    return this.repo.deleteCertification(schoolId, id);
  }
}
