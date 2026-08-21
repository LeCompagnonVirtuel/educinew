import type { SupabaseClient } from '@supabase/supabase-js';
import type { AIModelRegistry } from '@educi/types';
import { EduOSAIModelRegistryError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSAIModelRegistryService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getAIModelRegistry(schoolId: string, id: string): Promise<AIModelRegistry> {
    const item = await this.repo.getAIModelRegistry(schoolId, id);
    if (!item) throw new EduOSAIModelRegistryError(id);
    return item;
  }
  async listAIModelRegistrys(schoolId: string, filters?: Record<string, unknown>): Promise<AIModelRegistry[]> {
    return this.repo.listAIModelRegistrys(schoolId, filters);
  }
  async createAIModelRegistry(schoolId: string, data: Partial<AIModelRegistry>): Promise<AIModelRegistry> {
    return this.repo.createAIModelRegistry(schoolId, data as any);
  }
  async updateAIModelRegistry(schoolId: string, id: string, data: Partial<AIModelRegistry>): Promise<AIModelRegistry> {
    const existing = await this.repo.getAIModelRegistry(schoolId, id);
    if (!existing) throw new EduOSAIModelRegistryError(id);
    return this.repo.updateAIModelRegistry(schoolId, id, data as any);
  }
  async deleteAIModelRegistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAIModelRegistry(schoolId, id);
    if (!existing) throw new EduOSAIModelRegistryError(id);
    return this.repo.deleteAIModelRegistry(schoolId, id);
  }
}

