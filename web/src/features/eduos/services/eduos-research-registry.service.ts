import type { SupabaseClient } from '@supabase/supabase-js';
import type { ResearchRegistry } from '@educi/types';
import { EduOSResearchRegistryError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSResearchRegistryService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getResearchRegistry(schoolId: string, id: string): Promise<ResearchRegistry> {
    const item = await this.repo.getResearchRegistry(schoolId, id);
    if (!item) throw new EduOSResearchRegistryError(id);
    return item;
  }
  async listResearchRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchRegistry[]> {
    return this.repo.listResearchRegistries(schoolId, filters);
  }
  async createResearchRegistry(schoolId: string, data: Partial<ResearchRegistry>): Promise<ResearchRegistry> {
    return this.repo.createResearchRegistry(schoolId, data as any);
  }
  async updateResearchRegistry(schoolId: string, id: string, data: Partial<ResearchRegistry>): Promise<ResearchRegistry> {
    const existing = await this.repo.getResearchRegistry(schoolId, id);
    if (!existing) throw new EduOSResearchRegistryError(id);
    return this.repo.updateResearchRegistry(schoolId, id, data as any);
  }
  async deleteResearchRegistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getResearchRegistry(schoolId, id);
    if (!existing) throw new EduOSResearchRegistryError(id);
    return this.repo.deleteResearchRegistry(schoolId, id);
  }
}


