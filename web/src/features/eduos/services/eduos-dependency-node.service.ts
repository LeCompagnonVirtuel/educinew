import type { SupabaseClient } from '@supabase/supabase-js';
import type { DependencyNode } from '@educi/types';
import { EduOSDependencyNodeError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDependencyNodeService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDependencyNode(schoolId: string, id: string): Promise<DependencyNode> {
    const item = await this.repo.getDependencyNode(schoolId, id);
    if (!item) throw new EduOSDependencyNodeError(id);
    return item;
  }
  async listDependencyNodes(schoolId: string, filters?: Record<string, unknown>): Promise<DependencyNode[]> {
    return this.repo.listDependencyNodes(schoolId, filters);
  }
  async createDependencyNode(schoolId: string, data: Partial<DependencyNode>): Promise<DependencyNode> {
    return this.repo.createDependencyNode(schoolId, data as any);
  }
  async updateDependencyNode(schoolId: string, id: string, data: Partial<DependencyNode>): Promise<DependencyNode> {
    const existing = await this.repo.getDependencyNode(schoolId, id);
    if (!existing) throw new EduOSDependencyNodeError(id);
    return this.repo.updateDependencyNode(schoolId, id, data as any);
  }
  async deleteDependencyNode(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDependencyNode(schoolId, id);
    if (!existing) throw new EduOSDependencyNodeError(id);
    return this.repo.deleteDependencyNode(schoolId, id);
  }
}

