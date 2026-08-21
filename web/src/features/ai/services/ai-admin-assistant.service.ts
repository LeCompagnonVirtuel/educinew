import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiAdminAssistant, AiAdminAssistantQuery, AiAdminAssistantCreate, AiAdminAssistantUpdate } from '@educi/types';
import { AiAdminAssistantNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiAdminAssistantService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getAssistant(schoolId: string, id: string): Promise<AiAdminAssistant> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiAdminAssistantNotFoundError(id);
    return assistant;
  }

  async listAssistants(schoolId: string, query: AiAdminAssistantQuery): Promise<AiAdminAssistant[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createAssistant(schoolId: string, data: AiAdminAssistantCreate): Promise<AiAdminAssistant> {
    return this.repo.create(schoolId, data);
  }

  async updateAssistant(schoolId: string, id: string, data: AiAdminAssistantUpdate): Promise<AiAdminAssistant> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiAdminAssistantNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteAssistant(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiAdminAssistantNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async getAdminSessions(schoolId: string, id: string): Promise<AiSession[]> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiAdminAssistantNotFoundError(id);
    return this.repo.findSessionsByAssistantId(schoolId, id);
  }

  async getAdminInsights(schoolId: string, id: string): Promise<AiInsight[]> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiAdminAssistantNotFoundError(id);
    return this.repo.findInsightsByAssistantId(schoolId, id);
  }

  async getAdminAnalytics(schoolId: string, id: string): Promise<AiAnalytics> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiAdminAssistantNotFoundError(id);
    return this.repo.findAnalyticsByAssistantId(schoolId, id);
  }
}
