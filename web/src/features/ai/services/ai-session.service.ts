import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiSession, AiSessionQuery, AiSessionCreate, AiSessionUpdate } from '@educi/types';
import { AiSessionNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiSessionService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getSession(schoolId: string, id: string): Promise<AiSession> {
    const session = await this.repo.findById(schoolId, id);
    if (!session) throw new AiSessionNotFoundError(id);
    return session;
  }

  async listSessions(schoolId: string, query: AiSessionQuery): Promise<AiSession[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createSession(schoolId: string, data: AiSessionCreate): Promise<AiSession> {
    return this.repo.create(schoolId, data);
  }

  async updateSession(schoolId: string, id: string, data: AiSessionUpdate): Promise<AiSession> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiSessionNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteSession(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiSessionNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async endSession(schoolId: string, id: string): Promise<AiSession> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiSessionNotFoundError(id);
    return this.repo.update(schoolId, id, { status: 'ended', endedAt: new Date().toISOString() });
  }

  async getSessionMessages(schoolId: string, id: string): Promise<AiMessage[]> {
    const session = await this.repo.findById(schoolId, id);
    if (!session) throw new AiSessionNotFoundError(id);
    return this.repo.findMessagesBySessionId(schoolId, id);
  }

  async getSessionContext(schoolId: string, id: string): Promise<AiContext> {
    const session = await this.repo.findById(schoolId, id);
    if (!session) throw new AiSessionNotFoundError(id);
    return this.repo.findContextBySessionId(schoolId, id);
  }
}
