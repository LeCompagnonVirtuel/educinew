import type { SupabaseClient } from '@supabase/supabase-js';
import type { OfflinePackage } from '@educi/types';
import { LxpContentNotFoundError, LxpContentOfflineError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpOfflineService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getOfflinePackage(schoolId: string, courseId: string): Promise<OfflinePackage> {
    const pkg = await this.repo.findOfflinePackageById(schoolId, courseId);
    if (!pkg) throw new LxpContentNotFoundError(courseId);
    return pkg;
  }

  async generateOfflinePackage(courseId: string): Promise<OfflinePackage> {
    const pkg = await this.repo.generateOfflinePackage(courseId);
    if (!pkg) throw new LxpContentOfflineError();
    return pkg;
  }

  async getDownloadUrl(schoolId: string, courseId: string): Promise<string> {
    const pkg = await this.repo.findOfflinePackageById(schoolId, courseId);
    if (!pkg) throw new LxpContentNotFoundError(courseId);
    return pkg.downloadUrl;
  }

  async syncOfflineProgress(courseId: string, userId: string, progress: Record<string, unknown>): Promise<boolean> {
    const result = await this.repo.syncOfflineProgress(courseId, userId, progress);
    if (!result) throw new LxpContentOfflineError();
    return result;
  }

  async deleteOfflinePackage(schoolId: string, courseId: string): Promise<void> {
    const pkg = await this.repo.findOfflinePackageById(schoolId, courseId);
    if (!pkg) throw new LxpContentNotFoundError(courseId);
    await this.repo.deleteOfflinePackage(courseId);
  }
}
