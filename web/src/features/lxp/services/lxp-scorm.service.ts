import type { SupabaseClient } from '@supabase/supabase-js';
import type { SCORMContent } from '@educi/types';
import { LxpSCORMNotFoundError, LxpSCORMImportError, LxpSCORMExportError, LxpContentNotFoundError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpSCORMService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getSCORM(schoolId: string, id: string): Promise<SCORMContent> {
    const scorm = await this.repo.findSCORMById(schoolId, id);
    if (!scorm) throw new LxpSCORMNotFoundError(id);
    return scorm;
  }

  async listSCORMs(courseId: string): Promise<readonly SCORMContent[]> {
    return this.repo.findSCORMs(courseId);
  }

  async importSCORM(courseId: string, file: File): Promise<SCORMContent> {
    const scorm = await this.repo.importSCORM(courseId, file);
    if (!scorm) throw new LxpSCORMImportError();
    return scorm;
  }

  async exportSCORM(schoolId: string, id: string): Promise<string> {
    const scorm = await this.repo.findSCORMById(schoolId, id);
    if (!scorm) throw new LxpSCORMNotFoundError(id);
    const url = await this.repo.exportSCORM(id);
    if (!url) throw new LxpSCORMExportError();
    return url;
  }

  async deleteSCORM(schoolId: string, id: string): Promise<void> {
    const scorm = await this.repo.findSCORMById(schoolId, id);
    if (!scorm) throw new LxpSCORMNotFoundError(id);
    await this.repo.deleteSCORM(id);
  }
}
