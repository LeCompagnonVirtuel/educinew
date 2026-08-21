import type { SupabaseClient } from '@supabase/supabase-js';
import type { CourseModule, ModuleCreate, ModuleUpdate, ModuleFilter } from '@educi/types';
import { LxpModuleNotFoundError, LxpModuleCreateError, LxpModuleUpdateError, LxpModuleDeleteError, LxpCourseNotFoundError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpModuleService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getModule(schoolId: string, id: string): Promise<CourseModule> {
    const courseModule = await this.repo.findModuleById(schoolId, id);
    if (!courseModule) throw new LxpModuleNotFoundError(id);
    return courseModule;
  }

  async listModules(courseId: string, filters: ModuleFilter): Promise<readonly CourseModule[]> {
    return this.repo.findModules(courseId, filters);
  }

  async createModule(data: ModuleCreate): Promise<CourseModule> {
    const course = await this.repo.findCourseById(data.courseId, data.courseId);
    if (!course) throw new LxpCourseNotFoundError(data.courseId);
    const created = await this.repo.createModule(data);
    if (!created) throw new LxpModuleCreateError();
    return created;
  }

  async updateModule(schoolId: string, id: string, data: ModuleUpdate): Promise<CourseModule> {
    const existing = await this.repo.findModuleById(schoolId, id);
    if (!existing) throw new LxpModuleNotFoundError(id);
    const updated = await this.repo.updateModule(id, data);
    if (!updated) throw new LxpModuleUpdateError();
    return updated;
  }

  async deleteModule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findModuleById(schoolId, id);
    if (!existing) throw new LxpModuleNotFoundError(id);
    const deleted = await this.repo.deleteModule(id);
    if (!deleted) throw new LxpModuleDeleteError();
  }
}
