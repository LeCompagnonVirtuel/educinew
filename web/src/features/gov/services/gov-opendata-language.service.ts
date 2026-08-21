import type { SupabaseClient } from '@supabase/supabase-js';
import type { Language, LanguageCreate } from '@educi/types';
import { GovLanguageNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovOpendataLanguageService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<Language> {
    const item = await this.repo.findLanguageById(schoolId, id);
    if (!item) throw new GovLanguageNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<Language[]> {
    return this.repo.findAllLanguages(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<LanguageCreate>): Promise<Language> {
    return this.repo.createLanguage(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<LanguageCreate>): Promise<Language> {
    const existing = await this.repo.findLanguageById(schoolId, id);
    if (!existing) throw new GovLanguageNotFoundError(id);
    return this.repo.updateLanguage(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLanguageById(schoolId, id);
    if (!existing) throw new GovLanguageNotFoundError(id);
    return this.repo.deleteLanguage(schoolId, id);
  }
}
