import { SupabaseClient } from '@supabase/supabase-js';
import { GEGINBaseService } from '../gegin-base.service';
import { GEGINListing, GEGINTransaction, GEGINReview, GEGINCommission, GEGINProvider, GEGINBundle, GEGINWishlist, GEGIN11_TABLE_NAMES } from '../repositories/gegin-11-marketplace.repository';
import { logger } from '@educi/logger';

export class GEGINListingService extends GEGINBaseService<GEGINListing> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN11_TABLE_NAMES.GEGINListing, moduleName: 'Listing' });
  }
}

export class GEGINTransactionService extends GEGINBaseService<GEGINTransaction> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN11_TABLE_NAMES.GEGINTransaction, moduleName: 'Transaction' });
  }
}

export class GEGINReviewService extends GEGINBaseService<GEGINReview> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN11_TABLE_NAMES.GEGINReview, moduleName: 'Review' });
  }
}

export class GEGINCommissionService extends GEGINBaseService<GEGINCommission> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN11_TABLE_NAMES.GEGINCommission, moduleName: 'Commission' });
  }
}

export class GEGINProviderService extends GEGINBaseService<GEGINProvider> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN11_TABLE_NAMES.GEGINProvider, moduleName: 'Provider' });
  }
}

export class GEGINBundleService extends GEGINBaseService<GEGINBundle> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN11_TABLE_NAMES.GEGINBundle, moduleName: 'Bundle' });
  }
}

export class GEGINWishlistService extends GEGINBaseService<GEGINWishlist> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN11_TABLE_NAMES.GEGINWishlist, moduleName: 'Wishlist' });
  }
}

export class GEGIN11MarketplaceService {
  readonly listings: GEGINListingService;
  readonly transactions: GEGINTransactionService;
  readonly reviews: GEGINReviewService;
  readonly commissions: GEGINCommissionService;
  readonly providers: GEGINProviderService;
  readonly bundles: GEGINBundleService;
  readonly wishlists: GEGINWishlistService;

  constructor(supabase: SupabaseClient) {
    this.listings = new GEGINListingService(supabase);
    this.transactions = new GEGINTransactionService(supabase);
    this.reviews = new GEGINReviewService(supabase);
    this.commissions = new GEGINCommissionService(supabase);
    this.providers = new GEGINProviderService(supabase);
    this.bundles = new GEGINBundleService(supabase);
    this.wishlists = new GEGINWishlistService(supabase);
  }
}

export function createGEGIN11MarketplaceService(supabase: SupabaseClient): GEGIN11MarketplaceService {
  return new GEGIN11MarketplaceService(supabase);
}
