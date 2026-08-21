import type { SupabaseClient } from '@supabase/supabase-js';
import type { AgentRegistry } from '@educi/types';
import { EduOSAgentRegistryError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSAgentRegistryService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getAgentRegistry(schoolId: string, id: string): Promise<AgentRegistry> {
    const item = await this.repo.getAgentRegistry(schoolId, id);
    if (!item) throw new EduOSAgentRegistryError(id);
    return item;
  }
  async listAgentRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<AgentRegistry[]> {
    return this.repo.listAgentRegistries(schoolId, filters);
  }
  async createAgentRegistry(schoolId: string, data: Partial<AgentRegistry>): Promise<AgentRegistry> {
    return this.repo.createAgentRegistry(schoolId, data as any);
  }
  async updateAgentRegistry(schoolId: string, id: string, data: Partial<AgentRegistry>): Promise<AgentRegistry> {
    const existing = await this.repo.getAgentRegistry(schoolId, id);
    if (!existing) throw new EduOSAgentRegistryError(id);
    return this.repo.updateAgentRegistry(schoolId, id, data as any);
  }
  async deleteAgentRegistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAgentRegistry(schoolId, id);
    if (!existing) throw new EduOSAgentRegistryError(id);
    return this.repo.deleteAgentRegistry(schoolId, id);
  }
}


