import type { SupabaseClient } from '@supabase/supabase-js';
import type { EPUBContent } from '@educi/types';
import { LxpEPUBNotFoundError, LxpEPUBRenderError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpEPUBService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getEPUB(schoolId: string, id: string): Promise<EPUBContent> {
    const epub = await this.repo.findEPUBById(schoolId, id);
    if (!epub) throw new LxpEPUBNotFoundError(id);
    return epub;
  }

  async listEPUBs(courseId: string): Promise<readonly EPUBContent[]> {
    return this.repo.findEPUBs(courseId);
  }

  async uploadEPUB(courseId: string, file: File, title: string): Promise<EPUBContent> {
    const epub = await this.repo.uploadEPUB(courseId, file, title);
    if (!epub) throw new LxpEPUBRenderError();
    return epub;
  }

  async getRenderUrl(schoolId: string, id: string): Promise<string> {
    const epub = await this.repo.findEPUBById(schoolId, id);
    if (!epub) throw new LxpEPUBNotFoundError(id);
    const url = await this.repo.getEPUBRenderUrl(id);
    if (!url) throw new LxpEPUBRenderError();
    return url;
  }

  async deleteEPUB(schoolId: string, id: string): Promise<void> {
    const epub = await this.repo.findEPUBById(schoolId, id);
    if (!epub) throw new LxpEPUBNotFoundError(id);
    await this.repo.deleteEPUB(id);
  }
}
