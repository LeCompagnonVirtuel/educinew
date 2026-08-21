import type { SupabaseClient } from '@supabase/supabase-js';
import type { Author, AuthorCreate } from '@educi/types';
import { ScAuthorNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScAuthorService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getAuthor(schoolId: string, id: string): Promise<Author> {
    const author = await this.repo.findAuthorById(schoolId, id);
    if (!author) throw new ScAuthorNotFoundError(id);
    return author;
  }

  async listAuthors(schoolId: string, filters?: Record<string, unknown>): Promise<Author[]> {
    return this.repo.findAllAuthors(schoolId, filters);
  }

  async createAuthor(schoolId: string, data: AuthorCreate): Promise<Author> {
    return this.repo.createAuthor(schoolId, data);
  }

  async updateAuthor(schoolId: string, id: string, data: Partial<AuthorCreate>): Promise<Author> {
    const existing = await this.repo.findAuthorById(schoolId, id);
    if (!existing) throw new ScAuthorNotFoundError(id);
    return this.repo.updateAuthor(schoolId, id, data);
  }

  async deleteAuthor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAuthorById(schoolId, id);
    if (!existing) throw new ScAuthorNotFoundError(id);
    return this.repo.deleteAuthor(schoolId, id);
  }

  async countAuthors(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAuthors(schoolId, filters);
  }
}
