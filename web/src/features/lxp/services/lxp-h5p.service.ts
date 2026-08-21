import type { SupabaseClient } from '@supabase/supabase-js';
import type { H5PContent } from '@educi/types';
import { LxpH5PNotFoundError, LxpH5PImportError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpH5PService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getH5PContent(schoolId: string, id: string): Promise<H5PContent> {
    const content = await this.repo.findH5PContentById(schoolId, id);
    if (!content) throw new LxpH5PNotFoundError(id);
    return content;
  }

  async listH5PContents(courseId: string): Promise<readonly H5PContent[]> {
    return this.repo.findH5PContents(courseId);
  }

  async importH5P(courseId: string, file: File): Promise<H5PContent> {
    const content = await this.repo.importH5P(courseId, file);
    if (!content) throw new LxpH5PImportError();
    return content;
  }

  async getEmbedUrl(schoolId: string, id: string): Promise<string> {
    const content = await this.repo.findH5PContentById(schoolId, id);
    if (!content) throw new LxpH5PNotFoundError(id);
    return content.embedUrl;
  }

  async deleteH5PContent(schoolId: string, id: string): Promise<void> {
    const content = await this.repo.findH5PContentById(schoolId, id);
    if (!content) throw new LxpH5PNotFoundError(id);
    await this.repo.deleteH5PContent(id);
  }
}
