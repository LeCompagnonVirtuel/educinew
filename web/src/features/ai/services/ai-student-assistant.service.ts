import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiStudentAssistant, AiStudentAssistantQuery, AiStudentAssistantCreate, AiStudentAssistantUpdate } from '@educi/types';
import { AiStudentAssistantNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiStudentAssistantService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getAssistant(schoolId: string, id: string): Promise<AiStudentAssistant> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiStudentAssistantNotFoundError(id);
    return assistant;
  }

  async listAssistants(schoolId: string, query: AiStudentAssistantQuery): Promise<AiStudentAssistant[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createAssistant(schoolId: string, data: AiStudentAssistantCreate): Promise<AiStudentAssistant> {
    return this.repo.create(schoolId, data);
  }

  async updateAssistant(schoolId: string, id: string, data: AiStudentAssistantUpdate): Promise<AiStudentAssistant> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiStudentAssistantNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteAssistant(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiStudentAssistantNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async getStudentSessions(schoolId: string, id: string): Promise<AiSession[]> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiStudentAssistantNotFoundError(id);
    return this.repo.findSessionsByAssistantId(schoolId, id);
  }

  async getStudentProgress(schoolId: string, id: string): Promise<AiStudentProgress> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiStudentAssistantNotFoundError(id);
    return this.repo.findProgressByAssistantId(schoolId, id);
  }

  async getStudentRecommendations(schoolId: string, id: string): Promise<AiRecommendation[]> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiStudentAssistantNotFoundError(id);
    return this.repo.findRecommendationsByAssistantId(schoolId, id);
  }

  async getStudentAssessments(schoolId: string, id: string): Promise<AiAssessment[]> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiStudentAssistantNotFoundError(id);
    return this.repo.findAssessmentsByAssistantId(schoolId, id);
  }

  async getStudentFeedback(schoolId: string, id: string): Promise<AiFeedback[]> {
    const assistant = await this.repo.findById(schoolId, id);
    if (!assistant) throw new AiStudentAssistantNotFoundError(id);
    return this.repo.findFeedbackByAssistantId(schoolId, id);
  }
}
