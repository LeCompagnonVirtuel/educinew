import type { SupabaseClient } from '@supabase/supabase-js';
import type { DependencyGraph } from '@educi/types';
import { EduOSDependencyGraphError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDependencyGraphService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDependencyGraph(schoolId: string, id: string): Promise<DependencyGraph> {
    const item = await this.repo.getDependencyGraph(schoolId, id);
    if (!item) throw new EduOSDependencyGraphError(id);
    return item;
  }
  async listDependencyGraphs(schoolId: string, filters?: Record<string, unknown>): Promise<DependencyGraph[]> {
    return this.repo.listDependencyGraphs(schoolId, filters);
  }
  async createDependencyGraph(schoolId: string, data: Partial<DependencyGraph>): Promise<DependencyGraph> {
    return this.repo.createDependencyGraph(schoolId, data as any);
  }
  async updateDependencyGraph(schoolId: string, id: string, data: Partial<DependencyGraph>): Promise<DependencyGraph> {
    const existing = await this.repo.getDependencyGraph(schoolId, id);
    if (!existing) throw new EduOSDependencyGraphError(id);
    return this.repo.updateDependencyGraph(schoolId, id, data as any);
  }
  async deleteDependencyGraph(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDependencyGraph(schoolId, id);
    if (!existing) throw new EduOSDependencyGraphError(id);
    return this.repo.deleteDependencyGraph(schoolId, id);
  }
}

