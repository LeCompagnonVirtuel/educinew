import type { SupabaseClient } from '@supabase/supabase-js';
import type { VisitorQR, VisitorQRCreate } from '@educi/types';
import { ScVisitorQRNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScVisitorQRService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getQR(schoolId: string, id: string): Promise<VisitorQR> {
    const qr = await this.repo.findVisitorQRById(schoolId, id);
    if (!qr) throw new ScVisitorQRNotFoundError(id);
    return qr;
  }

  async listQRs(schoolId: string, filters?: Record<string, unknown>): Promise<VisitorQR[]> {
    return this.repo.findAllVisitorQRs(schoolId, filters);
  }

  async createQR(schoolId: string, data: VisitorQRCreate): Promise<VisitorQR> {
    return this.repo.createVisitorQR(schoolId, data);
  }

  async updateQR(schoolId: string, id: string, data: Partial<VisitorQRCreate>): Promise<VisitorQR> {
    const existing = await this.repo.findVisitorQRById(schoolId, id);
    if (!existing) throw new ScVisitorQRNotFoundError(id);
    return this.repo.updateVisitorQR(schoolId, id, data);
  }

  async deleteQR(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findVisitorQRById(schoolId, id);
    if (!existing) throw new ScVisitorQRNotFoundError(id);
    return this.repo.deleteVisitorQR(schoolId, id);
  }

  async countQRs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countVisitorQRs(schoolId, filters);
  }
}

export const ScVisitorQrService = ScVisitorQRService;
