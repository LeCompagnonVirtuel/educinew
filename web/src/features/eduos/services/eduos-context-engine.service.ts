import type { SupabaseClient } from '@supabase/supabase-js';
import type { ContextEngine } from '@educi/types';
import { EduOSContextEngineError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSContextEngineService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getContextEngine(schoolId: string, id: string): Promise<ContextEngine> {
    const item = await this.repo.getContextEngine(schoolId, id);
    if (!item) throw new EduOSContextEngineError(id);
    return item;
  }
  async listContextEngines(schoolId: string, filters?: Record<string, unknown>): Promise<ContextEngine[]> {
    return this.repo.listContextEngines(schoolId, filters);
  }
  async createContextEngine(schoolId: string, data: Partial<ContextEngine>): Promise<ContextEngine> {
    return this.repo.createContextEngine(schoolId, data as any);
  }
  async updateContextEngine(schoolId: string, id: string, data: Partial<ContextEngine>): Promise<ContextEngine> {
    const existing = await this.repo.getContextEngine(schoolId, id);
    if (!existing) throw new EduOSContextEngineError(id);
    return this.repo.updateContextEngine(schoolId, id, data as any);
  }
  async deleteContextEngine(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getContextEngine(schoolId, id);
    if (!existing) throw new EduOSContextEngineError(id);
    return this.repo.deleteContextEngine(schoolId, id);
  }
}

