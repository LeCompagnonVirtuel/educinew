import type { SupabaseClient } from '@supabase/supabase-js';
import type { EducationCalendar, EducationCalendarCreate } from '@educi/types';
import { GovEducationCalendarNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovMinistryEducationCalendarService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<EducationCalendar> {
    const item = await this.repo.findEducationCalendarById(schoolId, id);
    if (!item) throw new GovEducationCalendarNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<EducationCalendar[]> {
    return this.repo.findAllEducationCalendars(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<EducationCalendarCreate>): Promise<EducationCalendar> {
    return this.repo.createEducationCalendar(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<EducationCalendarCreate>): Promise<EducationCalendar> {
    const existing = await this.repo.findEducationCalendarById(schoolId, id);
    if (!existing) throw new GovEducationCalendarNotFoundError(id);
    return this.repo.updateEducationCalendar(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEducationCalendarById(schoolId, id);
    if (!existing) throw new GovEducationCalendarNotFoundError(id);
    return this.repo.deleteEducationCalendar(schoolId, id);
  }
}
