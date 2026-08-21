import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiSchedule, AiScheduleQuery, AiScheduleCreate, AiScheduleUpdate } from '@educi/types';
import { AiScheduleNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiScheduleService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getSchedule(schoolId: string, id: string): Promise<AiSchedule> {
    const schedule = await this.repo.findById(schoolId, id);
    if (!schedule) throw new AiScheduleNotFoundError(id);
    return schedule;
  }

  async listSchedules(schoolId: string, query: AiScheduleQuery): Promise<AiSchedule[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createSchedule(schoolId: string, data: AiScheduleCreate): Promise<AiSchedule> {
    return this.repo.create(schoolId, data);
  }

  async updateSchedule(schoolId: string, id: string, data: AiScheduleUpdate): Promise<AiSchedule> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiScheduleNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteSchedule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiScheduleNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async getScheduleByDate(schoolId: string, date: string): Promise<AiSchedule[]> {
    return this.repo.findSchedulesByDate(schoolId, date);
  }
}
