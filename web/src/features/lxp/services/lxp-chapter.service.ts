import type { SupabaseClient } from '@supabase/supabase-js';
import type { Chapter, ChapterCreate } from '@educi/types';
import { LxpChapterNotFoundError, LxpChapterCreateError, LxpChapterUpdateError, LxpChapterDeleteError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpChapterService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getChapter(schoolId: string, id: string): Promise<Chapter> {
    const chapter = await this.repo.findChapterById(schoolId, id);
    if (!chapter) throw new LxpChapterNotFoundError(id);
    return chapter;
  }

  async listChapters(lessonId: string): Promise<readonly Chapter[]> {
    return this.repo.findChapters(lessonId);
  }

  async createChapter(data: ChapterCreate): Promise<Chapter> {
    const created = await this.repo.createChapter(data);
    if (!created) throw new LxpChapterCreateError();
    return created;
  }

  async updateChapter(schoolId: string, id: string, data: Partial<ChapterCreate>): Promise<Chapter> {
    const existing = await this.repo.findChapterById(schoolId, id);
    if (!existing) throw new LxpChapterNotFoundError(id);
    const updated = await this.repo.updateChapter(id, data);
    if (!updated) throw new LxpChapterUpdateError();
    return updated;
  }

  async deleteChapter(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findChapterById(schoolId, id);
    if (!existing) throw new LxpChapterNotFoundError(id);
    const deleted = await this.repo.deleteChapter(id);
    if (!deleted) throw new LxpChapterDeleteError();
  }
}
