import type { SupabaseClient } from '@supabase/supabase-js';
import type { BookReturn, BookReturnCreate } from '@educi/types';
import { ScReturnNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBookReturnService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getReturn(schoolId: string, id: string): Promise<BookReturn> {
    const bookReturn = await this.repo.findBookReturnById(schoolId, id);
    if (!bookReturn) throw new ScReturnNotFoundError(id);
    return bookReturn;
  }

  async listReturns(schoolId: string, filters?: Record<string, unknown>): Promise<BookReturn[]> {
    return this.repo.findAllBookReturns(schoolId, filters);
  }

  async createReturn(schoolId: string, data: BookReturnCreate): Promise<BookReturn> {
    return this.repo.createBookReturn(schoolId, data);
  }

  async updateReturn(schoolId: string, id: string, data: Partial<BookReturnCreate>): Promise<BookReturn> {
    const existing = await this.repo.findBookReturnById(schoolId, id);
    if (!existing) throw new ScReturnNotFoundError(id);
    return this.repo.updateBookReturn(schoolId, id, data);
  }

  async deleteReturn(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBookReturnById(schoolId, id);
    if (!existing) throw new ScReturnNotFoundError(id);
    return this.repo.deleteBookReturn(schoolId, id);
  }

  async countReturns(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBookReturns(schoolId, filters);
  }
}
