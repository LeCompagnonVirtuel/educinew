import type { SupabaseClient } from '@supabase/supabase-js';
import type { Audio } from '@educi/types';
import { LxpAudioNotFoundError, LxpAudioUploadError, LxpAudioStreamingError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpAudioService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getAudio(schoolId: string, id: string): Promise<Audio> {
    const audio = await this.repo.findAudioById(schoolId, id);
    if (!audio) throw new LxpAudioNotFoundError(id);
    return audio;
  }

  async listAudios(courseId: string): Promise<readonly Audio[]> {
    return this.repo.findAudios(courseId);
  }

  async uploadAudio(courseId: string, file: File, title: string): Promise<Audio> {
    const audio = await this.repo.uploadAudio(courseId, file, title);
    if (!audio) throw new LxpAudioUploadError();
    return audio;
  }

  async getStreamingUrl(schoolId: string, id: string): Promise<string> {
    const audio = await this.repo.findAudioById(schoolId, id);
    if (!audio) throw new LxpAudioNotFoundError(id);
    const url = await this.repo.getAudioStreamingUrl(id);
    if (!url) throw new LxpAudioStreamingError();
    return url;
  }

  async deleteAudio(schoolId: string, id: string): Promise<void> {
    const audio = await this.repo.findAudioById(schoolId, id);
    if (!audio) throw new LxpAudioNotFoundError(id);
    await this.repo.deleteAudio(id);
  }
}
