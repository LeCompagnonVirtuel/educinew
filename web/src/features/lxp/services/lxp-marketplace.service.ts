import type { SupabaseClient } from '@supabase/supabase-js';
import type { CourseMarketplace, MarketplaceTemplate, PremiumContent } from '@educi/types';
import { LxpMarketplaceNotFoundError, LxpMarketplaceCreateError, LxpMarketplaceUpdateError, LxpTemplateNotFoundError, LxpTemplateCreateError, LxpPremiumContentNotFoundError, LxpPremiumContentCreateError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpMarketplaceService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getListing(schoolId: string, id: string): Promise<CourseMarketplace> {
    const listing = await this.repo.findMarketplaceListingById(schoolId, id);
    if (!listing) throw new LxpMarketplaceNotFoundError(id);
    return listing;
  }

  async listListings(schoolId: string, category?: string): Promise<readonly CourseMarketplace[]> {
    return this.repo.findMarketplaceListings(schoolId, category);
  }

  async createListing(data: Omit<CourseMarketplace, 'id' | 'createdAt' | 'updatedAt' | 'enrollmentCount' | 'revenue' | 'reviewCount'>): Promise<CourseMarketplace> {
    const created = await this.repo.createMarketplaceListing(data);
    if (!created) throw new LxpMarketplaceCreateError();
    return created;
  }

  async updateListing(schoolId: string, id: string, data: Partial<CourseMarketplace>): Promise<CourseMarketplace> {
    const existing = await this.repo.findMarketplaceListingById(schoolId, id);
    if (!existing) throw new LxpMarketplaceNotFoundError(id);
    const updated = await this.repo.updateMarketplaceListing(id, data);
    if (!updated) throw new LxpMarketplaceUpdateError();
    return updated;
  }

  async getTemplate(schoolId: string, id: string): Promise<MarketplaceTemplate> {
    const template = await this.repo.findMarketplaceTemplateById(schoolId, id);
    if (!template) throw new LxpTemplateNotFoundError(id);
    return template;
  }

  async listTemplates(schoolId: string): Promise<readonly MarketplaceTemplate[]> {
    return this.repo.findMarketplaceTemplates(schoolId);
  }

  async getPremiumContent(schoolId: string, id: string): Promise<PremiumContent> {
    const content = await this.repo.findPremiumContentById(schoolId, id);
    if (!content) throw new LxpPremiumContentNotFoundError(id);
    return content;
  }

  async listPremiumContent(schoolId: string): Promise<readonly PremiumContent[]> {
    return this.repo.findPremiumContentListings(schoolId);
  }
}
