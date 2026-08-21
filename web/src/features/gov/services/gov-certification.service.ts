// Government & National Governance Service - Certification
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Certification, CertificationCreate } from '@educi/types';
import { GovCertificationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCertificationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getCertification(schoolId: string, id: string): Promise<Certification> {
    const item = await this.repo.findCertificationById(schoolId, id);
    if (!item) throw new GovCertificationNotFoundError(id);
    return item;
  }

  async listCertifications(schoolId: string, filters?: Record<string, unknown>): Promise<Certification[]> {
    return this.repo.findAllCertifications(schoolId, filters);
  }

  async createCertification(schoolId: string, data: CertificationCreate): Promise<Certification> {
    return this.repo.createCertification(schoolId, data);
  }

  async updateCertification(schoolId: string, id: string, data: Partial<CertificationCreate>): Promise<Certification> {
    const existing = await this.repo.findCertificationById(schoolId, id);
    if (!existing) throw new GovCertificationNotFoundError(id);
    return this.repo.updateCertification(schoolId, id, data);
  }

  async deleteCertification(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCertificationById(schoolId, id);
    if (!existing) throw new GovCertificationNotFoundError(id);
    return this.repo.deleteCertification(schoolId, id);
  }

  async countCertifications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCertifications(schoolId, filters);
  }
}
