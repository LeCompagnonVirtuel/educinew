import type { SupabaseClient } from '@supabase/supabase-js';
import type { BranchDefinition } from '@educi/types';
import { EduOSBranchDefinitionError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSBranchDefinitionService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getBranchDefinition(schoolId: string, id: string): Promise<BranchDefinition> {
    const item = await this.repo.getBranchDefinition(schoolId, id);
    if (!item) throw new EduOSBranchDefinitionError(id);
    return item;
  }
  async listBranchDefinitions(schoolId: string, filters?: Record<string, unknown>): Promise<BranchDefinition[]> {
    return this.repo.listBranchDefinitions(schoolId, filters);
  }
  async createBranchDefinition(schoolId: string, data: Partial<BranchDefinition>): Promise<BranchDefinition> {
    return this.repo.createBranchDefinition(schoolId, data as any);
  }
  async updateBranchDefinition(schoolId: string, id: string, data: Partial<BranchDefinition>): Promise<BranchDefinition> {
    const existing = await this.repo.getBranchDefinition(schoolId, id);
    if (!existing) throw new EduOSBranchDefinitionError(id);
    return this.repo.updateBranchDefinition(schoolId, id, data as any);
  }
  async deleteBranchDefinition(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBranchDefinition(schoolId, id);
    if (!existing) throw new EduOSBranchDefinitionError(id);
    return this.repo.deleteBranchDefinition(schoolId, id);
  }
}

