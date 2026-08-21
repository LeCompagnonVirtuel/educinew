import type { SupabaseClient } from '@supabase/supabase-js';
import type { CourseTemplate, CourseTemplateQuery, CourseTemplateListResult } from '@educi/types';
import { LxpTemplateNotFoundError, LxpTemplateCreateError, LxpCourseTemplateError, LxpCourseNotFoundError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpCourseTemplateService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getTemplate(schoolId: string, id: string): Promise<CourseTemplate> {
    const template = await this.repo.findCourseTemplateById(schoolId, id);
    if (!template) throw new LxpTemplateNotFoundError(id);
    return template;
  }

  async listTemplates(schoolId: string, query: CourseTemplateQuery): Promise<CourseTemplateListResult> {
    return this.repo.findCourseTemplates(schoolId, query);
  }

  async createTemplate(data: Omit<CourseTemplate, 'id' | 'createdAt' | 'updatedAt' | 'usageCount' | 'moduleCount' | 'lessonCount'>): Promise<CourseTemplate> {
    const created = await this.repo.createCourseTemplate(data);
    if (!created) throw new LxpTemplateCreateError();
    return created;
  }

  async applyTemplate(schoolId: string, templateId: string, courseId: string): Promise<void> {
    const template = await this.repo.findCourseTemplateById(schoolId, templateId);
    if (!template) throw new LxpTemplateNotFoundError(templateId);
    const course = await this.repo.findCourseById(schoolId, courseId);
    if (!course) throw new LxpCourseNotFoundError(courseId);
    const applied = await this.repo.applyCourseTemplate(templateId, courseId);
    if (!applied) throw new LxpCourseTemplateError();
  }

  async deleteTemplate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCourseTemplateById(schoolId, id);
    if (!existing) throw new LxpTemplateNotFoundError(id);
    await this.repo.deleteCourseTemplate(id);
  }
}
