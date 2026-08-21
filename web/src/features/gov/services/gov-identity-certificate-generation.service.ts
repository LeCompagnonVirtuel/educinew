// Government & National Governance Service - IdentityCertificateGeneration
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IdentityCertificateGeneration, IdentityCertificateGenerationCreate } from '@educi/types';
import { GovIdentityCertificateGenerationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovIdentityCertificateGenerationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getIdentityCertificateGeneration(schoolId: string, id: string): Promise<IdentityCertificateGeneration> {
    const item = await this.repo.findIdentityCertificateGenerationById(schoolId, id);
    if (!item) throw new GovIdentityCertificateGenerationNotFoundError(id);
    return item;
  }

  async listIdentityCertificateGenerations(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityCertificateGeneration[]> {
    return this.repo.findAllIdentityCertificateGenerations(schoolId, filters);
  }

  async createIdentityCertificateGeneration(schoolId: string, data: IdentityCertificateGenerationCreate): Promise<IdentityCertificateGeneration> {
    return this.repo.createIdentityCertificateGeneration(schoolId, data);
  }

  async updateIdentityCertificateGeneration(schoolId: string, id: string, data: Partial<IdentityCertificateGenerationCreate>): Promise<IdentityCertificateGeneration> {
    const existing = await this.repo.findIdentityCertificateGenerationById(schoolId, id);
    if (!existing) throw new GovIdentityCertificateGenerationNotFoundError(id);
    return this.repo.updateIdentityCertificateGeneration(schoolId, id, data);
  }

  async deleteIdentityCertificateGeneration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIdentityCertificateGenerationById(schoolId, id);
    if (!existing) throw new GovIdentityCertificateGenerationNotFoundError(id);
    return this.repo.deleteIdentityCertificateGeneration(schoolId, id);
  }

  async countIdentityCertificateGenerations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIdentityCertificateGenerations(schoolId, filters);
  }
}
