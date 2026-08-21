import type { SupabaseClient } from '@supabase/supabase-js';
import type { DependencyEdge } from '@educi/types';
import { EduOSDependencyEdgeError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDependencyEdgeService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDependencyEdge(schoolId: string, id: string): Promise<DependencyEdge> {
    const item = await this.repo.getDependencyEdge(schoolId, id);
    if (!item) throw new EduOSDependencyEdgeError(id);
    return item;
  }
  async listDependencyEdges(schoolId: string, filters?: Record<string, unknown>): Promise<DependencyEdge[]> {
    return this.repo.listDependencyEdges(schoolId, filters);
  }
  async createDependencyEdge(schoolId: string, data: Partial<DependencyEdge>): Promise<DependencyEdge> {
    return this.repo.createDependencyEdge(schoolId, data as any);
  }
  async updateDependencyEdge(schoolId: string, id: string, data: Partial<DependencyEdge>): Promise<DependencyEdge> {
    const existing = await this.repo.getDependencyEdge(schoolId, id);
    if (!existing) throw new EduOSDependencyEdgeError(id);
    return this.repo.updateDependencyEdge(schoolId, id, data as any);
  }
  async deleteDependencyEdge(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDependencyEdge(schoolId, id);
    if (!existing) throw new EduOSDependencyEdgeError(id);
    return this.repo.deleteDependencyEdge(schoolId, id);
  }
}

