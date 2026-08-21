// Government & National Governance Service - Language
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Language, LanguageCreate } from '@educi/types';
import { GovLanguageNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovLanguageService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getLanguage(schoolId: string, id: string): Promise<Language> {
    const item = await this.repo.findLanguageById(schoolId, id);
    if (!item) throw new GovLanguageNotFoundError(id);
    return item;
  }

  async listLanguages(schoolId: string, filters?: Record<string, unknown>): Promise<Language[]> {
    return this.repo.findAllLanguages(schoolId, filters);
  }

  async createLanguage(schoolId: string, data: LanguageCreate): Promise<Language> {
    return this.repo.createLanguage(schoolId, data);
  }

  async updateLanguage(schoolId: string, id: string, data: Partial<LanguageCreate>): Promise<Language> {
    const existing = await this.repo.findLanguageById(schoolId, id);
    if (!existing) throw new GovLanguageNotFoundError(id);
    return this.repo.updateLanguage(schoolId, id, data);
  }

  async deleteLanguage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLanguageById(schoolId, id);
    if (!existing) throw new GovLanguageNotFoundError(id);
    return this.repo.deleteLanguage(schoolId, id);
  }

  async countLanguages(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLanguages(schoolId, filters);
  }
}
