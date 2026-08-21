import { SupabaseClient } from '@supabase/supabase-js';
import { TranscriptExchangeService } from './gei2p-transcripts-transcript-exchange.service';

export interface Transcript {
  id: string;
  school_id: string;
  [key: string]: unknown;
}

export class InteroperabilityTranscriptService {
  private readonly transcriptService: TranscriptExchangeService;

  constructor(supabase: SupabaseClient) {
    this.transcriptService = new TranscriptExchangeService(supabase);
  }

  async listTranscripts(schoolId: string, filters?: Record<string, unknown>): Promise<Transcript[]> {
    return this.transcriptService.listEntities(schoolId, filters) as Promise<Transcript[]>;
  }

  async getTranscript(schoolId: string, id: string): Promise<Transcript | null> {
    const entity = await this.transcriptService.getEntity(id);
    if (entity && (entity as Transcript).school_id === schoolId) return entity as Transcript;
    return null;
  }

  async createTranscript(schoolId: string, userId: string, data: Record<string, unknown>): Promise<Transcript | null> {
    return this.transcriptService.createEntity({ ...data, school_id: schoolId } as Parameters<TranscriptExchangeService['createEntity']>[0]) as Promise<Transcript | null>;
  }

  async updateTranscript(schoolId: string, id: string, data: Record<string, unknown>): Promise<Transcript | null> {
    const entity = await this.transcriptService.getEntity(id);
    if (!entity || (entity as Transcript).school_id !== schoolId) return null;
    return this.transcriptService.updateEntity(id, data as Parameters<TranscriptExchangeService['updateEntity']>[1]) as Promise<Transcript | null>;
  }

  async deleteTranscript(schoolId: string, id: string): Promise<boolean> {
    const entity = await this.transcriptService.getEntity(id);
    if (!entity || (entity as Transcript).school_id !== schoolId) return false;
    return this.transcriptService.deleteEntity(id);
  }
}
