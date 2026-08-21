// Government & National Governance Service - Diploma
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Diploma, DiplomaCreate } from '@educi/types';
import { GovDiplomaNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovDiplomaService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getDiploma(schoolId: string, id: string): Promise<Diploma> {
    const item = await this.repo.findDiplomaById(schoolId, id);
    if (!item) throw new GovDiplomaNotFoundError(id);
    return item;
  }

  async listDiplomas(schoolId: string, filters?: Record<string, unknown>): Promise<Diploma[]> {
    return this.repo.findAllDiplomas(schoolId, filters);
  }

  async createDiploma(schoolId: string, data: DiplomaCreate): Promise<Diploma> {
    return this.repo.createDiploma(schoolId, data);
  }

  async updateDiploma(schoolId: string, id: string, data: Partial<DiplomaCreate>): Promise<Diploma> {
    const existing = await this.repo.findDiplomaById(schoolId, id);
    if (!existing) throw new GovDiplomaNotFoundError(id);
    return this.repo.updateDiploma(schoolId, id, data);
  }

  async deleteDiploma(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDiplomaById(schoolId, id);
    if (!existing) throw new GovDiplomaNotFoundError(id);
    return this.repo.deleteDiploma(schoolId, id);
  }

  async countDiplomas(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDiplomas(schoolId, filters);
  }
}
