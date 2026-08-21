import type { SupabaseClient } from '@supabase/supabase-js';
import type { Book, BookQuery } from '@educi/types';
import { ScBookNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBookSearchService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async fullTextSearch(schoolId: string, query: string): Promise<Book[]> {
    return this.repo.searchBooksFullText(schoolId, query);
  }

  async findByTitle(schoolId: string, title: string): Promise<Book[]> {
    return this.repo.findBooksByTitle(schoolId, title);
  }

  async findByISBN(schoolId: string, isbn: string): Promise<Book | null> {
    return this.repo.findBookByISBN(schoolId, isbn);
  }

  async findByAuthor(schoolId: string, authorId: string): Promise<Book[]> {
    return this.repo.findBooksByAuthor(schoolId, authorId);
  }

  async findByCategory(schoolId: string, categoryId: string): Promise<Book[]> {
    return this.repo.findBooksByCategory(schoolId, categoryId);
  }

  async findByLanguage(schoolId: string, language: string): Promise<Book[]> {
    return this.repo.findBooksByLanguage(schoolId, language);
  }

  async findPopular(schoolId: string, limit: number): Promise<Book[]> {
    return this.repo.findPopularBooks(schoolId, limit);
  }

  async findByYearRange(schoolId: string, startYear: number, endYear: number): Promise<Book[]> {
    return this.repo.findBooksByYearRange(schoolId, startYear, endYear);
  }
}
