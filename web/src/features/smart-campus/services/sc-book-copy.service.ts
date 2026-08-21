import type { SupabaseClient } from '@supabase/supabase-js';
import type { BookCopy, BookCopyCreate } from '@educi/types';
import { ScCopyNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBookCopyService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getCopy(schoolId: string, id: string): Promise<BookCopy> {
    const copy = await this.repo.findBookCopyById(schoolId, id);
    if (!copy) throw new ScCopyNotFoundError(id);
    return copy;
  }

  async listCopies(schoolId: string, filters?: Record<string, unknown>): Promise<BookCopy[]> {
    return this.repo.findAllBookCopies(schoolId, filters);
  }

  async createCopy(schoolId: string, data: BookCopyCreate): Promise<BookCopy> {
    return this.repo.createBookCopy(schoolId, data);
  }

  async updateCopy(schoolId: string, id: string, data: Partial<BookCopyCreate>): Promise<BookCopy> {
    const existing = await this.repo.findBookCopyById(schoolId, id);
    if (!existing) throw new ScCopyNotFoundError(id);
    return this.repo.updateBookCopy(schoolId, id, data);
  }

  async deleteCopy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBookCopyById(schoolId, id);
    if (!existing) throw new ScCopyNotFoundError(id);
    return this.repo.deleteBookCopy(schoolId, id);
  }

  async countCopies(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBookCopies(schoolId, filters);
  }
}
