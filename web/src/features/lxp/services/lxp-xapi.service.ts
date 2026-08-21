import type { SupabaseClient } from '@supabase/supabase-js';
import type { XAPIContent } from '@educi/types';
import { LxpXAPINotFoundError, LxpXAPIStatementError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpXAPIService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getXAPIContent(schoolId: string, id: string): Promise<XAPIContent> {
    const content = await this.repo.findXAPIContentById(schoolId, id);
    if (!content) throw new LxpXAPINotFoundError(id);
    return content;
  }

  async listXAPIContents(courseId: string): Promise<readonly XAPIContent[]> {
    return this.repo.findXAPIContents(courseId);
  }

  async createXAPIContent(data: Omit<XAPIContent, 'id' | 'createdAt' | 'updatedAt'>): Promise<XAPIContent> {
    const created = await this.repo.createXAPIContent(data);
    if (!created) throw new LxpXAPIStatementError();
    return created;
  }

  async sendStatement(activityId: string, statement: Record<string, unknown>): Promise<boolean> {
    const result = await this.repo.sendXAPIStatement(activityId, statement);
    if (!result) throw new LxpXAPIStatementError();
    return result;
  }

  async deleteXAPIContent(schoolId: string, id: string): Promise<void> {
    const content = await this.repo.findXAPIContentById(schoolId, id);
    if (!content) throw new LxpXAPINotFoundError(id);
    await this.repo.deleteXAPIContent(id);
  }
}
