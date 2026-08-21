import type { SupabaseClient } from '@supabase/supabase-js';
import type { VisitorInvitation, VisitorInvitationCreate } from '@educi/types';
import { ScVisitorInvitationNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScVisitorInvitationService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getInvitation(schoolId: string, id: string): Promise<VisitorInvitation> {
    const invitation = await this.repo.findVisitorInvitationById(schoolId, id);
    if (!invitation) throw new ScVisitorInvitationNotFoundError(id);
    return invitation;
  }

  async listInvitations(schoolId: string, filters?: Record<string, unknown>): Promise<VisitorInvitation[]> {
    return this.repo.findAllVisitorInvitations(schoolId, filters);
  }

  async createInvitation(schoolId: string, data: VisitorInvitationCreate): Promise<VisitorInvitation> {
    return this.repo.createVisitorInvitation(schoolId, data);
  }

  async updateInvitation(schoolId: string, id: string, data: Partial<VisitorInvitationCreate>): Promise<VisitorInvitation> {
    const existing = await this.repo.findVisitorInvitationById(schoolId, id);
    if (!existing) throw new ScVisitorInvitationNotFoundError(id);
    return this.repo.updateVisitorInvitation(schoolId, id, data);
  }

  async deleteInvitation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findVisitorInvitationById(schoolId, id);
    if (!existing) throw new ScVisitorInvitationNotFoundError(id);
    return this.repo.deleteVisitorInvitation(schoolId, id);
  }

  async countInvitations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countVisitorInvitations(schoolId, filters);
  }
}
