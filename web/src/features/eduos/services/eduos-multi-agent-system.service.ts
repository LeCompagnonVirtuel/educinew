import type { SupabaseClient } from '@supabase/supabase-js';
import type { MultiAgentSystem } from '@educi/types';
import { EduOSMultiAgentSystemError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMultiAgentSystemService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMultiAgentSystem(schoolId: string, id: string): Promise<MultiAgentSystem> {
    const item = await this.repo.getMultiAgentSystem(schoolId, id);
    if (!item) throw new EduOSMultiAgentSystemError(id);
    return item;
  }
  async listMultiAgentSystems(schoolId: string, filters?: Record<string, unknown>): Promise<MultiAgentSystem[]> {
    return this.repo.listMultiAgentSystems(schoolId, filters);
  }
  async createMultiAgentSystem(schoolId: string, data: Partial<MultiAgentSystem>): Promise<MultiAgentSystem> {
    return this.repo.createMultiAgentSystem(schoolId, data as any);
  }
  async updateMultiAgentSystem(schoolId: string, id: string, data: Partial<MultiAgentSystem>): Promise<MultiAgentSystem> {
    const existing = await this.repo.getMultiAgentSystem(schoolId, id);
    if (!existing) throw new EduOSMultiAgentSystemError(id);
    return this.repo.updateMultiAgentSystem(schoolId, id, data as any);
  }
  async deleteMultiAgentSystem(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMultiAgentSystem(schoolId, id);
    if (!existing) throw new EduOSMultiAgentSystemError(id);
    return this.repo.deleteMultiAgentSystem(schoolId, id);
  }
}

