import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiAgent, AiAgentQuery, AiAgentCreate, AiAgentUpdate } from '@educi/types';
import { AiAgentNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiAgentService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getAgent(schoolId: string, id: string): Promise<AiAgent> {
    const agent = await this.repo.findById(schoolId, id);
    if (!agent) throw new AiAgentNotFoundError(id);
    return agent;
  }

  async listAgents(schoolId: string, query: AiAgentQuery): Promise<AiAgent[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createAgent(schoolId: string, data: AiAgentCreate): Promise<AiAgent> {
    return this.repo.create(schoolId, data);
  }

  async updateAgent(schoolId: string, id: string, data: AiAgentUpdate): Promise<AiAgent> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiAgentNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteAgent(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiAgentNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async activateAgent(schoolId: string, id: string): Promise<AiAgent> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiAgentNotFoundError(id);
    return this.repo.update(schoolId, id, { status: 'active', activatedAt: new Date().toISOString() });
  }

  async deactivateAgent(schoolId: string, id: string): Promise<AiAgent> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiAgentNotFoundError(id);
    return this.repo.update(schoolId, id, { status: 'inactive', deactivatedAt: new Date().toISOString() });
  }

  async getAgentTasks(schoolId: string, id: string): Promise<AiAgentTask[]> {
    const agent = await this.repo.findById(schoolId, id);
    if (!agent) throw new AiAgentNotFoundError(id);
    return this.repo.findTasksByAgentId(schoolId, id);
  }
}
