import type { SupabaseClient } from '@supabase/supabase-js';
import type { RFIDTag, RFIDTagCreate } from '@educi/types';
import { ScRFIDNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScRFIDService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getRFID(schoolId: string, id: string): Promise<RFIDTag> {
    const rfid = await this.repo.findRFIDTagById(schoolId, id);
    if (!rfid) throw new ScRFIDNotFoundError(id);
    return rfid;
  }

  async listRFIDs(schoolId: string, filters?: Record<string, unknown>): Promise<RFIDTag[]> {
    return this.repo.findAllRFIDTags(schoolId, filters);
  }

  async createRFID(schoolId: string, data: RFIDTagCreate): Promise<RFIDTag> {
    return this.repo.createRFIDTag(schoolId, data);
  }

  async updateRFID(schoolId: string, id: string, data: Partial<RFIDTagCreate>): Promise<RFIDTag> {
    const existing = await this.repo.findRFIDTagById(schoolId, id);
    if (!existing) throw new ScRFIDNotFoundError(id);
    return this.repo.updateRFIDTag(schoolId, id, data);
  }

  async deleteRFID(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRFIDTagById(schoolId, id);
    if (!existing) throw new ScRFIDNotFoundError(id);
    return this.repo.deleteRFIDTag(schoolId, id);
  }

  async deactivate(schoolId: string, id: string): Promise<RFIDTag> {
    const existing = await this.repo.findRFIDTagById(schoolId, id);
    if (!existing) throw new ScRFIDNotFoundError(id);
    return this.repo.deactivateRFIDTag(schoolId, id);
  }

  async reactivate(schoolId: string, id: string): Promise<RFIDTag> {
    const existing = await this.repo.findRFIDTagById(schoolId, id);
    if (!existing) throw new ScRFIDNotFoundError(id);
    return this.repo.reactivateRFIDTag(schoolId, id);
  }

  async findByTagCode(schoolId: string, tagCode: string): Promise<RFIDTag | null> {
    return this.repo.findRFIDTagByCode(schoolId, tagCode);
  }

  async countRFIDs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRFIDTags(schoolId, filters);
  }
}
