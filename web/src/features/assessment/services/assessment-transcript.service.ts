import type { SupabaseClient } from '@supabase/supabase-js';
import type { TranscriptGenerator, TranscriptGeneratorCreate } from '@educi/types';
import { AssessmentTranscriptGeneratorError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentTranscriptService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getTranscript(schoolId: string, id: string): Promise<TranscriptGenerator> {
    const item = await this.repo.getTranscript(id, schoolId);
    if (!item) throw new AssessmentTranscriptGeneratorError(id);
    return item;
  }
  async listTranscripts(schoolId: string, filters?: Record<string, unknown>): Promise<TranscriptGenerator[]> {
    return this.repo.listTranscripts(schoolId, filters);
  }
  async createTranscript(schoolId: string, data: TranscriptGeneratorCreate): Promise<TranscriptGenerator> {
    return this.repo.createTranscript({ ...data, school_id: schoolId } as any);
  }
  async updateTranscript(schoolId: string, id: string, data: Partial<TranscriptGeneratorCreate>): Promise<TranscriptGenerator> {
    const existing = await this.repo.getTranscript(id, schoolId);
    if (!existing) throw new AssessmentTranscriptGeneratorError(id);
    return this.repo.updateTranscript(id, schoolId, data as any);
  }
  async deleteTranscript(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getTranscript(id, schoolId);
    if (!existing) throw new AssessmentTranscriptGeneratorError(id);
    return this.repo.deleteTranscript(id, schoolId);
  }
}
