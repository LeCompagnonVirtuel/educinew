import type { SupabaseClient } from '@supabase/supabase-js';
import type { CourseVersion } from '@educi/types';
import { LxpCourseVersionError, LxpCourseNotFoundError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpCourseVersionService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getVersion(schoolId: string, courseId: string, versionId: string): Promise<CourseVersion> {
    const course = await this.repo.findCourseById(schoolId, courseId);
    if (!course) throw new LxpCourseNotFoundError(courseId);
    const version = await this.repo.findCourseVersionById(courseId, versionId);
    if (!version) throw new LxpCourseVersionError();
    return version;
  }

  async listVersions(courseId: string): Promise<readonly CourseVersion[]> {
    return this.repo.findCourseVersions(courseId);
  }

  async createVersion(courseId: string, changeNotes: string): Promise<CourseVersion> {
    const version = await this.repo.createCourseVersion(courseId, changeNotes);
    if (!version) throw new LxpCourseVersionError();
    return version;
  }

  async publishVersion(courseId: string, versionId: string): Promise<CourseVersion> {
    const version = await this.repo.publishCourseVersion(courseId, versionId);
    if (!version) throw new LxpCourseVersionError();
    return version;
  }

  async revertToVersion(courseId: string, versionId: string): Promise<CourseVersion> {
    const version = await this.repo.revertCourseToVersion(courseId, versionId);
    if (!version) throw new LxpCourseVersionError();
    return version;
  }
}
