import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiTeacherAssistant, AiTeacherAssistantQuery, AiTeacherAssistantCreate, AiTeacherAssistantUpdate } from '@educi/types';
import { AiTeacherAssistantNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiTeacherAssistantService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getAssistant(schoolId: string, id: string): Promise<AiTeacherAssistant> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiTeacherAssistantNotFoundError(id);
    return assistant;
  }

  async listAssistants(schoolId: string, query: AiTeacherAssistantQuery): Promise<AiTeacherAssistant[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createAssistant(schoolId: string, data: AiTeacherAssistantCreate): Promise<AiTeacherAssistant> {
    return this.repo.create(schoolId, data);
  }

  async updateAssistant(schoolId: string, id: string, data: AiTeacherAssistantUpdate): Promise<AiTeacherAssistant> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiTeacherAssistantNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteAssistant(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiTeacherAssistantNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async getTeacherSessions(schoolId: string, id: string): Promise<AiSession[]> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiTeacherAssistantNotFoundError(id);
    return this.repo.findSessionsByAssistantId(schoolId, id);
  }

  async getTeacherInsights(schoolId: string, id: string): Promise<AiInsight[]> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiTeacherAssistantNotFoundError(id);
    return this.repo.findInsightsByAssistantId(schoolId, id);
  }

  async getTeacherAnalytics(schoolId: string, id: string): Promise<AiAnalytics> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiTeacherAssistantNotFoundError(id);
    return this.repo.findAnalyticsByAssistantId(schoolId, id);
  }

  async getTeacherCurriculum(schoolId: string, id: string): Promise<AiCurriculum[]> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiTeacherAssistantNotFoundError(id);
    return this.repo.findCurriculumByAssistantId(schoolId, id);
  }

  async getTeacherResources(schoolId: string, id: string): Promise<AiResource[]> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiTeacherAssistantNotFoundError(id);
    return this.repo.findResourcesByAssistantId(schoolId, id);
  }
}
