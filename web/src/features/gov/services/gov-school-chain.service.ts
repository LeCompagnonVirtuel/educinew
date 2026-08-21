// Government & National Governance Service - SchoolChain
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SchoolChain, SchoolChainCreate } from '@educi/types';
import { GovSchoolChainNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovSchoolChainService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getSchoolChain(schoolId: string, id: string): Promise<SchoolChain> {
    const item = await this.repo.findSchoolChainById(schoolId, id);
    if (!item) throw new GovSchoolChainNotFoundError(id);
    return item;
  }

  async listSchoolChains(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolChain[]> {
    return this.repo.findAllSchoolChains(schoolId, filters);
  }

  async createSchoolChain(schoolId: string, data: SchoolChainCreate): Promise<SchoolChain> {
    return this.repo.createSchoolChain(schoolId, data);
  }

  async updateSchoolChain(schoolId: string, id: string, data: Partial<SchoolChainCreate>): Promise<SchoolChain> {
    const existing = await this.repo.findSchoolChainById(schoolId, id);
    if (!existing) throw new GovSchoolChainNotFoundError(id);
    return this.repo.updateSchoolChain(schoolId, id, data);
  }

  async deleteSchoolChain(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolChainById(schoolId, id);
    if (!existing) throw new GovSchoolChainNotFoundError(id);
    return this.repo.deleteSchoolChain(schoolId, id);
  }

  async countSchoolChains(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSchoolChains(schoolId, filters);
  }
}
