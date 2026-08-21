// Government & National Governance Service - IdentityQrGeneration
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IdentityQrGeneration, IdentityQrGenerationCreate } from '@educi/types';
import { GovIdentityQrGenerationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovIdentityQrGenerationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getIdentityQrGeneration(schoolId: string, id: string): Promise<IdentityQrGeneration> {
    const item = await this.repo.findIdentityQrGenerationById(schoolId, id);
    if (!item) throw new GovIdentityQrGenerationNotFoundError(id);
    return item;
  }

  async listIdentityQrGenerations(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityQrGeneration[]> {
    return this.repo.findAllIdentityQrGenerations(schoolId, filters);
  }

  async createIdentityQrGeneration(schoolId: string, data: IdentityQrGenerationCreate): Promise<IdentityQrGeneration> {
    return this.repo.createIdentityQrGeneration(schoolId, data);
  }

  async updateIdentityQrGeneration(schoolId: string, id: string, data: Partial<IdentityQrGenerationCreate>): Promise<IdentityQrGeneration> {
    const existing = await this.repo.findIdentityQrGenerationById(schoolId, id);
    if (!existing) throw new GovIdentityQrGenerationNotFoundError(id);
    return this.repo.updateIdentityQrGeneration(schoolId, id, data);
  }

  async deleteIdentityQrGeneration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIdentityQrGenerationById(schoolId, id);
    if (!existing) throw new GovIdentityQrGenerationNotFoundError(id);
    return this.repo.deleteIdentityQrGeneration(schoolId, id);
  }

  async countIdentityQrGenerations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIdentityQrGenerations(schoolId, filters);
  }
}
