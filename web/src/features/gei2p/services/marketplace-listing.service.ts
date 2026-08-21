import { SupabaseClient } from '@supabase/supabase-js';
import { ListingService, Listing } from './gei2p-marketplace-listing.service';

export class InteroperabilityMarketplaceListingService {
  private readonly listingService: ListingService;

  constructor(supabase: SupabaseClient) {
    this.listingService = new ListingService(supabase);
  }

  async listMarketplaceListings(schoolId: string, filters?: Record<string, unknown>): Promise<Listing[]> {
    return this.listingService.listEntities(schoolId, filters as { status?: string; listing_type?: string; category?: string; limit?: number; offset?: number });
  }

  async getMarketplaceListing(schoolId: string, id: string): Promise<Listing | null> {
    const entity = await this.listingService.getEntity(id);
    if (entity && entity.school_id === schoolId) return entity;
    return null;
  }

  async createMarketplaceListing(schoolId: string, userId: string, data: Record<string, unknown>): Promise<Listing | null> {
    return this.listingService.createEntity({ ...data, school_id: schoolId } as Parameters<ListingService['createEntity']>[0]);
  }

  async updateMarketplaceListing(schoolId: string, id: string, data: Record<string, unknown>): Promise<Listing | null> {
    const entity = await this.listingService.getEntity(id);
    if (!entity || entity.school_id !== schoolId) return null;
    return this.listingService.updateEntity(id, data as Parameters<ListingService['updateEntity']>[1]);
  }

  async deleteMarketplaceListing(schoolId: string, id: string): Promise<boolean> {
    const entity = await this.listingService.getEntity(id);
    if (!entity || entity.school_id !== schoolId) return false;
    return this.listingService.deleteEntity(id);
  }
}
