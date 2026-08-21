import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiPromptTemplate, AiPromptTemplateQuery, AiPromptTemplateCreate, AiPromptTemplateUpdate } from '@educi/types';
import { AiPromptTemplateNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiPromptTemplateService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getTemplate(schoolId: string, id: string): Promise<AiPromptTemplate> {
    const template = await this.repo.findById(schoolId, id);
    if (!template) throw new AiPromptTemplateNotFoundError(id);
    return template;
  }

  async listTemplates(schoolId: string, query: AiPromptTemplateQuery): Promise<AiPromptTemplate[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createTemplate(schoolId: string, data: AiPromptTemplateCreate): Promise<AiPromptTemplate> {
    return this.repo.create(schoolId, data);
  }

  async updateTemplate(schoolId: string, id: string, data: AiPromptTemplateUpdate): Promise<AiPromptTemplate> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiPromptTemplateNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteTemplate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiPromptTemplateNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }
}
