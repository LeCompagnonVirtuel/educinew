import type { SupabaseClient } from '@supabase/supabase-js';
import type { Book, BookCreate, BookUpdate, BookQuery } from '@educi/types';
import { ScBookNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBookService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getBook(schoolId: string, id: string): Promise<Book> {
    const book = await this.repo.findBookById(schoolId, id);
    if (!book) throw new ScBookNotFoundError(id);
    return book;
  }

  async listBooks(schoolId: string, query?: BookQuery): Promise<Book[]> {
    return this.repo.findAllBooks(schoolId, query);
  }

  async createBook(schoolId: string, data: BookCreate): Promise<Book> {
    return this.repo.createBook(schoolId, data);
  }

  async updateBook(schoolId: string, id: string, data: BookUpdate): Promise<Book> {
    const existing = await this.repo.findBookById(schoolId, id);
    if (!existing) throw new ScBookNotFoundError(id);
    return this.repo.updateBook(schoolId, id, data);
  }

  async deleteBook(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBookById(schoolId, id);
    if (!existing) throw new ScBookNotFoundError(id);
    return this.repo.deleteBook(schoolId, id);
  }

  async searchBooks(schoolId: string, query: string): Promise<Book[]> {
    return this.repo.searchBooks(schoolId, query);
  }

  async findAvailable(schoolId: string): Promise<Book[]> {
    return this.repo.findAvailableBooks(schoolId);
  }

  async countBooks(schoolId: string, query?: BookQuery): Promise<number> {
    return this.repo.countBooks(schoolId, query);
  }
}
