import type { SupabaseClient } from '@supabase/supabase-js';
import type { VisitorRegistration, VisitorRegistrationCreate } from '@educi/types';
import { ScVisitorRegistrationNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScVisitorRegistrationService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getRegistration(schoolId: string, id: string): Promise<VisitorRegistration> {
    const registration = await this.repo.findVisitorRegistrationById(schoolId, id);
    if (!registration) throw new ScVisitorRegistrationNotFoundError(id);
    return registration;
  }

  async listRegistrations(schoolId: string, filters?: Record<string, unknown>): Promise<VisitorRegistration[]> {
    return this.repo.findAllVisitorRegistrations(schoolId, filters);
  }

  async createRegistration(schoolId: string, data: VisitorRegistrationCreate): Promise<VisitorRegistration> {
    return this.repo.createVisitorRegistration(schoolId, data);
  }

  async updateRegistration(schoolId: string, id: string, data: Partial<VisitorRegistrationCreate>): Promise<VisitorRegistration> {
    const existing = await this.repo.findVisitorRegistrationById(schoolId, id);
    if (!existing) throw new ScVisitorRegistrationNotFoundError(id);
    return this.repo.updateVisitorRegistration(schoolId, id, data);
  }

  async deleteRegistration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findVisitorRegistrationById(schoolId, id);
    if (!existing) throw new ScVisitorRegistrationNotFoundError(id);
    return this.repo.deleteVisitorRegistration(schoolId, id);
  }

  async countRegistrations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countVisitorRegistrations(schoolId, filters);
  }
}
