// Enterprise Platform Service - DeveloperDocumentation
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DeveloperDocumentation, DeveloperDocumentationCreate } from '@educi/types';
import { EntDeveloperDocumentationNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDeveloperDocumentationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDeveloperDocumentation(schoolId: string, id: string): Promise<DeveloperDocumentation> {
    const item = await this.repo.findDeveloperDocumentationById(schoolId, id);
    if (!item) throw new EntDeveloperDocumentationNotFoundError(id);
    return item;
  }
  async listDeveloperDocumentations(schoolId: string, filters?: Record<string, unknown>): Promise<DeveloperDocumentation[]> {
    return this.repo.findAllDeveloperDocumentations(schoolId, filters);
  }
  async createDeveloperDocumentation(schoolId: string, data: DeveloperDocumentationCreate): Promise<DeveloperDocumentation> {
    return this.repo.createDeveloperDocumentation(schoolId, data);
  }
  async updateDeveloperDocumentation(schoolId: string, id: string, data: Partial<DeveloperDocumentationCreate>): Promise<DeveloperDocumentation> {
    const existing = await this.repo.findDeveloperDocumentationById(schoolId, id);
    if (!existing) throw new EntDeveloperDocumentationNotFoundError(id);
    return this.repo.updateDeveloperDocumentation(schoolId, id, data);
  }
  async deleteDeveloperDocumentation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDeveloperDocumentationById(schoolId, id);
    if (!existing) throw new EntDeveloperDocumentationNotFoundError(id);
    return this.repo.deleteDeveloperDocumentation(schoolId, id);
  }
  async countDeveloperDocumentations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDeveloperDocumentations(schoolId, filters);
  }
}
