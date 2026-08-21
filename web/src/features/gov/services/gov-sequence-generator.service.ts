// Government & National Governance Service - SequenceGenerator
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SequenceGenerator, SequenceGeneratorCreate } from '@educi/types';
import { GovSequenceGeneratorNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovSequenceGeneratorService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getSequenceGenerator(schoolId: string, id: string): Promise<SequenceGenerator> {
    const item = await this.repo.findSequenceGeneratorById(schoolId, id);
    if (!item) throw new GovSequenceGeneratorNotFoundError(id);
    return item;
  }

  async listSequenceGenerators(schoolId: string, filters?: Record<string, unknown>): Promise<SequenceGenerator[]> {
    return this.repo.findAllSequenceGenerators(schoolId, filters);
  }

  async createSequenceGenerator(schoolId: string, data: SequenceGeneratorCreate): Promise<SequenceGenerator> {
    return this.repo.createSequenceGenerator(schoolId, data);
  }

  async updateSequenceGenerator(schoolId: string, id: string, data: Partial<SequenceGeneratorCreate>): Promise<SequenceGenerator> {
    const existing = await this.repo.findSequenceGeneratorById(schoolId, id);
    if (!existing) throw new GovSequenceGeneratorNotFoundError(id);
    return this.repo.updateSequenceGenerator(schoolId, id, data);
  }

  async deleteSequenceGenerator(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSequenceGeneratorById(schoolId, id);
    if (!existing) throw new GovSequenceGeneratorNotFoundError(id);
    return this.repo.deleteSequenceGenerator(schoolId, id);
  }

  async countSequenceGenerators(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSequenceGenerators(schoolId, filters);
  }
}
