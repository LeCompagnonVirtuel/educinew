import type { SupabaseClient } from '@supabase/supabase-js';
import type { EBook, EBookCreate } from '@educi/types';
import { ScEBookNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScEBookService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getEBook(schoolId: string, id: string): Promise<EBook> {
    const ebook = await this.repo.findEBookById(schoolId, id);
    if (!ebook) throw new ScEBookNotFoundError(id);
    return ebook;
  }

  async listEBooks(schoolId: string, filters?: Record<string, unknown>): Promise<EBook[]> {
    return this.repo.findAllEBooks(schoolId, filters);
  }

  async createEBook(schoolId: string, data: EBookCreate): Promise<EBook> {
    return this.repo.createEBook(schoolId, data);
  }

  async updateEBook(schoolId: string, id: string, data: Partial<EBookCreate>): Promise<EBook> {
    const existing = await this.repo.findEBookById(schoolId, id);
    if (!existing) throw new ScEBookNotFoundError(id);
    return this.repo.updateEBook(schoolId, id, data);
  }

  async deleteEBook(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEBookById(schoolId, id);
    if (!existing) throw new ScEBookNotFoundError(id);
    return this.repo.deleteEBook(schoolId, id);
  }

  async countEBooks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEBooks(schoolId, filters);
  }
}
