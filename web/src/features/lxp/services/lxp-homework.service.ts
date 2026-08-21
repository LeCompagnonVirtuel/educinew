import type { SupabaseClient } from '@supabase/supabase-js';
import type { Homework } from '@educi/types';
import { LxpHomeworkNotFoundError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpHomeworkService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getHomework(schoolId: string, id: string): Promise<Homework> {
    const homework = await this.repo.findHomeworkById(schoolId, id);
    if (!homework) throw new LxpHomeworkNotFoundError(id);
    return homework;
  }

  async listHomeworks(assignmentId: string): Promise<readonly Homework[]> {
    return this.repo.findHomeworks(assignmentId);
  }

  async createHomework(data: Omit<Homework, 'id' | 'createdAt' | 'updatedAt'>): Promise<Homework> {
    const created = await this.repo.createHomework(data);
    if (!created) throw new LxpHomeworkNotFoundError();
    return created;
  }

  async updateHomework(schoolId: string, id: string, data: Partial<Homework>): Promise<Homework> {
    const existing = await this.repo.findHomeworkById(schoolId, id);
    if (!existing) throw new LxpHomeworkNotFoundError(id);
    const updated = await this.repo.updateHomework(id, data);
    if (!updated) throw new LxpHomeworkNotFoundError();
    return updated;
  }

  async deleteHomework(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findHomeworkById(schoolId, id);
    if (!existing) throw new LxpHomeworkNotFoundError(id);
    await this.repo.deleteHomework(id);
  }
}
