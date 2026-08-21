import type { SupabaseClient } from '@supabase/supabase-js';
import type { Video } from '@educi/types';
import { LxpVideoNotFoundError, LxpVideoUploadError, LxpVideoStreamingError, LxpVideoTranscodeError, LxpContentNotFoundError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpVideoService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getVideo(schoolId: string, id: string): Promise<Video> {
    const video = await this.repo.findVideoById(schoolId, id);
    if (!video) throw new LxpVideoNotFoundError(id);
    return video;
  }

  async listVideos(courseId: string): Promise<readonly Video[]> {
    return this.repo.findVideos(courseId);
  }

  async uploadVideo(courseId: string, file: File, title: string): Promise<Video> {
    const video = await this.repo.uploadVideo(courseId, file, title);
    if (!video) throw new LxpVideoUploadError();
    return video;
  }

  async getStreamingUrl(schoolId: string, id: string): Promise<string> {
    const video = await this.repo.findVideoById(schoolId, id);
    if (!video) throw new LxpVideoNotFoundError(id);
    const url = await this.repo.getVideoStreamingUrl(id);
    if (!url) throw new LxpVideoStreamingError();
    return url;
  }

  async transcodeVideo(schoolId: string, id: string): Promise<void> {
    const video = await this.repo.findVideoById(schoolId, id);
    if (!video) throw new LxpVideoNotFoundError(id);
    const result = await this.repo.transcodeVideo(id);
    if (!result) throw new LxpVideoTranscodeError();
  }

  async deleteVideo(schoolId: string, id: string): Promise<void> {
    const video = await this.repo.findVideoById(schoolId, id);
    if (!video) throw new LxpVideoNotFoundError(id);
    await this.repo.deleteVideo(id);
  }
}
