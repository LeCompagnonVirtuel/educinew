// Government & National Governance Service - NationalStudentId
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { NationalStudentId, NationalStudentIdCreate } from '@educi/types';
import { GovNationalStudentIdNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovNationalStudentIdService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getNationalStudentId(schoolId: string, id: string): Promise<NationalStudentId> {
    const item = await this.repo.findNationalStudentIdById(schoolId, id);
    if (!item) throw new GovNationalStudentIdNotFoundError(id);
    return item;
  }

  async listNationalStudentIds(schoolId: string, filters?: Record<string, unknown>): Promise<NationalStudentId[]> {
    return this.repo.findAllNationalStudentIds(schoolId, filters);
  }

  async createNationalStudentId(schoolId: string, data: NationalStudentIdCreate): Promise<NationalStudentId> {
    return this.repo.createNationalStudentId(schoolId, data);
  }

  async updateNationalStudentId(schoolId: string, id: string, data: Partial<NationalStudentIdCreate>): Promise<NationalStudentId> {
    const existing = await this.repo.findNationalStudentIdById(schoolId, id);
    if (!existing) throw new GovNationalStudentIdNotFoundError(id);
    return this.repo.updateNationalStudentId(schoolId, id, data);
  }

  async deleteNationalStudentId(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNationalStudentIdById(schoolId, id);
    if (!existing) throw new GovNationalStudentIdNotFoundError(id);
    return this.repo.deleteNationalStudentId(schoolId, id);
  }

  async countNationalStudentIds(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNationalStudentIds(schoolId, filters);
  }
}
