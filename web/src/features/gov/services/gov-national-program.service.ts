// Government & National Governance Service - NationalProgram
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { NationalProgram, NationalProgramCreate } from '@educi/types';
import { GovNationalProgramNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovNationalProgramService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getNationalProgram(schoolId: string, id: string): Promise<NationalProgram> {
    const item = await this.repo.findNationalProgramById(schoolId, id);
    if (!item) throw new GovNationalProgramNotFoundError(id);
    return item;
  }

  async listNationalPrograms(schoolId: string, filters?: Record<string, unknown>): Promise<NationalProgram[]> {
    return this.repo.findAllNationalPrograms(schoolId, filters);
  }

  async createNationalProgram(schoolId: string, data: NationalProgramCreate): Promise<NationalProgram> {
    return this.repo.createNationalProgram(schoolId, data);
  }

  async updateNationalProgram(schoolId: string, id: string, data: Partial<NationalProgramCreate>): Promise<NationalProgram> {
    const existing = await this.repo.findNationalProgramById(schoolId, id);
    if (!existing) throw new GovNationalProgramNotFoundError(id);
    return this.repo.updateNationalProgram(schoolId, id, data);
  }

  async deleteNationalProgram(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNationalProgramById(schoolId, id);
    if (!existing) throw new GovNationalProgramNotFoundError(id);
    return this.repo.deleteNationalProgram(schoolId, id);
  }

  async countNationalPrograms(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNationalPrograms(schoolId, filters);
  }
}
