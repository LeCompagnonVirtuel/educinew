import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiAlert, AiAlertQuery, AiAlertCreate, AiAlertUpdate } from '@educi/types';
import { AiAlertNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiAlertService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getAlert(schoolId: string, id: string): Promise<AiAlert> {
    const alert = await this.repo.findById(schoolId, id);
    if (!alert) throw new AiAlertNotFoundError(id);
    return alert;
  }

  async listAlerts(schoolId: string, query: AiAlertQuery): Promise<AiAlert[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createAlert(schoolId: string, data: AiAlertCreate): Promise<AiAlert> {
    return this.repo.create(schoolId, data);
  }

  async updateAlert(schoolId: string, id: string, data: AiAlertUpdate): Promise<AiAlert> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiAlertNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteAlert(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiAlertNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }
}
