import type { SupabaseClient } from '@supabase/supabase-js';
import type { NationalProgram, NationalProgramCreate } from '@educi/types';
import { GovNationalProgramNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovMinistryNationalProgramService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<NationalProgram> {
    const item = await this.repo.findNationalProgramById(schoolId, id);
    if (!item) throw new GovNationalProgramNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<NationalProgram[]> {
    return this.repo.findAllNationalPrograms(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<NationalProgramCreate>): Promise<NationalProgram> {
    return this.repo.createNationalProgram(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<NationalProgramCreate>): Promise<NationalProgram> {
    const existing = await this.repo.findNationalProgramById(schoolId, id);
    if (!existing) throw new GovNationalProgramNotFoundError(id);
    return this.repo.updateNationalProgram(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNationalProgramById(schoolId, id);
    if (!existing) throw new GovNationalProgramNotFoundError(id);
    return this.repo.deleteNationalProgram(schoolId, id);
  }
}
