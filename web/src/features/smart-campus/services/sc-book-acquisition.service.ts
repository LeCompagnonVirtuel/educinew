import type { SupabaseClient } from '@supabase/supabase-js';
import type { BookAcquisition, BookAcquisitionCreate } from '@educi/types';
import { ScAcquisitionNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBookAcquisitionService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getAcquisition(schoolId: string, id: string): Promise<BookAcquisition> {
    const acquisition = await this.repo.findBookAcquisitionById(schoolId, id);
    if (!acquisition) throw new ScAcquisitionNotFoundError(id);
    return acquisition;
  }

  async listAcquisitions(schoolId: string, filters?: Record<string, unknown>): Promise<BookAcquisition[]> {
    return this.repo.findAllBookAcquisitions(schoolId, filters);
  }

  async createAcquisition(schoolId: string, data: BookAcquisitionCreate): Promise<BookAcquisition> {
    return this.repo.createBookAcquisition(schoolId, data);
  }

  async updateAcquisition(schoolId: string, id: string, data: Partial<BookAcquisitionCreate>): Promise<BookAcquisition> {
    const existing = await this.repo.findBookAcquisitionById(schoolId, id);
    if (!existing) throw new ScAcquisitionNotFoundError(id);
    return this.repo.updateBookAcquisition(schoolId, id, data);
  }

  async deleteAcquisition(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBookAcquisitionById(schoolId, id);
    if (!existing) throw new ScAcquisitionNotFoundError(id);
    return this.repo.deleteBookAcquisition(schoolId, id);
  }

  async countAcquisitions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBookAcquisitions(schoolId, filters);
  }
}
