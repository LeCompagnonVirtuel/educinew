import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiParentAssistant, AiParentAssistantQuery, AiParentAssistantCreate, AiParentAssistantUpdate } from '@educi/types';
import { AiParentAssistantNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiParentAssistantService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getAssistant(schoolId: string, id: string): Promise<AiParentAssistant> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiParentAssistantNotFoundError(id);
    return assistant;
  }

  async listAssistants(schoolId: string, query: AiParentAssistantQuery): Promise<AiParentAssistant[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createAssistant(schoolId: string, data: AiParentAssistantCreate): Promise<AiParentAssistant> {
    return this.repo.create(schoolId, data);
  }

  async updateAssistant(schoolId: string, id: string, data: AiParentAssistantUpdate): Promise<AiParentAssistant> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiParentAssistantNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteAssistant(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiParentAssistantNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async getParentSessions(schoolId: string, id: string): Promise<AiSession[]> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiParentAssistantNotFoundError(id);
    return this.repo.findSessionsByAssistantId(schoolId, id);
  }

  async getParentInsights(schoolId: string, id: string): Promise<AiInsight[]> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiParentAssistantNotFoundError(id);
    return this.repo.findInsightsByAssistantId(schoolId, id);
  }

  async getParentRecommendations(schoolId: string, id: string): Promise<AiRecommendation[]> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiParentAssistantNotFoundError(id);
    return this.repo.findRecommendationsByAssistantId(schoolId, id);
  }
}
