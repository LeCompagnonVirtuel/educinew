import type { SupabaseClient } from '@supabase/supabase-js';
import type { BookCategory, BookCategoryCreate } from '@educi/types';
import { ScBookNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBookCategoryService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getCategory(schoolId: string, id: string): Promise<BookCategory> {
    const category = await this.repo.findBookCategoryById(schoolId, id);
    if (!category) throw new ScBookNotFoundError(id);
    return category;
  }

  async listCategories(schoolId: string, filters?: Record<string, unknown>): Promise<BookCategory[]> {
    return this.repo.findAllBookCategories(schoolId, filters);
  }

  async createCategory(schoolId: string, data: BookCategoryCreate): Promise<BookCategory> {
    return this.repo.createBookCategory(schoolId, data);
  }

  async updateCategory(schoolId: string, id: string, data: Partial<BookCategoryCreate>): Promise<BookCategory> {
    const existing = await this.repo.findBookCategoryById(schoolId, id);
    if (!existing) throw new ScBookNotFoundError(id);
    return this.repo.updateBookCategory(schoolId, id, data);
  }

  async deleteCategory(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBookCategoryById(schoolId, id);
    if (!existing) throw new ScBookNotFoundError(id);
    return this.repo.deleteBookCategory(schoolId, id);
  }

  async countCategories(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBookCategories(schoolId, filters);
  }
}
