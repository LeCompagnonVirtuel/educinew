import type { SupabaseClient } from '@supabase/supabase-js';
import type { Recording } from '@educi/types';
import { LxpRecordingNotFoundError, LxpRecordingStartError, LxpRecordingStopError, LxpRecordingUploadError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpRecordingService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getRecording(schoolId: string, id: string): Promise<Recording> {
    const recording = await this.repo.findRecordingById(schoolId, id);
    if (!recording) throw new LxpRecordingNotFoundError(id);
    return recording;
  }

  async listRecordings(sessionId: string): Promise<readonly Recording[]> {
    return this.repo.findRecordings(sessionId);
  }

  async startRecording(sessionId: string): Promise<boolean> {
    const result = await this.repo.startRecording(sessionId);
    if (!result) throw new LxpRecordingStartError();
    return result;
  }

  async stopRecording(sessionId: string): Promise<Recording> {
    const recording = await this.repo.stopRecording(sessionId);
    if (!recording) throw new LxpRecordingStopError();
    return recording;
  }

  async deleteRecording(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRecordingById(schoolId, id);
    if (!existing) throw new LxpRecordingNotFoundError(id);
    await this.repo.deleteRecording(id);
  }
}
