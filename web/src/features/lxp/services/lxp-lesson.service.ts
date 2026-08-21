import type { SupabaseClient } from '@supabase/supabase-js';
import type { Lesson, LessonCreate, LessonUpdate, LessonFilter } from '@educi/types';
import { LxpLessonNotFoundError, LxpLessonCreateError, LxpLessonUpdateError, LxpLessonDeleteError, LxpContentNotFoundError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpLessonService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getLesson(schoolId: string, id: string): Promise<Lesson> {
    const lesson = await this.repo.findLessonById(schoolId, id);
    if (!lesson) throw new LxpLessonNotFoundError(id);
    return lesson;
  }

  async listLessons(moduleId: string, filters: LessonFilter): Promise<readonly Lesson[]> {
    return this.repo.findLessons(moduleId, filters);
  }

  async createLesson(data: LessonCreate): Promise<Lesson> {
    const created = await this.repo.createLesson(data);
    if (!created) throw new LxpLessonCreateError();
    return created;
  }

  async updateLesson(schoolId: string, id: string, data: LessonUpdate): Promise<Lesson> {
    const existing = await this.repo.findLessonById(schoolId, id);
    if (!existing) throw new LxpLessonNotFoundError(id);
    const updated = await this.repo.updateLesson(id, data);
    if (!updated) throw new LxpLessonUpdateError();
    return updated;
  }

  async deleteLesson(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLessonById(schoolId, id);
    if (!existing) throw new LxpLessonNotFoundError(id);
    const deleted = await this.repo.deleteLesson(id);
    if (!deleted) throw new LxpLessonDeleteError();
  }

  async getLessonContent(lessonId: string): Promise<Lesson> {
    const lesson = await this.repo.findLessonById(lessonId, lessonId);
    if (!lesson) throw new LxpContentNotFoundError(lessonId);
    return lesson;
  }
}
