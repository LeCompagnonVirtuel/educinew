import type { SupabaseClient } from '@supabase/supabase-js';
import type { RAGOrchestrator } from '@educi/types';
import { EduOSRAGOrchestratorError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSRAGOrchestratorService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getRAGOrchestrator(schoolId: string, id: string): Promise<RAGOrchestrator> {
    const item = await this.repo.getRAGOrchestrator(schoolId, id);
    if (!item) throw new EduOSRAGOrchestratorError(id);
    return item;
  }
  async listRAGOrchestrators(schoolId: string, filters?: Record<string, unknown>): Promise<RAGOrchestrator[]> {
    return this.repo.listRAGOrchestrators(schoolId, filters);
  }
  async createRAGOrchestrator(schoolId: string, data: Partial<RAGOrchestrator>): Promise<RAGOrchestrator> {
    return this.repo.createRAGOrchestrator(schoolId, data as any);
  }
  async updateRAGOrchestrator(schoolId: string, id: string, data: Partial<RAGOrchestrator>): Promise<RAGOrchestrator> {
    const existing = await this.repo.getRAGOrchestrator(schoolId, id);
    if (!existing) throw new EduOSRAGOrchestratorError(id);
    return this.repo.updateRAGOrchestrator(schoolId, id, data as any);
  }
  async deleteRAGOrchestrator(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRAGOrchestrator(schoolId, id);
    if (!existing) throw new EduOSRAGOrchestratorError(id);
    return this.repo.deleteRAGOrchestrator(schoolId, id);
  }
}

