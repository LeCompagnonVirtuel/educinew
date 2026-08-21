import type { SupabaseClient } from '@supabase/supabase-js';
import type { Subsidy } from '@educi/types';
import { EduOSSubsidyError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSSubsidyService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getSubsidy(schoolId: string, id: string): Promise<Subsidy> {
    const item = await this.repo.getSubsidy(schoolId, id);
    if (!item) throw new EduOSSubsidyError(id);
    return item;
  }
  async listSubsidies(schoolId: string, filters?: Record<string, unknown>): Promise<Subsidy[]> {
    return this.repo.listSubsidies(schoolId, filters);
  }
  async createSubsidy(schoolId: string, data: Partial<Subsidy>): Promise<Subsidy> {
    return this.repo.createSubsidy(schoolId, data as any);
  }
  async updateSubsidy(schoolId: string, id: string, data: Partial<Subsidy>): Promise<Subsidy> {
    const existing = await this.repo.getSubsidy(schoolId, id);
    if (!existing) throw new EduOSSubsidyError(id);
    return this.repo.updateSubsidy(schoolId, id, data as any);
  }
  async deleteSubsidy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSubsidy(schoolId, id);
    if (!existing) throw new EduOSSubsidyError(id);
    return this.repo.deleteSubsidy(schoolId, id);
  }
}


