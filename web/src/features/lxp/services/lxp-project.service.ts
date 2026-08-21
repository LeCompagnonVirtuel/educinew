import type { SupabaseClient } from '@supabase/supabase-js';
import type { Project } from '@educi/types';
import { LxpProjectNotFoundError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpProjectService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getProject(schoolId: string, id: string): Promise<Project> {
    const project = await this.repo.findProjectById(schoolId, id);
    if (!project) throw new LxpProjectNotFoundError(id);
    return project;
  }

  async listProjects(assignmentId: string): Promise<readonly Project[]> {
    return this.repo.findProjects(assignmentId);
  }

  async createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const created = await this.repo.createProject(data);
    if (!created) throw new LxpProjectNotFoundError();
    return created;
  }

  async updateProject(schoolId: string, id: string, data: Partial<Project>): Promise<Project> {
    const existing = await this.repo.findProjectById(schoolId, id);
    if (!existing) throw new LxpProjectNotFoundError(id);
    const updated = await this.repo.updateProject(id, data);
    if (!updated) throw new LxpProjectNotFoundError();
    return updated;
  }

  async deleteProject(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findProjectById(schoolId, id);
    if (!existing) throw new LxpProjectNotFoundError(id);
    await this.repo.deleteProject(id);
  }
}
