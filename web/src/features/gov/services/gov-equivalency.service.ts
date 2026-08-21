// Government & National Governance Service - Equivalency
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Equivalency, EquivalencyCreate } from '@educi/types';
import { GovEquivalencyNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovEquivalencyService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEquivalency(schoolId: string, id: string): Promise<Equivalency> {
    const item = await this.repo.findEquivalencyById(schoolId, id);
    if (!item) throw new GovEquivalencyNotFoundError(id);
    return item;
  }

  async listEquivalencies(schoolId: string, filters?: Record<string, unknown>): Promise<Equivalency[]> {
    return this.repo.findAllEquivalencies(schoolId, filters);
  }

  async createEquivalency(schoolId: string, data: EquivalencyCreate): Promise<Equivalency> {
    return this.repo.createEquivalency(schoolId, data);
  }

  async updateEquivalency(schoolId: string, id: string, data: Partial<EquivalencyCreate>): Promise<Equivalency> {
    const existing = await this.repo.findEquivalencyById(schoolId, id);
    if (!existing) throw new GovEquivalencyNotFoundError(id);
    return this.repo.updateEquivalency(schoolId, id, data);
  }

  async deleteEquivalency(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEquivalencyById(schoolId, id);
    if (!existing) throw new GovEquivalencyNotFoundError(id);
    return this.repo.deleteEquivalency(schoolId, id);
  }

  async countEquivalencies(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEquivalencies(schoolId, filters);
  }
}
