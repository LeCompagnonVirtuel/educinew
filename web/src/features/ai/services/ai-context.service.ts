import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiContext, AiContextQuery, AiContextCreate, AiContextUpdate } from '@educi/types';
import { AiContextNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiContextService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getContext(schoolId: string, id: string): Promise<AiContext> {
    const context = await this.repo.findById(schoolId, id);
    if (!context) throw new AiContextNotFoundError(id);
    return context;
  }

  async listContexts(schoolId: string, query: AiContextQuery): Promise<AiContext[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createContext(schoolId: string, data: AiContextCreate): Promise<AiContext> {
    return this.repo.create(schoolId, data);
  }

  async updateContext(schoolId: string, id: string, data: AiContextUpdate): Promise<AiContext> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiContextNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteContext(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiContextNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async getContextBySession(schoolId: string, sessionId: string): Promise<AiContext> {
    return this.repo.findContextBySessionId(schoolId, sessionId);
  }
}
