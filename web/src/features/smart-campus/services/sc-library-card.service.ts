import type { SupabaseClient } from '@supabase/supabase-js';
import type { LibraryCard, LibraryCardCreate } from '@educi/types';
import { ScBookNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScLibraryCardService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getCard(schoolId: string, id: string): Promise<LibraryCard> {
    const card = await this.repo.findLibraryCardById(schoolId, id);
    if (!card) throw new ScBookNotFoundError(id);
    return card;
  }

  async listCards(schoolId: string, filters?: Record<string, unknown>): Promise<LibraryCard[]> {
    return this.repo.findAllLibraryCards(schoolId, filters);
  }

  async createCard(schoolId: string, data: LibraryCardCreate): Promise<LibraryCard> {
    return this.repo.createLibraryCard(schoolId, data);
  }

  async updateCard(schoolId: string, id: string, data: Partial<LibraryCardCreate>): Promise<LibraryCard> {
    const existing = await this.repo.findLibraryCardById(schoolId, id);
    if (!existing) throw new ScBookNotFoundError(id);
    return this.repo.updateLibraryCard(schoolId, id, data);
  }

  async deleteCard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLibraryCardById(schoolId, id);
    if (!existing) throw new ScBookNotFoundError(id);
    return this.repo.deleteLibraryCard(schoolId, id);
  }

  async countCards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLibraryCards(schoolId, filters);
  }
}
