import type { SupabaseClient } from '@supabase/supabase-js';
import type { EmergencyContact, EmergencyContactCreate } from '@educi/types';
import { ScEmergencyContactNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScEmergencyContactService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getContact(schoolId: string, id: string): Promise<EmergencyContact> {
    const contact = await this.repo.findEmergencyContactById(schoolId, id);
    if (!contact) throw new ScEmergencyContactNotFoundError(id);
    return contact;
  }

  async listContacts(schoolId: string, filters?: Record<string, unknown>): Promise<EmergencyContact[]> {
    return this.repo.findAllEmergencyContacts(schoolId, filters);
  }

  async createContact(schoolId: string, data: EmergencyContactCreate): Promise<EmergencyContact> {
    return this.repo.createEmergencyContact(schoolId, data);
  }

  async updateContact(schoolId: string, id: string, data: Partial<EmergencyContactCreate>): Promise<EmergencyContact> {
    const existing = await this.repo.findEmergencyContactById(schoolId, id);
    if (!existing) throw new ScEmergencyContactNotFoundError(id);
    return this.repo.updateEmergencyContact(schoolId, id, data);
  }

  async deleteContact(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEmergencyContactById(schoolId, id);
    if (!existing) throw new ScEmergencyContactNotFoundError(id);
    return this.repo.deleteEmergencyContact(schoolId, id);
  }

  async countContacts(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEmergencyContacts(schoolId, filters);
  }
}
