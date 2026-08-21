// Government & National Governance Service - EducationCalendar
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { EducationCalendar, EducationCalendarCreate } from '@educi/types';
import { GovEducationCalendarNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovEducationCalendarService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEducationCalendar(schoolId: string, id: string): Promise<EducationCalendar> {
    const item = await this.repo.findEducationCalendarById(schoolId, id);
    if (!item) throw new GovEducationCalendarNotFoundError(id);
    return item;
  }

  async listEducationCalendars(schoolId: string, filters?: Record<string, unknown>): Promise<EducationCalendar[]> {
    return this.repo.findAllEducationCalendars(schoolId, filters);
  }

  async createEducationCalendar(schoolId: string, data: EducationCalendarCreate): Promise<EducationCalendar> {
    return this.repo.createEducationCalendar(schoolId, data);
  }

  async updateEducationCalendar(schoolId: string, id: string, data: Partial<EducationCalendarCreate>): Promise<EducationCalendar> {
    const existing = await this.repo.findEducationCalendarById(schoolId, id);
    if (!existing) throw new GovEducationCalendarNotFoundError(id);
    return this.repo.updateEducationCalendar(schoolId, id, data);
  }

  async deleteEducationCalendar(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEducationCalendarById(schoolId, id);
    if (!existing) throw new GovEducationCalendarNotFoundError(id);
    return this.repo.deleteEducationCalendar(schoolId, id);
  }

  async countEducationCalendars(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEducationCalendars(schoolId, filters);
  }
}
